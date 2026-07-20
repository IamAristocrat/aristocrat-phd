export type Service = {
  title: string;
  shortTitle: string;
  promise: string;
  problem: string;
  outcome: string;
  deliverables: string[];
  steps: string[];
};

export const serviceData: Record<string, Service> = {
  "research-direction": {
    title: "Research Direction & Proposal Support",
    shortTitle: "research direction",
    promise: "Turn a broad interest, rejected proposal or uncertain topic into a researchable direction.",
    problem: "A topic can sound important while remaining too wide, too familiar or impossible to evidence within the scholar’s real constraints.",
    outcome: "A clearer question, contribution logic and proposal route that the scholar can explain and test.",
    deliverables: ["Interest and constraint diagnosis", "Problem and gap map", "Question and objective alignment", "Feasibility and evidence review", "Proposal architecture", "Supervisor-discussion brief"],
    steps: ["Map the field, motivation and institutional constraints", "Separate the broad topic from the researchable problem", "Test contribution, feasibility and evidence access", "Align questions, objectives and proposed method", "Close with a proposal map and decision record"],
  },
  "thesis-completion": {
    title: "Thesis Completion Support",
    shortTitle: "Thesis completion",
    promise: "Turn scattered chapters and unresolved corrections into a defensible completion sequence.",
    problem: "A thesis rarely stops because the scholar lacks intelligence. It stops when comments, evidence, methodology and deadlines become one overwhelming problem.",
    outcome: "A chapter-led plan that makes the remaining work visible, reviewable and easier to defend.",
    deliverables: ["Chapter and correction audit", "Structure and argument map", "Method–evidence alignment review", "Tracked editorial recommendations", "University-format compliance check", "Viva narrative and next-action plan"],
    steps: ["Review the available thesis, guidelines and supervisor comments", "Separate structural, methodological and editorial issues", "Agree one milestone with inputs, dates and responsibilities", "Review revisions against the agreed research logic", "Close with a correction record and next milestone"],
  },
  "publication-support": {
    title: "Research Paper Publication Support",
    shortTitle: "Publication support",
    promise: "Build a credible route from manuscript uncertainty to a disciplined submission.",
    problem: "Repeated rejection consumes time and confidence when the real issue—fit, contribution, evidence or presentation—has not been identified.",
    outcome: "A stronger manuscript, a verified journal shortlist and a submission route you can understand.",
    deliverables: ["Manuscript readiness audit", "Contribution and evidence review", "Journal-scope matching", "Official index and publisher checks", "Submission-file checklist", "Revision and response plan"],
    steps: ["Diagnose the manuscript and intended outcome", "Identify readiness gaps before journal selection", "Verify suitable journals using official sources", "Strengthen the manuscript with tracked decisions", "Prepare the scholar for submission and revisions"],
  },
  "methodology-analysis": {
    title: "Methodology & Analysis Support",
    shortTitle: "Methodology & analysis",
    promise: "Make every analytical choice answerable to the research question.",
    problem: "A sophisticated analysis cannot rescue a weak question, unsuitable design or undocumented dataset.",
    outcome: "A coherent method and analysis plan with assumptions, limitations and decisions made explicit.",
    deliverables: ["Question–method fit review", "Sampling and instrument review", "Dataset-readiness checks", "Analysis decision plan", "Assumption and limitation notes", "Result-presentation guidance"],
    steps: ["Clarify the question and claimed contribution", "Inspect design, variables, instruments and data provenance", "Select defensible analytical choices", "Document assumptions and quality checks", "Align results, discussion and limitations"],
  },
  "reviewer-response": {
    title: "Reviewer Response Support",
    shortTitle: "Reviewer response",
    promise: "Turn a difficult decision letter into a calm, traceable revision plan.",
    problem: "Reviewer comments can feel contradictory or personal. A rushed response often creates new inconsistencies and loses the editor’s confidence.",
    outcome: "A point-by-point response system that shows what changed, why it changed and where it changed.",
    deliverables: ["Comment classification", "Point-by-point response matrix", "Revision trace", "Response-letter support", "Cross-document consistency review", "Resubmission checklist"],
    steps: ["Read the complete editorial decision", "Classify major, minor and clarification requests", "Plan evidence-led responses and revisions", "Trace every change to the manuscript", "Run a final consistency and tone review"],
  },
  "journal-verification": {
    title: "Journal Verification",
    shortTitle: "Journal verification",
    promise: "Verify before you submit, pay or trust a publication promise.",
    problem: "Imitated journal sites, false index claims and hidden fees exploit scholars who are working against a deadline.",
    outcome: "A documented risk and fit review grounded in publisher and official index sources.",
    deliverables: ["Journal identity check", "Official index-source check", "Publisher and contact review", "Scope and article-type fit", "Fee and timeline disclosure review", "Written risk summary"],
    steps: ["Capture the exact journal and URL", "Cross-check identity and publisher records", "Verify current index claims at source", "Review scope, process, fees and risk signals", "Provide findings without promising acceptance"],
  },
  "viva-preparation": {
    title: "PhD Viva Preparation",
    shortTitle: "Viva preparation",
    promise: "Enter the defence knowing your contribution, decisions and limitations.",
    problem: "Years of work can become difficult to explain under pressure, especially when chapters were completed at different times.",
    outcome: "A concise research narrative and repeated practice answering the questions examiners are likely to test.",
    deliverables: ["Contribution narrative", "Chapter-logic review", "Method-choice defence", "Examiner question bank", "Mock-viva sessions", "Correction-readiness plan"],
    steps: ["Map the thesis argument and contribution", "Identify exposed assumptions and likely questions", "Build concise, evidence-led answers", "Rehearse through a structured mock viva", "Debrief and focus the final preparation"],
  },
  "formatting-integrity": {
    title: "Formatting, Citation & Integrity Support",
    shortTitle: "formatting and integrity",
    promise: "Bring university format, attribution and presentation into one accountable final review.",
    problem: "Late-stage formatting and similarity concerns can hide real attribution, structure and source-quality problems.",
    outcome: "A compliant, traceable document with citation and originality concerns handled through responsible revision.",
    deliverables: ["University-format checklist", "Reference-style audit", "Quotation and citation review", "Similarity-risk classification", "Table and figure consistency", "Final compliance record"],
    steps: ["Confirm the official university or publisher rules", "Audit structure, styles, tables, figures and references", "Classify similarity by source and cause", "Revise through original reasoning and accurate attribution", "Issue a final compliance checklist"],
  },
  "books-chapters": {
    title: "Scholarly Books & Chapter Support",
    shortTitle: "books and chapters",
    promise: "Develop a coherent scholarly contribution for a legitimate publisher and readership.",
    problem: "A thesis chapter rarely becomes a strong book chapter simply by shortening it; audience, argument and publisher fit change.",
    outcome: "A focused proposal or chapter with a clear audience, contribution and submission route.",
    deliverables: ["Concept and audience review", "Contribution and chapter map", "Publisher or call verification", "Developmental editorial review", "Citation and permissions checklist", "Submission package support"],
    steps: ["Clarify purpose, audience and intended publisher", "Reshape the argument for the format", "Verify publisher identity and requirements", "Develop and review the chapter or proposal", "Prepare the compliant submission package"],
  },
  "data-lab-support": {
    title: "Data Collection & Laboratory Coordination",
    shortTitle: "data and lab coordination",
    promise: "Plan legitimate evidence collection with provenance, permissions and limitations visible.",
    problem: "A deadline does not remove consent, laboratory, access, documentation or data-quality obligations.",
    outcome: "An evidence workflow the scholar can account for—from source and collection through quality checks and analysis readiness.",
    deliverables: ["Data requirement map", "Collection or lab workflow", "Permissions and consent checklist", "Instrument and quality review", "Provenance documentation", "Analysis-readiness handoff"],
    steps: ["Define what evidence the question actually requires", "Confirm lawful access, permissions and practical constraints", "Design collection, laboratory or secondary-data workflow", "Document quality checks and provenance", "Handoff an analysis-ready, limitation-aware record"],
  },
};
