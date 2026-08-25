# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small and medium service businesses in Serbia that take inbound calls/messages from clients but can't always answer immediately: dental and vet clinics, law offices, auto repair shops/workshops, medical spas/salons, and small e-commerce sellers. The buyer is usually the owner or office manager, not a technical person. They lose business specifically when a call goes unanswered — the caller just dials the next listing.

## Product Purpose

APLORY answers every inbound inquiry automatically within seconds, across whatever channel the client used — missed call, WhatsApp, Viber, Instagram DM, or a message from the business's own website — so no inquiry sits unanswered. It also sends appointment reminders, requests Google reviews at the right moment, offers on-site chat, and can build the business a website. Success = a business stops losing customers to slow response, without changing their phone number or the apps they already use.

## Positioning

The mechanism a competitor can't just claim: APLORY auto-responds to the client's *own* channel within seconds of contact (not a callback queue, not a generic chatbot bolted onto one channel) and requires zero change to the business's existing number or accounts — it attaches to what they already use.

## Operating Context

- Business already has a phone number and is present on some combination of WhatsApp/Viber/Instagram; APLORY connects to those, no new number and no account migration.
- Purchase happens after a sales conversation booked through the site's contact form — this is not self-serve signup, it's a lead-gen landing page.
- Netlify Forms handles form submission (see `netlify.toml`, the hidden static form twin in `index.html`, and `ContactForm.jsx`). No backend beyond that.
- Two real, in-production products are advertised: the automated response system (calls/WhatsApp/Viber/Instagram/site chat + reminders + review requests) and website-building services. A voice agent that answers phone calls directly is in development and explicitly NOT for sale yet — this must not be implied as available.

## Capabilities and Constraints

- Static site: Vite + React + Tailwind v4, no server-rendering, deployed to Netlify.
- Legal pages (`politika-privatnosti.html`, `uslovi-koriscenja.html`, `politika-kolacica.html`, `izjava-o-pristupacnosti.html`) are Serbian-only static HTML entry points, out of scope for this redesign — they must keep working and stay linked from the footer, but their content/authorship is not ours to rewrite.
- Serbian-only for this rebuild (English toggle removed for now, may return later).
- Contact form keeps its 3-step wizard shape (services → industry → contact details) but copy/options inside each step get simplified for this rebuild.
- Data/research section (call-answer-rate chart, cited third-party studies, animated call-fork diagram) is cut. At most one plain-language supporting stat may remain; any number shown must stay attributed if it's someone else's research, never presented as APLORY's own results.
- A chatbot widget script (buildmyagent.io) is embedded in `index.html`; leave it unless the user asks otherwise.

## Brand Commitments

- Name: APLORY. Existing logo/wordmark assets in `public/` (gradient blue-to-indigo mark) stay as the identity mark even though the page ground is moving from dark to light — treat the logo file as fixed, design the new light surface around it.
- Tagline in current use: "Nijedan upit ne ostaje bez odgovora" ("No inquiry goes unanswered") — durable positioning line, may be reused or closely adapted.

## Evidence on Hand

- `src/data/research.js` holds three third-party US studies (2007–2016) on response-time impact. Per this redesign's scope, these are being cut from the main narrative; do not fabricate new stats to replace them. If one plain stat is kept, pull it from this existing sourced data rather than inventing a number.
- No real client results/testimonials exist yet — none may be fabricated.

## Product Principles

1. A first-time visitor must understand within seconds what APLORY does and who it's for — this rebuild exists because that wasn't true of the previous design.
2. Every claim on the page must be something APLORY can deliver today; the voice agent stays unmentioned rather than teased.
3. Zero friction: minimize what a visitor must read or decide before they understand the offer and can act (contact/book a call).
4. No number appears without knowing whether it's APLORY's own result or someone else's research — and it's labeled accordingly.
