import Image from "next/image";
import Link from "next/link";
import Diagnostic from "./components/Diagnostic";

export const metadata = { alternates: { canonical: "/" } };

const whatsappUrl =
  "https://wa.me/919894595035?text=Hello%20Aristocrat%20Research%2C%20I%20want%20a%20confidential%20PhD%20Forward%20consultation.";

const services = [
  ["Research direction", "Turn a broad interest or stalled proposal into a researchable, defensible direction.", "research-direction"],
  ["Thesis completion", "Sequence chapters, corrections and evidence into manageable completion milestones.", "thesis-completion"],
  ["Publication support", "Strengthen a manuscript and prepare a disciplined, journal-fit submission route.", "publication-support"],
  ["Methodology & analysis", "Align the question, design, dataset and analytical decisions.", "methodology-analysis"],
  ["Reviewer response", "Convert reviewer comments into a traceable revision and response matrix.", "reviewer-response"],
  ["Journal verification", "Check publisher identity, index status, scope, fees and risk signals.", "journal-verification"],
  ["Formatting & integrity", "Resolve university format, citation, attribution and similarity concerns responsibly.", "formatting-integrity"],
  ["Viva preparation", "Clarify the contribution and rehearse difficult examiner questions.", "viva-preparation"],
  ["Books & chapters", "Develop scholarly book and chapter submissions with clear contribution and publisher fit.", "books-chapters"],
  ["Data & lab coordination", "Plan legitimate collection, laboratory and evidence workflows with documented provenance.", "data-lab-support"],
];

const journey = [
  ["The weight", "Another deadline arrives", "The unfinished work follows you from campus to career—and into the hours meant for your family."],
  ["The weight", "Corrections keep multiplying", "Each comment seems small until the chapter, method and evidence no longer agree."],
  ["The stakes", "Your next promotion waits", "An increment, appointment or eligibility window can depend on research progress you cannot postpone forever."],
  ["The stakes", "Time is the hidden cost", "Registration fees matter. So do sleep, confidence, relationships and the work opportunities you keep delaying."],
  ["The ordeal", "Urgency attracts false promises", "Guaranteed acceptance, paid authorship and invented index claims turn a deadline into a larger risk."],
  ["The ally", "You speak without judgement", "A private first conversation separates what happened from what must happen next."],
  ["The map", "The real bottleneck is named", "Not every problem is a writing problem. We locate the structural, methodological or publication constraint first."],
  ["The map", "The question becomes clearer", "A defensible contribution begins when the question, gap and intended claim can be stated plainly."],
  ["The method", "Design follows the question", "Sampling, instruments, variables and analysis are aligned before weak assumptions spread."],
  ["The evidence", "Data keeps its provenance", "Real sources, documented limitations and reproducible decisions protect the scholar and the work."],
  ["The build", "Chapters regain one argument", "Structure, evidence and supervisor corrections are connected through a visible chapter plan."],
  ["The build", "The paper earns readiness", "Contribution, literature, method, results and discussion are tested as one manuscript—not isolated sections."],
  ["The gate", "The journal is verified", "Identity, official indexing, scope, process, fees and risk signals are checked before submission."],
  ["The standard", "Attribution is repaired", "Similarity is addressed through original reasoning, accurate quotation, citation and accountable revision."],
  ["The trial", "Review becomes a matrix", "Every comment receives a response, an action and a traceable location in the revised manuscript."],
  ["The trust", "Documents remain controlled", "Access is limited, transfers are deliberate and retention is defined before sensitive work is shared."],
  ["The ascent", "One milestone visibly closes", "A defined deliverable, decision record and next action replace the feeling of endless work."],
  ["The rehearsal", "The defence becomes speakable", "The contribution, choices and limitations are practised until the scholar can own the narrative."],
  ["The return", "You enter as the author", "No borrowed confidence—only a clearer command of the research and the decisions behind it."],
  ["The rise", "Progress compounds again", "Completion restores career movement, professional identity and room for the next chapter of life."],
];

const process = [
  ["Diagnose", "Stage, pressure, institutional context, materials and actual deadline."],
  ["Verify", "What exists, what is missing and what can responsibly move now."],
  ["Scope", "One milestone, defined inputs, responsibilities, revisions, timeline and quotation."],
  ["Strengthen", "Specialist review, version control, evidence checks and accountable decisions."],
  ["Progress", "Deliverable, decision record, acceptance review and the clearest next action."],
];

