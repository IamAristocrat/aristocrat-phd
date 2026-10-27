import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <main className="legal-page">
    <header className="site-header">
      <Link className="brand" href="/"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} /></span><span><strong>Aristocrat Research</strong><small>PhD Forward</small></span></Link>
      <nav aria-label="Legal navigation"><Link href="/privacy">Privacy</Link><Link href="/confidentiality">Confidentiality</Link><Link href="/terms">Terms</Link></nav>
      <Link className="nav-cta" href="https://wa.me/919894595035?text=Hello%20Aristocrat%20Research%2C%20I%20would%20like%20to%20discuss%20PhD%20support.">Start confidentially ↗</Link>
    </header>
    <section className="legal-hero"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{intro}</p><span>Effective 20 July 2026 · Version 1.0</span></section>
    <article className="legal-body">{children}</article>
    <section className="legal-contact"><p className="kicker">Questions or rights requests</p><h2>Write to the privacy and service desk.</h2><p><a href="mailto:support@aristocratresearch.com">support@aristocratresearch.com</a> · <a href="tel:+919894595035">+91 98945 95035</a></p></section>
    <footer><div className="footer-brand"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} /></span><div><strong>Aristocrat Research</strong><p>PhD Forward · Your PhD. Progressed.</p></div></div><div className="footer-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/confidentiality">Confidentiality</Link><Link href="/service-agreement">Service agreement</Link></div><div className="footer-legal"><p>Aristocrat Research is the research-services unit of Aristocrat IT Solutions Private Limited.</p><p>© 2026 Aristocrat Research</p></div></footer>
  </main>;
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
