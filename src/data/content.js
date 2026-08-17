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
 * The Rezultat section: one missed inquiry, two endings.
 *
 * Both columns open on the same 09:41 event on purpose — the input is identical
 * and only the ending differs. One short line per step; the contrast does the
 * explaining, so nothing here needs a paragraph.
 */
export const outcomeTimeline = {
  /* Axis length in minutes from 09:41. 09:52 lands at 11 of 12, leaving a
     little room at the right for the last label. */
  spanMin: 12,
  tracks: [
    {
      key: "without",
      label: "Bez APLORY",
      outcome: "Upit izgubljen",
      tone: "bad",
      /* Silence is not an event — it is the stretch between the two that are,
         so it renders as the empty run of axis rather than a node. */
      gap: { fromMin: 0, toMin: 11, label: "11 minuta tišine" },
      nodes: [
        { atMin: 0, time: "09:41", title: "Propušten poziv", tone: "miss" },
        { atMin: 11, time: "09:52", title: "Zove sledećeg na spisku", tone: "lost" },
      ],
    },
    {
      key: "withUs",
      label: "Sa APLORY",
      outcome: "Klijent zadržan — sve gotovo za 3 minuta",
      tone: "good",
      nodes: [
        { atMin: 0, time: "09:41", title: "Propušten poziv", tone: "miss" },
        { atMin: 0.5, time: "+30 sek", title: "Automatska poruka", tone: "send" },
        { atMin: 3, time: "09:44", title: "Termin zakazan", tone: "done" },
      ],
    },
  ],
};

/** The message thread shown in the phone mockup under the success track. */
export const recoveryThread = {
  caption: "Ovo klijent dobije",
  missed: { label: "Propušten poziv", time: "09:41" },
  messages: [
    {
      from: "us",
      time: "09:41",
      text: "Zdravo! Videli smo vaš poziv — kako možemo da pomognemo?",
    },
    { from: "client", time: "09:43", text: "Treba mi termin, može danas u 17:20?" },
    { from: "us", time: "09:44", text: "Naravno, zakazano za 17:20. Vidimo se!" },
  ],
  confirmation: "Termin zakazan · upisano u kalendar",
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
