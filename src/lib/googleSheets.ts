// One Apps Script web app per form, each bound to its own spreadsheet
// (see google-apps-script/Code.gs).
const BRIEF_ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
const CAREERS_ENDPOINT = process.env.NEXT_PUBLIC_CAREERS_WEBHOOK_URL;

async function post(
  endpoint: string | undefined,
  fields: Record<string, string>,
) {
  if (!endpoint) return;

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  await fetch(endpoint, { method: "POST", body: formData });
}

export function submitBrief(fields: Record<string, string>) {
  return post(BRIEF_ENDPOINT, fields);
}

export function submitApplication(fields: Record<string, string>) {
  return post(CAREERS_ENDPOINT, fields);
}
