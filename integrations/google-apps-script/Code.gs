const SHEETS = Object.freeze({
  leads: 'Leads',
  quotations: 'Quotations',
  clients: 'Clients',
});

function doPost(event) {
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || '{}');
    const properties = PropertiesService.getScriptProperties();
    if (!safeEqual_(String(payload.routerSecret || ''), String(properties.getProperty('ROUTER_SECRET') || ''))) {
      return json_({ ok: false, error: 'Unauthorised' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (payload.operation === 'lead') return receiveLead_(payload, properties);
      if (payload.operation === 'payment') return resolvePayment_(payload, properties);
      if (payload.operation === 'workspace') return resolveWorkspace_(payload, properties);
      return json_({ ok: false, error: 'Unsupported operation' });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'Request could not be processed' });
  }
}

function receiveLead_(payload, properties) {
  const required = ['requestId', 'name', 'email', 'phone', 'country', 'role', 'discipline', 'stage', 'urgency', 'investment', 'summary'];
  if (!payload.consent || required.some(function (key) { return !String(payload[key] || '').trim(); })) {
    return json_({ ok: false, error: 'Invalid enquiry' });
  }

  const sheet = spreadsheet_(properties).getSheetByName(SHEETS.leads);
  if (!sheet) throw new Error('Leads sheet is missing');
  const existing = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).getDisplayValues().flat();
  if (existing.indexOf(payload.requestId) !== -1) return json_({ ok: true, reference: payload.requestId, duplicate: true });

  const score = qualificationScore_(payload);
  const priority = score >= 75 ? 'Urgent' : score >= 55 ? 'High' : score >= 35 ? 'Medium' : 'Low';
  sheet.appendRow([
    payload.requestId, new Date(payload.receivedAt || Date.now()), clean_(payload.name, 120), clean_(payload.email, 254),
    clean_(payload.phone, 32), clean_(payload.country, 80), clean_(payload.role, 80), clean_(payload.discipline, 140),
    clean_(payload.stage, 100), clean_(payload.urgency, 80), clean_(payload.investment, 80), clean_(payload.summary, 1200),
    'Yes', clean_(payload.source, 120), 'Unassigned', priority, score >= 35 ? 'Qualified' : 'New', score,
    '', '', '', 'Not booked', '', '', 'Website enquiry; respond within 24 hours.'
  ]);

  const recipient = properties.getProperty('NOTIFICATION_EMAIL') || 'support@aristocratresearch.com';
  GmailApp.sendEmail(recipient, 'New PhD Forward enquiry — ' + payload.requestId, [
    'A new consented enquiry has entered the CRM.', '',
    'Name: ' + clean_(payload.name, 120),
    'Country: ' + clean_(payload.country, 80),
    'Role: ' + clean_(payload.role, 80),
    'Stage: ' + clean_(payload.stage, 100),
    'Urgency: ' + clean_(payload.urgency, 80),
    'Investment band: ' + clean_(payload.investment, 80),
    'Qualification score: ' + score,
    'Reference: ' + payload.requestId, '',
    'Open the private CRM to review contact details and follow up.'
  ].join('\n'));
  return json_({ ok: true, reference: payload.requestId });
}

function resolvePayment_(payload, properties) {
  const row = findByReference_(spreadsheet_(properties).getSheetByName(SHEETS.quotations), payload.reference);
  if (!row || row[12] !== 'Issued' || !row[10] || !row[11] || hashCode_(payload.code) !== row[11]) return json_({ ok: false });
  if (row[3] instanceof Date && row[3].getTime() < Date.now()) return json_({ ok: false, error: 'Expired' });
  return json_({ ok: true, url: String(row[10]) });
}

function resolveWorkspace_(payload, properties) {
  const row = findByReference_(spreadsheet_(properties).getSheetByName(SHEETS.clients), payload.reference);
  if (!row || row[8] !== 'Active' || !row[4] || !row[5] || hashCode_(payload.code) !== row[5]) return json_({ ok: false });
  if (row[7] instanceof Date && row[7].getTime() < Date.now()) return json_({ ok: false, error: 'Expired' });
  return json_({ ok: true, url: String(row[4]) });
}

function findByReference_(sheet, reference) {
  if (!sheet || !reference || sheet.getLastRow() < 2) return null;
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return values.find(function (row) { return String(row[0]) === String(reference); }) || null;
}

function qualificationScore_(payload) {
  const text = [payload.urgency, payload.investment, payload.stage, payload.summary].join(' ').toLowerCase();
  let score = 15;
  if (/15 days|urgent|immediate/.test(text)) score += 25;
  else if (/30 days|month/.test(text)) score += 18;
  if (/30,?000|60,?000|above|usd|gbp|eur|aud/.test(text)) score += 30;
  else if (/20,?000/.test(text)) score += 20;
  if (/revision|reviewer|submission|thesis|analysis|viva/.test(text)) score += 20;
  if (String(payload.summary || '').trim().length >= 80) score += 10;
  return Math.min(score, 100);
}

function spreadsheet_(properties) {
  const id = properties.getProperty('CRM_SPREADSHEET_ID');
  if (!id) throw new Error('CRM_SPREADSHEET_ID is not configured');
  return SpreadsheetApp.openById(id);
}

function hashCode_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || ''), Utilities.Charset.UTF_8);
  return bytes.map(function (byte) { const value = byte < 0 ? byte + 256 : byte; return ('0' + value.toString(16)).slice(-2); }).join('');
}

function HASH_CODE(value) {
  return hashCode_(value);
}

function safeEqual_(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

function clean_(value, limit) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, limit);
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
