import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceData } from "../service-data";

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) return {};
  return { title: service.title, description: service.promise, alternates: { canonical: `/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) notFound();
  const message = encodeURIComponent(`Hello Aristocrat Research, I need a confidential consultation about ${service.shortTitle}.`);

  return (
    <main className="service-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Aristocrat Research PhD Forward home">
          <span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={42} height={42} /></span>
          <span><strong>Aristocrat Research</strong><small>PhD Forward</small></span>
        </Link>
        <nav aria-label="Service navigation"><Link href="/#services">All support</Link><Link href="/#method">Process</Link><Link href="/#standards">Standards</Link></nav>
        <a className="nav-cta" href={`https://wa.me/919894595035?text=${message}`} target="_blank" rel="noreferrer">Discuss this milestone ↗</a>
      </header>

      <section className="service-hero">
        <div>
          <p className="kicker">Confidential · milestone-led · English-language support</p>
          <h1>{service.title}</h1>
          <p>{service.promise}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={`https://wa.me/919894595035?text=${message}`} target="_blank" rel="noreferrer">Request a confidential diagnosis →</a>
            <Link className="button button-secondary" href="/#diagnostic">Use the quick diagnostic</Link>
          </div>
        </div>
        <aside><span>The pressure</span><p>{service.problem}</p><strong>Response within 24 hours</strong></aside>
      </section>

      <section className="service-outcome">
        <p className="kicker">The milestone</p><h2>{service.outcome}</h2>
      </section>

      <section className="service-detail">
        <div><p className="kicker">What the engagement can include</p><h2>A defined scope before payment.</h2><p>Final inclusions depend on the diagnostic review, the quality of your source material and your institutional requirements.</p></div>
        <ul>{service.deliverables.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ul>
      </section>

      <section className="service-method">
        <div><p className="kicker">Working method</p><h2>Visible decisions. Traceable progress.</h2></div>
        <ol>{service.steps.map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol>
      </section>

      <section className="service-boundary">
        <div><p className="kicker">The integrity boundary</p><h2>Urgency never makes a false promise true.</h2></div>
        <div><p>We do not guarantee publication, indexing, acceptance, viva results or degree completion. We do not sell authorship, reviewer access or fabricated evidence.</p><p>You retain authorship and academic responsibility. Our role is structured research, editorial and process support within a written scope.</p></div>
      </section>

      <section className="diagnostic-cta">
        <div><p className="kicker">Your work is already worth protecting</p><h2>Let us identify the next credible move.</h2><p>Share the stage, deadline and immediate block. Do not send confidential files until the scope and handling route are confirmed.</p></div>
        <div className="diagnostic-actions"><a className="button button-primary" href={`https://wa.me/919894595035?text=${message}`} target="_blank" rel="noreferrer">Start on WhatsApp →</a><a className="text-link" href="mailto:support@aristocratresearch.com">support@aristocratresearch.com</a></div>
      </section>

      <footer><div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={42} height={42} /></span><span><strong>Aristocrat Research</strong><small>PhD Forward</small></span></Link><p>Headquartered in Chennai. Serving English-language scholars globally.</p></div><div><p>Your PhD. Progressed.</p><p>© 2026 Aristocrat Research. All rights reserved.</p></div></footer>
    </main>
  );
}