const faqs = [
  ["Can PhD Forward guarantee publication or degree completion?", "No. Universities, examiners, editors, reviewers, publishers and index providers decide independently. We define and deliver only the research-support milestone within our control."],
  ["Can you work within 15 days?", "Sometimes. We first review the stage, usable source material, word count, required decision and specialist capacity. An urgent engagement may begin with a smaller rescue milestone."],
  ["Do you write complete theses or papers for submission under my name?", "We provide research, methodological, developmental editorial and process support. The scholar must remain the author, understand the work and comply with institutional and publisher disclosure rules."],
  ["Do you support SCI or Scopus publication goals?", "We can verify current journal and index claims, assess fit and strengthen submission readiness. We cannot guarantee indexing, acceptance or publication timing."],
  ["How are similarity concerns handled?", "Through original reasoning, accurate quotation, correct citation, source verification and accountable revision—not concealment or mechanical manipulation."],
  ["Will my research remain confidential?", "Access, transfer, specialist involvement, retention and deletion are governed by our Confidentiality Standard and the engagement schedule. Sensitive files are not collected through the open enquiry form."],
  ["How much does support cost?", "Pricing is quotation-only. Each quotation defines one milestone, inclusions, client inputs, revisions, schedule, taxes and payment terms before payment."],
  ["Who can enquire?", "Adult PhD scholars are the primary clients. Professors, institutions, family sponsors and authorised referrers may enquire, subject to confidentiality and conflict-of-interest requirements."],
];

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aristocrat Research — PhD Forward",
    url: "https://phd.aristocratresearch.com",
    email: "support@aristocratresearch.com",
    telephone: "+91-98945-95035",
    areaServed: "Worldwide",
    availableLanguage: "English",
    description: "Confidential, milestone-led research support for English-language PhD scholars.",
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Aristocrat Research PhD Forward home">
          <span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} priority /></span>
          <span><strong>Aristocrat Research</strong><small>PhD Forward</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#journey">Your journey</a><a href="#services">Support</a><a href="#method">Method</a><Link href="/start">Start</Link>
        </nav>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Talk confidentially <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero hero-editorial" id="top">
        <div className="hero-copy">
          <p className="hero-overline">A private research progress practice · English-language scholars worldwide</p>
          <h1>Your PhD.<br /><em>Progressed.</em></h1>
          <p className="hero-lede">Your doctorate has already asked for years of effort. It should not quietly take the promotion, increment, confidence or family time you worked to protect.</p>
          <p className="hero-support">PhD Forward turns an urgent research block into a verified route—one accountable milestone at a time.</p>
          <div className="hero-actions">
            <Link className="button button-primary metallic-button" href="/start">Find my next milestone <span aria-hidden="true">→</span></Link>
            <a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp the research desk</a>
          </div>
          <div className="hero-assurances"><span>Private by design</span><span>Reply within 24 hours</span><span>Scope before payment</span></div>
        </div>
        <aside className="hero-emblem" aria-label="PhD Forward identity">
          <div className="rose-ribbon ribbon-a" /><div className="rose-ribbon ribbon-b" />
          <div className="emblem-halo"><Image src="/aristocrat-alpha.png" alt="Aristocrat alpha and ascent symbol" width={480} height={480} priority /></div>
          <div className="emblem-caption"><span>Alpha potential</span><span>Kaizen progress</span><span>Dedicated focus</span></div>
        </aside>
      </section>

      <section className="promise-band"><p>The promise</p><h2>We do not sell certainty. We reduce uncertainty—until your next credible action is visible.</h2></section>

      <section className="identity-story">
        <div className="identity-visual"><Image src="/aristocrat-alpha.png" alt="Aristocrat Research alpha logo" width={620} height={620} /></div>
        <div className="identity-copy"><p className="kicker">The mark behind PhD Forward</p><h2>You remain the hero. The system protects your ascent.</h2><div className="identity-points">
          <article><span>Α</span><div><h3>Alpha</h3><p>Your expertise and authorship stay at the centre.</p></div></article>
          <article><span>↗</span><div><h3>Ascent</h3><p>The upward form represents career and scholarly movement.</p></div></article>
          <article><span>○</span><div><h3>Focus</h3><p>The circle is our dedicated attention around the chosen milestone.</p></div></article>
          <article><span>∞</span><div><h3>Kaizen</h3><p>Progress is built through deliberate, continuous improvement.</p></div></article>
        </div></div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-heading"><p className="kicker">The scholar’s journey</p><h2>From “I am stuck” to “I can defend what comes next.”</h2><p>Twenty moments tell the complete story: the pressure, the risk, the ally, the disciplined road and the return to career momentum.</p></div>
        <div className="journey-grid">
          {journey.map(([phase, title, copy], index) => {
            const column = index % 5;
            const row = Math.floor(index / 5);
            return <article className="journey-card" key={title}>
              <div className="journey-image" role="img" aria-label={title} style={{ backgroundPosition: `${column * 25}% ${row * (100 / 3)}%` }}><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="journey-message"><p>{phase}</p><h3>{title}</h3><span>{copy}</span></div>
            </article>;
          })}
        </div>
      </section>

      <section className="stakes-section">
        <div><p className="kicker">What delay can take</p><h2>The degree is not the only thing at stake.</h2></div>
        <div className="stakes-grid"><article><b>Career</b><p>Promotion, increment, eligibility and professional mobility.</p></article><article><b>Time</b><p>Repeated semesters, registrations and work rebuilt without a system.</p></article><article><b>Trust</b><p>Confidence after rejection, poor advice or publication fraud.</p></article><article><b>Life</b><p>Family hours, health, sleep and the freedom to begin what comes next.</p></article></div>
      </section>

      <section className="service-suite" id="services">
        <div className="suite-heading"><p className="kicker">STEMAHL research support</p><h2>Enter at the precise point where progress stopped.</h2><p>Science, technology, engineering, management, arts, humanities and English literature. Service is delivered in English; vernacular-language projects are currently excluded.</p></div>
        <div className="service-grid service-grid-expanded">
          {services.map(([title, copy, slug], index) => <Link className="service-card" href={`/services/${slug}`} key={slug}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p><b aria-hidden="true">↗</b></Link>)}
        </div>
      </section>

      <section className="scale-section">
        <div><p className="kicker">Experience, stated carefully</p><h2>Built from research work since 2011.</h2></div>
        <div className="scale-grid"><article><strong>7,000+</strong><p>Scholar engagements recorded internally; not presented as independently audited degree outcomes.</p></article><article><strong>17</strong><p>Research and operations professionals in the wider network, with a five-person core delivery team.</p></article><article><strong>15–30</strong><p>Days is the common urgent window. Feasibility is confirmed only after diagnosis.</p></article><article><strong>24 h</strong><p>Target response time for a new enquiry during normal operations.</p></article></div>
      </section>

      <section className="process-section" id="method">
        <div className="process-intro"><p className="kicker">The PhD Forward Protocol</p><h2>Pressure becomes manageable when decisions become visible.</h2><p>The scholar remains author and decision-maker. We bring specialist scrutiny, coordination and a working rhythm.</p></div>
        <ol className="process-list">{process.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </section>

      <section className="integrity-section" id="standards">
        <div><p className="kicker">The integrity boundary</p><h2>We protect urgency from becoming vulnerability.</h2></div>
        <div className="integrity-columns"><article><h3>Never part of the service</h3><ul><li>Guaranteed publication, indexing, viva or degree outcomes</li><li>Purchased authorship or reviewer access</li><li>Predatory-journal placement</li><li>Fabricated evidence or disguised synthetic data</li><li>Invented testimonials or hidden client work</li></ul></article><article><h3>Always part of the practice</h3><ul><li>Publisher and official index verification</li><li>Documented data provenance and limitations</li><li>Written milestone scope before payment</li><li>Controlled confidential handling</li><li>Tracked revisions and decision records</li></ul></article></div>
      </section>

      <section className="diagnostic-section" id="diagnostic"><div className="diagnostic-intro"><p className="kicker">Begin without uploading your work</p><h2>Find the first bottleneck worth solving.</h2><p>Three choices produce a suggested starting point. Nothing is transmitted until you decide to contact the research desk.</p></div><Diagnostic /></section>

      <section className="proof-standard"><div><p className="kicker">Evidence before theatre</p><h2>Trust will be earned through verifiable records.</h2></div><div className="proof-list"><p><span>01</span>Outcome reporting will separate our deliverables from editor, examiner and university decisions.</p><p><span>02</span>DOIs or work samples will appear only with specific, documented client consent.</p><p><span>03</span>Unsuccessful outcomes and limitations will be included in aggregate reporting.</p><p><span>04</span>Testimonials will never be fabricated, renamed or attributed without permission.</p></div></section>

      <section className="faq-section"><div className="faq-intro"><p className="kicker">Before you engage</p><h2>Clear answers prevent the wrong engagement.</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="closing-story"><p className="kicker">The next chapter starts smaller than you think</p><h2>You do not need to solve the whole PhD today.<br /><em>You need the right next milestone.</em></h2><div><Link className="button button-primary metallic-button" href="/start">Start my confidential diagnosis →</Link><Link className="text-link" href="/book">Request a consultation</Link></div></section>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} /></span><div><strong>Aristocrat Research</strong><p>PhD Forward · Your PhD. Progressed.</p></div></div>
        <div className="footer-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/confidentiality">Confidentiality</Link><Link href="/service-agreement">Service agreement</Link><Link href="/start">Start</Link></div>
        <div className="footer-legal"><p>Headquartered in Chennai. Serving English-language scholars globally.</p><p><a href="mailto:support@aristocratresearch.com">support@aristocratresearch.com</a> · <a href="tel:+919894595035">+91 98945 95035</a></p><p>© 2026 Aristocrat Research</p></div>
      </footer>
      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with the PhD Forward research desk">WhatsApp</a>
    </main>
  );
}
