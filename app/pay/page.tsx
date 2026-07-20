import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SecureGateway from "../components/SecureGateway";

export const metadata: Metadata = { title: "Verified Milestone Payment | PhD Forward", robots: { index: false, follow: false } };

export default function PayPage() { return <main className="gateway-page"><header className="site-header"><Link className="brand" href="/"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} /></span><span><strong>Aristocrat Research</strong><small>PhD Forward</small></span></Link><nav><Link href="/terms">Terms</Link><Link href="/service-agreement">Agreement</Link></nav></header><section><div><p className="kicker">Milestone payment gateway</p><h1>Pay only against a verified scope.</h1><p>This gateway opens the authorised Razorpay or PayPal checkout attached to your quotation. It never asks you to choose an arbitrary amount.</p><ul><li>Confirm the milestone and legal invoice name</li><li>Verify GST, currency and payment schedule</li><li>Check that the provider page is Razorpay or PayPal</li><li>Never share card details, passwords or OTPs with our team</li></ul></div><aside><SecureGateway kind="payment" /><p className="gateway-note">The live gateway activates only after merchant credentials, server verification and webhooks pass test-mode review.</p></aside></section></main>; }
