/**
 * Every figure used on the page, with its primary source.
 *
 * These are INDUSTRY BENCHMARKS, not APLORY's own client results. The copy that
 * renders them says so explicitly — presenting third-party research as our own
 * outcomes would be misleading. Replace with real client data once it exists.
 *
 * All three studies are US samples; that caveat is printed on the page.
 */

/** 411 Locals, 2016 — 85 businesses across 58 industries, monitored 30 days. */
export const callOutcomes = {
  source: {
    label: "411 Locals, 2016 — 85 firmi, 58 delatnosti, 30 dana",
    url: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
  },
  // Percentages are of all incoming calls and sum to 99.9 in the original study;
  // the waffle rounds them to whole calls out of 100. Written with a comma
  // decimal separator, as Serbian uses.
  segments: [
    { key: "live", label: "Neko se javi", pct: "37,8", cells: 38, color: "var(--color-c-live)" },
    { key: "voicemail", label: "Govorna pošta", pct: "37,8", cells: 38, color: "var(--color-c-vm)" },
    { key: "none", label: "Bez ikakvog odgovora", pct: "24,3", cells: 24, color: "var(--color-c-none)" },
  ],
  headline: 62,
  headlineLabel: "poziva na koje se niko ne javi",
};

/** Benchmarks shown in the "Rezultati istraživanja" section. */
export const benchmarks = [
  {
    value: "23%",
    label: "firmi nikada ne odgovori na upit poslat preko sajta",
    note: "Revizija 2.241 američke firme",
    source: {
      label: "Harvard Business Review, 2011",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    },
  },
  {
    value: "42h",
    label: "prosečno vreme odgovora na upit sa sajta",
    note: "Među firmama koje su uopšte odgovorile u roku od 30 dana",
    source: {
      label: "Harvard Business Review, 2011",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    },
  },
  {
    value: "21×",
    label: "manje šanse da kvalifikujete kontakt ako zovete posle 30 minuta umesto posle 5",
    note: "3 godine podataka, preko 15.000 kontakata i 100.000 poziva",
    source: {
      label: "MIT / InsideSales Lead Response Management, 2007",
      url: "https://www.leadresponsemanagement.org/lrm_study",
    },
  },
];
