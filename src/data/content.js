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
/**
 * One missed call forking into two futures.
 *
 * Three nodes only — the shared origin and the two endings. What happens along
 * each path is written on the branch rather than given its own node, which keeps
 * the diagram readable.
 *
 * The 09:47 on the failure branch is an illustrative scenario, not a measured
 * figure: roughly the time it takes to hang up, reopen the search results, pick
 * the next listing and dial it. The cited research lives in research.js.
 */
export const outcomeFork = {
  spanMin: 8,
  origin: { time: "09:41", title: "Propušten poziv" },
  branches: [
    {
      key: "withUs",
      label: "Sa APLORY",
      tone: "good",
      path: "Automatska poruka odlazi za 30 sekundi",
      end: {
        atMin: 3,
        time: "09:44",
        title: "Termin zakazan",
        outcome: "Klijent zadržan",
      },
    },
    {
      key: "without",
      label: "Bez APLORY",
      tone: "bad",
      path: "Niko ne uzvrati",
      end: {
        atMin: 6,
        time: "09:47",
        title: "Zove sledećeg na spisku",
        outcome: "Klijent izgubljen",
      },
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
