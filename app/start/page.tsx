import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadQualifier from "../components/LeadQualifier";

export const metadata: Metadata = { title: "Start a Confidential PhD Diagnosis", description: "Qualify the immediate PhD research bottleneck before documents, payment or a full engagement.", alternates: { canonical: "/start" } };

export default function StartPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return <main className="start-page">
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} /></span><span><strong>Aristocrat Research</strong><small>PhD Forward</small></span></Link><nav><Link href="/#services">Support</Link><Link href="/confidentiality">Confidentiality</Link><Link href="/book">Book</Link></nav><a className="nav-cta" href="tel:+919894595035">+91 98945 95035</a></header>
    <section className="start-hero"><div><p className="kicker">Confidential first diagnosis</p><h1>Tell us what is stuck.<br /><em>Not your whole thesis.</em></h1><p>We need the stage, pressure and deadline—not confidential files—to decide whether we can help and which milestone should come first.</p></div><aside><span>What happens next</span><ol><li>Research desk reviews fit and urgency</li><li>Reply targeted within 24 hours</li><li>Short call if clarification is needed</li><li>Written scope and quotation before payment</li><li>Secure workspace only after acceptance</li></ol></aside></section>
    <section className="lead-section"><div><p className="kicker">Qualification form</p><h2>A focused brief creates a better first answer.</h2><p>Fields marked by the form are required. Do not include patient records, unpublished datasets, full manuscripts or restricted institutional material.</p></div><LeadQualifier turnstileSiteKey={turnstileSiteKey} /></section>
    <section className="start-safety"><article><b>No upload here</b><p>Sensitive files enter only through the client workspace issued after scope and identity checks.</p></article><article><b>No payment here</b><p>A payment link is issued only against a written quotation and milestone reference.</p></article><article><b>No guaranteed result</b><p>We assess and deliver the support milestone; independent academic decisions remain independent.</p></article></section>
  </main>;
}
