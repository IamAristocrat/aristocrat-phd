import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SecureGateway from "../components/SecureGateway";

export const metadata: Metadata = { title: "Client Workspace | PhD Forward", robots: { index: false, follow: false } };

export default function ClientPage() { return <main className="gateway-page"><header className="site-header"><Link className="brand" href="/"><span className="brand-mark"><Image src="/aristocrat-alpha.png" alt="" width={48} height={48} /></span><span><strong>Aristocrat Research</strong><small>PhD Forward</small></span></Link><nav><Link href="/confidentiality">Confidentiality</Link><Link href="/privacy">Privacy</Link></nav></header><section><div><p className="kicker">Controlled client workspace</p><h1>Research files do not belong in an open form.</h1><p>Paid clients receive a time-limited access route for document transfer, milestone status, version history and delivery review.</p><ul><li>Role-based access and expiring links</li><li>Encrypted transfer and protected storage</li><li>File type, size and malware checks</li><li>Access log and retention date</li><li>No public links or shared consumer folders</li></ul></div><aside><SecureGateway kind="workspace" /><p className="gateway-note">Workspace access is issued after identity, scope and confidentiality checks. Do not send files if you have not received a client reference.</p></aside></section></main>; }
