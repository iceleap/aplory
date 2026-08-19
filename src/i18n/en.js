/**
 * English copy. Mirrors the shape of sr.js exactly — a missing key here renders
 * as nothing, so keep the two in step when editing.
 *
 * The legal documents are not translated: a translated Terms or Privacy Policy
 * is a legal instrument in its own right and has to come from whoever drafted
 * the originals. The footer says so.
 */
export default {
  htmlLang: "en",
  meta: {
    title: "APLORY — no enquiry goes unanswered",
    description:
      "A missed call, WhatsApp, Viber, Instagram or a message from your site. APLORY answers every enquiry automatically, within seconds.",
  },

  nav: {
    home: "APLORY — home",
    sections: "Sections",
    cta: "Book a call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // Names the action, not the control: the button switches to the other one.
    languageToggle: "Switch to Serbian",
    tabs: {
      problem: "Problem",
      resenje: "Solution",
      rezultat: "Outcome",
      pitanja: "Questions",
    },
  },

  hero: {
    title: "No enquiry goes unanswered.",
    lede: "A missed call, a message on WhatsApp, Viber or Instagram. Every enquiry gets an answer automatically, within seconds.",
    ctaPrimary: "Book a call",
    ctaSecondary: "What we do",
    diagramAlt:
      "Missed calls, WhatsApp, Viber, Instagram and messages from your site. Every channel leads to one answered enquiry.",
    channels: ["Missed call", "WhatsApp", "Viber", "Instagram", "Message from site"],
    hub: { title: "Answered", note: "within seconds" },
  },

  problem: {
    eyebrow: "Problem",
    title: "A call nobody answers is a customer calling the next number.",
    lead: "The phone rings while you work, after hours and at weekends. 411 Locals counted how many of those calls nobody picks up.",
    cards: [
      {
        title: "It rings while you work",
        body: "Your hands are full and the phone rings out. That call rarely comes twice.",
      },
      {
        title: "It rings after hours",
        body: "Evenings, weekends, holidays. People look for a service when they need it, not when it suits you.",
      },
      {
        title: "It rings faster elsewhere",
        body: "Whoever answers first gets the booking. Everyone else gets voicemail.",
      },
    ],
  },

  chart: {
    caption: "Of every 100 calls to a small business",
    headlineLabel: "of calls nobody answers",
    sourcePrefix: "Source:",
    sourceLabel: "411 Locals, 2016 — 85 businesses, 58 industries, 30 days",
    // English uses a full stop as the decimal separator.
    pct: { live: "37.8", voicemail: "37.8", none: "24.3" },
    segments: {
      live: "Someone answers",
      voicemail: "Voicemail",
      none: "No answer at all",
    },
    description:
      "Of 100 calls placed to a small business, 37.8 percent are answered by a person, 37.8 percent end in voicemail, and 24.3 percent get no answer at all.",
  },

  services: {
    eyebrow: "Solution",
    title: "We catch every enquiry and answer on your behalf.",
    // The first item is rendered as the section's lead, the rest as a ledger
    // beneath it — see Services.jsx. These two label those two groups.
    leadTag: "Main service",
    moreTag: "Alongside it",
    items: [
      {
        name: "Text back after a missed call",
        line: "Whoever can't reach you gets a message within seconds. The conversation starts right away, instead of the customer hanging up and dialling the next listing.",
      },
      {
        name: "Routing to the channels your customers use",
        line: "The conversation continues wherever it's easiest for the customer, on the channels you already use.",
      },
      {
        name: "Appointment reminders",
        line: "An automatic reminder before the appointment. Fewer no-shows.",
      },
      {
        name: "Google reviews",
        line: "A review request at the moment the customer is happiest.",
      },
      { name: "Website chat", line: "A visitor leaves an enquiry, you get the contact." },
      { name: "Website build", line: "A site whose first job is collecting the enquiry." },
    ],
  },

  fork: {
    eyebrow: "Outcome",
    title: "Two endings to the same call.",
    lead: "The difference is one automatic message, sent instantly.",
    origin: { time: "09:41", title: "Missed call" },
    branches: {
      without: {
        label: "Without APLORY",
        path: "Nobody calls back",
        end: { time: "09:44", title: "Calls the next on the list", outcome: "Customer lost" },
      },
      withUs: {
        label: "With APLORY",
        start: { time: "instantly", title: "Automatic reply" },
        end: { time: "09:44", title: "Appointment booked", outcome: "Customer kept" },
      },
    },
    thread: {
      missed: { label: "Missed call", time: "09:41" },
      messages: [
        { from: "us", time: "09:41", text: "Hi! We saw your call, how can we help?" },
        { from: "client", time: "09:44", text: "I need an appointment, is 17:20 today possible?" },
        { from: "us", time: "09:44", text: "Of course, booked for 17:20. See you then!" },
      ],
      confirmation: "Added to the calendar",
    },
  },

  research: {
    eyebrow: "Research",
    title: "Why response speed decides it.",
    labels: [
      "of companies never reply to an enquiry sent through their site",
      "average time to reply to an enquiry from a site",
      "lower odds of qualifying a lead if you call after 30 minutes instead of 5",
    ],
    caveatBefore:
      "Third-party research, not our own results. We cite it as evidence of the problem. Sources:",
    caveatBetween: "and",
    caveatAfter: ". US market, 2007–2016.",
  },

  faq: {
    eyebrow: "Questions",
    title: "The questions we get most often.",
    items: [
      {
        q: "What exactly do I get?",
        a: "Every enquiry that reaches you gets an automatic reply within seconds: a missed call, a message on WhatsApp, Viber, Instagram or from your site. You're in a conversation before they try anyone else.",
      },
      {
        q: "Do you build a voice agent that answers the phone?",
        a: "Not yet. We're working on it, but we don't sell it until we're sure it works properly. Everything else on this page is ready today.",
      },
      {
        q: "Do I have to change my phone number or how I work?",
        a: "No. Your number stays the same, your accounts stay the same. We attach to what you already use.",
      },
      {
        q: "Is this compliant with the law?",
        a: "Replying to an enquiry the customer sent themselves is the cleanest case legally. Campaigns to an existing database require explicit marketing consent (Serbian Advertising Act, art. 63; Personal Data Protection Act, art. 17).",
      },
    ],
    more: {
      prompt: "Have another question?",
      // Not "Write to us" — that is the Contact CTA just below. See sr.js.
      cta: "Get in touch",
    },
  },

  contact: {
    eyebrow: "Contact",
    title: "Tell us where your enquiries arrive.",
    newWindow: " (opens in a new window)",
    channels: { email: "Email", phone: "Phone" },
    otherValue: "WhatsApp · Viber · SMS",
    form: {
      legend: "Send an enquiry",
      honeypot: "Do not fill in this field",
      fields: {
        name: { label: "Name", placeholder: "Your name" },
        email: { label: "Email", placeholder: "you@email.com" },
        phone: { label: "Phone", optional: "optional", placeholder: "+381 69 123 4567" },
        // Options are keyed by the slug that gets submitted, never by position:
        // the order in ContactForm.jsx can change without rewriting what a
        // stored answer means.
        industry: {
          label: "Line of work",
          optional: "optional",
          placeholder: "Select your line of work",
          otherLabel: "What do you do?",
          otherPlaceholder: "Tell us your line of work",
          options: {
            stomatolog: "Dental practice",
            veterinar: "Veterinary clinic",
            advokat: "Law firm",
            majstor: "Tradesperson / handyman",
            nekretnine: "Property & lettings",
            autoservis: "Auto repair shop",
            salon: "Hair & beauty salon",
            ordinacija: "Private practice / clinic",
            gradnja: "Construction & renovation",
            autoskola: "Driving school",
            knjigovodstvo: "Accounting firm",
            selidbe: "Removals & haulage",
            drugo: "Other",
          },
        },
        services: {
          label: "What are you most interested in?",
          optional: "optional",
          hint: "You can pick more than one.",
          options: {
            "promasen-poziv": "Missed-call text back",
            chat: "Website chat",
            sajt: "Website build",
            ostalo: "Something else",
          },
          otherLabel: "What else are you after?",
          otherPlaceholder: "Tell us what you need",
        },
        message: {
          label: "Message",
          placeholder: "Where do your enquiries arrive, and roughly how many a day?",
        },
      },
      submit: "Send enquiry",
      sending: "Sending…",
      sent: "Thank you, your message arrived. We'll get back to you shortly.",
      error: "Sending failed. Write to us directly at office.aplory@gmail.com.",
      privacyBefore: "By sending this you accept our ",
      privacyLink: "privacy policy",
      privacyAfter: ".",
    },
    footer: {
      rights: "© 2026 APLORY",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      legalNote: "in Serbian",
    },
  },
};
