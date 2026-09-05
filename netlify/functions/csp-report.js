// CSP violation collector. The site's Content-Security-Policy-Report-Only
// header points browsers here (via report-to/report-uri) so violations show
// up in Netlify's function logs instead of being invisible in each visitor's
// own DevTools console. Once a deploy cycle passes with no unexpected
// entries logged here, the CSP header can be promoted from Report-Only to
// enforced.
export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Reporting API (report-to) sends an array of reports; the legacy
  // report-uri mechanism sends a single { "csp-report": {...} } object.
  const reports = Array.isArray(body) ? body : [body];
  for (const report of reports) {
    console.log("CSP violation:", JSON.stringify(report));
  }

  return new Response(null, { status: 204 });
};
