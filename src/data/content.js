/** Page copy kept out of the components so it can be edited without touching JSX. */

/**
 * Services APLORY can deliver today. Anything not on this list must not appear
 * as an offer — see `upcoming` below for work in progress.
 */
export const services = [
  {
    name: "Poruka posle propuštenog poziva",
    line: "Ko ne dobije vas, dobije poruku za nekoliko sekundi.",
    icon: "message",
  },
  {
    name: "Preusmeravanje na WhatsApp, Viber i Instagram",
    line: "Razgovor se nastavlja tamo gde je klijentu najlakše.",
    icon: "nodes",
  },
  {
    name: "Podsetnici za termine",
    line: "Automatski podsetnik pre termina. Manje praznih dolazaka.",
    icon: "bell",
  },
  {
    name: "Google recenzije",
    line: "Zahtev za recenziju kad je klijent najzadovoljniji.",
    icon: "star",
  },
  {
    name: "Chat na sajtu",
    line: "Posetilac ostavlja upit, vi dobijate kontakt.",
    icon: "window",
  },
  {
    name: "Izrada sajta",
    line: "Sajt napravljen da pretvara posetioce u mušterije.",
    icon: "layout",
  },
];

/** Not sold yet. Shown so the roadmap is visible without promising a date. */
export const upcoming = {
  name: "Glasovni agent",
  line: "Radimo na tome. Javićemo kad bude spreman za korišćenje.",
  icon: "phone",
};

/**
 * One missed call at 09:41, two endings three minutes later.
 *
 * Both branches finish at 09:44 on purpose: the point is not that one path is
 * faster but that the same moment produces opposite outcomes. Because the two
 * endings coincide, horizontal position carries no information and the diagram
 * lays itself out from a single constant in Flow.jsx — there is no time scale
 * left to model here.
 */
export const outcomeFork = {
  origin: { time: "09:41", title: "Propušten poziv" },
  /* Order is render order: the losing path runs along the top, ours along the
     bottom, so the section ends on the good outcome. */
  branches: [
    {
      key: "without",
      label: "Bez APLORY",
      tone: "bad",
      path: "Niko ne uzvrati",
      end: {
        time: "09:44",
        title: "Zove sledećeg na spisku",
        outcome: "Klijent izgubljen",
      },
    },
    {
      key: "withUs",
      label: "Sa APLORY",
      tone: "good",
      /* The conversation starts at this branch's opening node, so the mockup
         hangs there rather than at the ending. */
      mockup: true,
      start: { time: "odmah", title: "Automatski odgovor" },
      end: {
        time: "09:44",
        title: "Termin zakazan",
        outcome: "Klijent zadržan",
      },
    },
  ],
};

/**
 * The thread shown in the phone, which hangs off the success branch's opening
 * node — that is the moment the conversation starts. The booking itself is
 * stated once, on the branch's endpoint, so the footer here does not repeat it.
 */
export const recoveryThread = {
  missed: { label: "Propušten poziv", time: "09:41" },
  messages: [
    {
      from: "us",
      time: "09:41",
      text: "Zdravo! Videli smo vaš poziv — kako možemo da pomognemo?",
    },
    { from: "client", time: "09:44", text: "Treba mi termin, može danas u 17:20?" },
    { from: "us", time: "09:44", text: "Naravno, zakazano za 17:20. Vidimo se!" },
  ],
  confirmation: "Upisano u kalendar",
};

export const faq = [
  {
    q: "Šta konkretno dobijam?",
    a: "Svaki upit koji vam stigne — propušten poziv, poruka na WhatsAppu, Viberu, Instagramu ili sa sajta — dobija automatski odgovor za nekoliko sekundi, pa se razgovor nastavlja umesto da se ugasi.",
  },
  {
    q: "Da li radite glasovnog agenta koji se javlja na telefon?",
    a: "Još ne. Radimo na tome, ali ga ne prodajemo dok ne budemo sigurni da radi kako treba. Sve ostalo sa ove strane je spremno i radi danas.",
  },
  {
    q: "Da li moram da menjam broj telefona ili način rada?",
    a: "Ne. Broj ostaje isti, vaši nalozi ostaju isti. Mi se kačimo na ono što već koristite.",
  },
  {
    q: "Da li je ovo u skladu sa zakonom?",
    a: "Odgovor na upit koji je klijent sam poslao je pravno najčistiji slučaj. Za kampanje prema staroj bazi traži se izričit pristanak za marketing (Zakon o oglašavanju, čl. 63; Zakon o zaštiti podataka o ličnosti, čl. 17).",
  },
];
