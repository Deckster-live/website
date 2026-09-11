/**
 * Legal page copy, kept as a single HTML blob per page rather than a JS
 * section tree. This mirrors the shape the future CRM will hand over: an
 * admin edits one rich-text field (h2/h3/p/ul, styled by `.legal-copy` in
 * globals.css) and the page just drops it in — no code changes needed to
 * add, remove or reorder sections.
 */
export interface LegalPageContent {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  html: string;
}

export const privacyPolicy: LegalPageContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "What we collect when you visit deckster.live or send us a brief, why we collect it, and the choices you have.",
  lastUpdated: "10 September 2026",
  html: `
    <h2>1. Overview</h2>
    <p>Deckster (&ldquo;Deckster&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) operates deckster.live, a website that helps brands plan, launch and track creator marketing campaigns. This Privacy Policy explains what information we collect when you visit the site or submit a brief, how we use it, and the choices you have.</p>
    <p>By using deckster.live, you agree to the collection and use of information in line with this policy. If you don&rsquo;t agree, please don&rsquo;t use the site.</p>

    <h2>2. Information We Collect</h2>
    <p><strong>Information you give us.</strong> When you fill in the &ldquo;Start a brief&rdquo; form, we ask for your name, brand or company name, email address, a rough budget range and your campaign goal. Submitting the form sends these details to us securely so our team can follow up with you &mdash; they aren&rsquo;t publicly visible on the site.</p>
    <p>If you reach out over email, Instagram, LinkedIn or a call instead, we&rsquo;ll have whatever information you choose to share with us through those channels.</p>
    <p><strong>Information collected automatically.</strong> Like most websites, our hosting and analytics infrastructure may log standard technical data such as your browser type, device type, approximate location (derived from IP address), pages visited and time spent on the site. We use this only in aggregate, to understand how the site is used and to keep it running reliably &mdash; not to identify you personally.</p>

    <h2>3. How We Use Your Information</h2>
    <ul>
      <li>To respond to your brief, question or enquiry.</li>
      <li>To understand your campaign goals so we can propose the right creators, formats and plan.</li>
      <li>To maintain, secure and improve deckster.live and diagnose technical issues.</li>
      <li>To meet legal, tax or regulatory obligations where applicable.</li>
      <li>If you become a client, to deliver the campaign services you&rsquo;ve engaged us for &mdash; the specifics of that are covered by the separate agreement we sign with you, not this website policy.</li>
    </ul>

    <h2>4. Cookies &amp; Similar Technologies</h2>
    <p>deckster.live currently uses only the essential, functional cookies needed to make the site work (for example, remembering your interface preferences). We do not currently run advertising or third-party tracking cookies.</p>
    <p>If that changes &mdash; for example, if we add analytics tools to better understand site usage &mdash; we&rsquo;ll update this policy and, where required, ask for your consent. Most browsers let you block or delete cookies through their settings if you&rsquo;d rather not have them at all.</p>

    <h2>5. Third-Party Links &amp; Services</h2>
    <p>Our site links out to third-party platforms &mdash; Instagram, LinkedIn, and the individual creator reels featured in our case studies &mdash; and may embed content from them. Once you follow one of those links, you&rsquo;re on someone else&rsquo;s platform and subject to their own privacy policy, not ours. We&rsquo;d encourage you to review those before sharing any information there.</p>
    <p>We use Google Sheets and Google Apps Script to receive and store brief submissions from this site, and Google Workspace for email. Google processes this data on our behalf as our service provider, under its own security and privacy commitments, and is not permitted to use it for its own purposes. We may also rely on other infrastructure providers (for hosting and similar functions) to run deckster.live.</p>

    <h2>6. How We Share Information</h2>
    <p>We don&rsquo;t sell your personal information. We only share it:</p>
    <ul>
      <li>With team members who need it to respond to your brief or run a campaign you&rsquo;ve engaged us for.</li>
      <li>With service providers who support our operations &mdash; including Google, which hosts the Sheet we use to store brief submissions and our email &mdash; under confidentiality obligations.</li>
      <li>If required by law, regulation, legal process or a governmental request.</li>
      <li>In connection with a merger, acquisition or sale of assets, where your information may be transferred as part of that deal.</li>
    </ul>

    <h2>7. Data Security</h2>
    <p>We take reasonable technical and organisational measures to protect the information shared with us, including restricting access to the Google Sheet where brief submissions are stored to our own team. That said, no method of transmission or storage is completely secure, and we can&rsquo;t guarantee absolute security &mdash; especially for information shared over third-party platforms outside our control.</p>

    <h2>8. Data Retention</h2>
    <p>We keep brief submissions in our Google Sheet, and any related enquiry emails, for as long as reasonably necessary to respond to you, follow up on a potential campaign, or meet our legal and accounting obligations &mdash; and delete or anonymise them once that purpose has passed, unless a longer retention period is required by law.</p>

    <h2>9. Your Rights</h2>
    <p>Depending on where you&rsquo;re based, you may have the right to ask us to access, correct, delete, or stop using the personal information we hold about you, or to receive a copy of it. You can exercise any of these by writing to us at <a href="mailto:hello@deckster.live">hello@deckster.live</a> &mdash; we&rsquo;ll respond as quickly as we reasonably can.</p>

    <h2>10. Children's Privacy</h2>
    <p>deckster.live is intended for brands, marketers and creators, and isn&rsquo;t directed at children. We don&rsquo;t knowingly collect personal information from anyone under 18. If you believe a child has provided us with personal information, please contact us and we&rsquo;ll remove it.</p>

    <h2>11. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time as our site or practices change. When we do, we&rsquo;ll update the &ldquo;Last updated&rdquo; date above. Significant changes will be reflected clearly on this page &mdash; we&rsquo;d encourage you to check back occasionally.</p>

    <h2>12. Contact Us</h2>
    <p>Questions about this policy or how your information is handled? Reach us at <a href="mailto:hello@deckster.live">hello@deckster.live</a>.</p>
  `,
};

