/** Deckster Invoice, the invoicing tool for creators and talent managers. */
// UTM tags let the invoice app's analytics (PostHog) attribute signups that
// start on deckster.live. Login links don't need them.
const UTM = "?utm_source=deckster.live&utm_medium=referral";

export const INVOICE_URL = `https://invoice.deckster.live/${UTM}`;
export const INVOICE_CREATE_URL = `https://invoice.deckster.live/create${UTM}`;
export const INVOICE_SIGNUP_URL = `https://invoice.deckster.live/signup${UTM}`;
export const INVOICE_LOGIN_URL = "https://invoice.deckster.live/login";
