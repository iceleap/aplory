/**
 * Every figure used on the page, with its primary source.
 *
 * These are INDUSTRY BENCHMARKS, not APLORY's own client results. The copy that
 * renders them says so explicitly — presenting third-party research as our own
 * outcomes would be misleading. Replace with real client data once it exists.
 *
 * All three studies are US samples; that caveat is printed on the page.
 *
 * Only language-neutral data lives here — figures, colours, cell counts and
 * source URLs. The readable labels are in src/i18n/, keyed by the same `key`
 * and array order used below.
 */

/** 411 Locals, 2016 — 85 businesses across 58 industries, monitored 30 days. */
export const callOutcomes = {
  sourceUrl: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
  // Percentages are of all incoming calls and sum to 99.9 in the original study;
  // the waffle rounds them to whole calls out of 100. The printed percentages
  // live in the language files, since the decimal separator differs.
  segments: [
    { key: "live", cells: 38, color: "var(--color-c-live)" },
    { key: "voicemail", cells: 38, color: "var(--color-c-vm)" },
    { key: "none", cells: 24, color: "var(--color-c-none)" },
  ],
  headline: 62,
};

/** Benchmarks shown in the research section; labels are in src/i18n/. */
export const benchmarks = [
  {
    value: "23%",
    source: {
      label: "Harvard Business Review, 2011",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    },
  },
  {
    value: "42h",
    source: {
      label: "Harvard Business Review, 2011",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    },
  },
  {
    value: "21×",
    source: {
      label: "MIT / InsideSales Lead Response Management, 2007",
      url: "https://www.leadresponsemanagement.org/lrm_study",
    },
  },
];