export const termsOfService: LegalPageContent = {
  eyebrow: "Legal",
  title: "Terms of Service",
  intro:
    "The terms that govern your use of deckster.live and any brief you send us through it.",
  lastUpdated: "10 September 2026",
  html: `
    <h2>1. Acceptance of Terms</h2>
    <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of deckster.live (the &ldquo;Site&rdquo;), operated by Deckster (&ldquo;Deckster&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). By browsing the Site or submitting a brief through it, you agree to these Terms. If you don&rsquo;t agree, please don&rsquo;t use the Site.</p>

    <h2>2. About Deckster</h2>
    <p>Deckster is a creator marketing partner &mdash; we match brands with the right creators and run campaigns across formats like UGC, IGC, paid ads, whitelisting and podcast amplification, end to end. The Site is our shop window: it describes what we do, showcases past work, and lets brands get in touch to start a conversation. It isn&rsquo;t itself a self-serve platform for booking or paying for campaigns.</p>

    <h2>3. Use of the Site</h2>
    <p>You agree to use the Site only for lawful purposes. You won&rsquo;t:</p>
    <ul>
      <li>Attempt to gain unauthorised access to the Site, its underlying systems, or any account or data that isn&rsquo;t yours.</li>
      <li>Interfere with the Site&rsquo;s normal operation &mdash; including through malware, scraping at scale, or denial-of-service style traffic.</li>
      <li>Submit false, misleading or fraudulent information through our brief form or any other contact method.</li>
      <li>Use the Site to send unsolicited advertising or spam.</li>
    </ul>

    <h2>4. Intellectual Property</h2>
    <p>The Site&rsquo;s design, layout, copy, graphics, and the &ldquo;Deckster&rdquo; name and logo are owned by us or our licensors and protected by applicable intellectual property laws. You may view and share pages of the Site for personal, non-commercial reference, but you may not copy, reproduce, republish or create derivative works from it for commercial purposes without our prior written consent.</p>

    <h2>5. Case Studies &amp; Third-Party Content</h2>
    <p>Brand names, logos, campaign metrics and creator reels shown in our case studies belong to their respective owners and are featured for portfolio and illustrative purposes, generally with the relevant brand or creator&rsquo;s knowledge. Reels link out to the creator&rsquo;s original post on Instagram or another platform &mdash; playback and availability of that content is controlled by the platform it lives on, not by us. Figures shown reflect results from a specific past campaign and aren&rsquo;t a guarantee of results for any future campaign.</p>

    <h2>6. Submitting a Brief</h2>
    <p>Submitting a brief or enquiry through the Site starts a conversation &mdash; it doesn&rsquo;t create a contract, reserve a budget, or obligate either side to proceed. If we move forward together, the actual scope, deliverables, fees, timelines and responsibilities for a campaign will be set out in a separate written agreement or statement of work, which will govern over these Terms for anything it covers.</p>

    <h2>7. No Warranty</h2>
    <p>The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied. We don&rsquo;t guarantee that the Site will be error-free, uninterrupted, or that any campaign results described on it are typical or repeatable for every brand or category.</p>

    <h2>8. Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, Deckster won&rsquo;t be liable for any indirect, incidental, special or consequential damages arising out of your use of, or inability to use, the Site. Nothing in these Terms limits liability that can&rsquo;t be excluded under applicable law.</p>

    <h2>9. Third-Party Links</h2>
    <p>The Site links to third-party platforms such as Instagram and LinkedIn. We don&rsquo;t control and aren&rsquo;t responsible for the content, policies or practices of any third-party site you reach through these links.</p>

    <h2>10. Changes to the Site or These Terms</h2>
    <p>We may update, suspend or discontinue any part of the Site, and may revise these Terms from time to time, at our discretion. When we do, we&rsquo;ll update the &ldquo;Last updated&rdquo; date above. Continuing to use the Site after changes take effect means you accept the updated Terms.</p>

    <h2>11. Governing Law</h2>
    <p>These Terms are governed by the laws of India, without regard to conflict-of-law principles, and any disputes arising from them will be subject to the exclusive jurisdiction of the courts located in India.</p>

    <h2>12. Contact Us</h2>
    <p>Questions about these Terms? Reach us at <a href="mailto:hello@deckster.live">hello@deckster.live</a>.</p>
  `,
};
