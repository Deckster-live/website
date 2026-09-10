/**
 * Career roles — shared by the careers landing page, the "all openings"
 * page, and each role's own JD + application pages.
 *
 * `jd` is a single HTML blob (h2/h3/p/ul), the same shape as the legal
 * pages and case study sections, so a future CRM text editor can write
 * straight into it without a schema change. `open` is the one field an
 * admin would flip to pull a role down without deleting its history.
 */

export type EmploymentType = "Full-time" | "Part-time" | "Contract";

export interface CareerRole {
  /** URL segment for /careers/[slug] and /careers/[slug]/apply. */
  slug: string;
  name: string;
  department: string;
  experience: string;
  location: string;
  type: EmploymentType;
  /** One-line summary used on listing cards and as the JD page's meta description. */
  summary: string;
  /** Full job description — h2/h3/p/ul, rendered with the `.legal-copy` utility. */
  jd: string;
  /** Whether the role is currently accepting applications. */
  open: boolean;
  /** ISO date — when the role was posted, for sorting/display. */
  postedOn: string;
}

export const careerRoles: CareerRole[] = [
  {
    slug: "influencer-marketing-associate",
    name: "Influencer Marketing Associate",
    department: "Influencer Marketing",
    experience: "0–2 years",
    location: "Remote",
    type: "Full-time",
    summary:
      "Own creator outreach and campaign coordination end to end, from shortlisting to content tracking.",
    open: true,
    postedOn: "2026-08-18",
    jd: `
      <h2>About the role</h2>
      <p>You'll run the day-to-day of live campaigns — finding the right creators, getting them briefed and onboarded, and making sure content ships on time and on brief. It's a hands-on role for someone who wants to learn how creator campaigns actually get built, not just planned.</p>

      <h2>What you'll do</h2>
      <ul>
        <li>Shortlist creators against a brief using our internal database and platform data — category fit, audience, past performance.</li>
        <li>Handle outreach, negotiation and onboarding for a portfolio of creators across live campaigns.</li>
        <li>Track deliverables, follow up on delays, and keep briefs, contracts and content organised in one place.</li>
        <li>Flag underperforming content or creators early, and loop in the account lead with a fix.</li>
        <li>Compile campaign reports — reach, engagement, deliverable status — for internal and client review.</li>
      </ul>

      <h2>What we're looking for</h2>
      <ul>
        <li>0–2 years of experience in influencer marketing, social media, or a related field (internships count).</li>
        <li>Comfortable on Instagram and YouTube as a platform, not just as a user — you understand what makes content perform.</li>
        <li>Sharp written communication — briefs and creator DMs are half the job.</li>
        <li>Organised enough to track 20+ moving pieces across multiple campaigns without dropping one.</li>
      </ul>

      <h2>Nice to have</h2>
      <ul>
        <li>Prior experience working directly with creators or a creator-first brand.</li>
        <li>Familiarity with basic campaign reporting or spreadsheet-heavy workflows.</li>
      </ul>
    `,
  },
  {
    slug: "business-development-associate",
    name: "Business Development Associate",
    department: "Business Development",
    experience: "1–3 years",
    location: "Remote",
    type: "Full-time",
    summary:
      "Bring new brands onto Deckster — from first outreach to closing the brief.",
    open: true,
    postedOn: "2026-08-25",
    jd: `
      <h2>About the role</h2>
      <p>You'll be the first Deckster conversation most brands have. This role owns the top of the funnel — finding the right brands to talk to, getting a meeting on the calendar, and carrying that conversation through to a signed brief.</p>

      <h2>What you'll do</h2>
      <ul>
        <li>Identify and prioritise brands to reach out to, across categories and campaign types we're best placed to run.</li>
        <li>Run outbound across email, LinkedIn and warm introductions, and qualify inbound briefs as they come in.</li>
        <li>Own discovery calls — understand a brand's goals, budget and timeline, and shape that into a proposal with the team.</li>
        <li>Keep the pipeline current in our CRM and report weekly on outreach, meetings booked and briefs closed.</li>
        <li>Work closely with the campaign team to hand off a closed brand smoothly, with nothing lost in translation.</li>
      </ul>

      <h2>What we're looking for</h2>
      <ul>
        <li>1–3 years in sales, business development or partnerships — agency or D2C brand-side experience is a plus.</li>
        <li>Comfortable owning a number and a pipeline, not just following up on leads someone else found.</li>
        <li>Clear, confident communicator on calls and in writing — this role represents Deckster before anyone else does.</li>
        <li>Genuinely curious about brands and marketing, not just closing a deal.</li>
      </ul>

      <h2>Nice to have</h2>
      <ul>
        <li>An existing network of marketing or brand-side contacts.</li>
        <li>Experience selling a service (not just a product) where trust matters as much as price.</li>
      </ul>
    `,
  },
  {
    slug: "senior-influencer-marketing-manager",
    name: "Senior Influencer Marketing Manager",
    department: "Influencer Marketing",
    experience: "4–7 years",
    location: "Remote",
    type: "Full-time",
    summary:
      "Lead a portfolio of brand accounts and the creator strategy behind each campaign.",
    open: true,
    postedOn: "2026-09-02",
    jd: `
      <h2>About the role</h2>
      <p>You'll own a portfolio of brand relationships end to end — the strategy, the creator mix, the numbers, and the team running it day to day. This is a senior individual-contributor role with real client and P&amp;L ownership, not a step removed from the work.</p>

      <h2>What you'll do</h2>
      <ul>
        <li>Own the creator strategy for each account — format mix, budget allocation and the shortlist logic behind every campaign.</li>
        <li>Be the senior point of contact for your brands, running strategy conversations and being accountable for results.</li>
        <li>Manage and mentor a small pod of associates running the operational side of your accounts.</li>
        <li>Spot what's working across accounts and turn it into a repeatable playbook for the rest of the team.</li>
        <li>Own account-level reporting and renewal conversations — this role carries revenue responsibility, not just delivery.</li>
      </ul>

      <h2>What we're looking for</h2>
      <ul>
        <li>4–7 years in influencer marketing, with at least 2 years managing brand relationships directly.</li>
        <li>A track record of campaigns you can speak to in detail — what worked, what didn't, and why.</li>
        <li>Comfortable managing people as well as accounts — you'll have associates working under you from day one.</li>
        <li>Sharp with numbers — CAC, ROAS, engagement benchmarks — and equally sharp with creative judgement.</li>
      </ul>

      <h2>Nice to have</h2>
      <ul>
        <li>Experience across multiple categories — D2C, fintech, and lifestyle in particular.</li>
        <li>Prior experience building or improving an internal process, not just running the existing one.</li>
      </ul>
    `,
  },
];

export function getOpenRoles(): CareerRole[] {
  return careerRoles.filter((role) => role.open);
}

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return careerRoles.find((role) => role.slug === slug);
}
