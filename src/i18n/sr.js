/**
 * Serbian copy — the site's primary language and the default.
 *
 * Every user-facing string lives here or in en.js; components read them through
 * useCopy(). Numbers, colours, source URLs and other language-neutral data stay
 * in src/data/research.js.
 */
export default {
  htmlLang: "sr",
  meta: {
    title: "APLORY — nijedan upit ne ostaje bez odgovora",
    description:
      "Propušten poziv, WhatsApp, Viber, Instagram ili poruka sa sajta — APLORY automatski odgovara na svaki upit u roku od nekoliko sekundi.",
  },

  nav: {
    home: "APLORY — početna",
    sections: "Sekcije",
    cta: "Zakažite razgovor",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    // Names the action, not the control: the button switches to the other one.
    languageToggle: "Prebaci na engleski",
    tabs: {
      problem: "Problem",
      resenje: "Rešenje",
      rezultat: "Rezultat",
      pitanja: "Pitanja",
    },
  },

  hero: {
    title: "Nijedan upit ne ostaje bez odgovora.",
    lede: "Propušten poziv, poruka na WhatsAppu, Viberu ili Instagramu — svaki upit dobija odgovor automatski, u roku od nekoliko sekundi.",
    ctaPrimary: "Zakažite razgovor",
    ctaSecondary: "Šta radimo",
    diagramAlt:
      "Propušten poziv, WhatsApp, Viber, Instagram i poruke sa sajta — svi kanali vode do jednog odgovorenog upita.",
    channels: ["Propušten poziv", "WhatsApp", "Viber", "Instagram", "Poruka sa sajta"],
    hub: { title: "Odgovoreno", note: "za nekoliko sekundi" },
  },

  problem: {
    eyebrow: "Problem",
    title: "Poziv na koji se niko ne javi je klijent koji zove sledećeg.",
    lead: "Telefon zvoni dok radite, posle radnog vremena i vikendom. Istraživanja pokazuju na koliko tih poziva se niko ne javi.",
    cards: [
      {
        title: "Zvoni dok radite",
        body: "Ruke su vam pune, a telefon zvoni bez odgovora. Taj poziv se retko ponovi.",
      },
      {
        title: "Zvoni posle radnog vremena",
        body: "Večeri, vikendi, praznici. Ljudi traže uslugu kad im zatreba, ne kad vama odgovara.",
      },
      {
        title: "Zvoni brže kod konkurencije",
        body: "Ko se prvi javi, taj zakazuje. Ostali dobiju govornu poštu.",
      },
    ],
  },

  chart: {
    caption: "Od svakih 100 poziva ka maloj firmi",
    headlineLabel: "poziva na koje se niko ne javi",
    sourcePrefix: "Izvor:",
    sourceLabel: "411 Locals, 2016 — 85 firmi, 58 delatnosti, 30 dana",
    // Serbian uses a comma as the decimal separator.
    pct: { live: "37,8", voicemail: "37,8", none: "24,3" },
    segments: {
      live: "Neko se javi",
      voicemail: "Govorna pošta",
      none: "Bez ikakvog odgovora",
    },
    description:
      "Od 100 poziva upućenih maloj firmi, na 37,8 odsto se neko javi, 37,8 odsto završi na govornoj pošti, a na 24,3 odsto niko se ne javi i nema odgovora.",
  },

  services: {
    eyebrow: "Rešenje",
    title: "Hvatamo svaki upit i odgovaramo umesto vas.",
    items: [
      {
        name: "Poruka posle propuštenog poziva",
        line: "Ko ne dobije vas, dobije poruku za nekoliko sekundi.",
      },
      {
        name: "Preusmeravanje na WhatsApp, Viber i Instagram",
        line: "Razgovor se nastavlja tamo gde je klijentu najlakše.",
      },
      {
        name: "Podsetnici za termine",
        line: "Automatski podsetnik pre termina. Manje praznih dolazaka.",
      },
      {
        name: "Google recenzije",
        line: "Zahtev za recenziju kad je klijent najzadovoljniji.",
      },
      { name: "Chat na sajtu", line: "Posetilac ostavlja upit, vi dobijate kontakt." },
      { name: "Izrada sajta", line: "Sajt napravljen da pretvara posetioce u mušterije." },
    ],
  },

  fork: {
    eyebrow: "Rezultat",
    title: "Dva kraja istog poziva.",
    lead: "Razliku pravi jedna automatska poruka, poslata odmah.",
    origin: { time: "09:41", title: "Propušten poziv" },
    branches: {
      without: {
        label: "Bez APLORY",
        path: "Niko ne uzvrati",
        end: { time: "09:44", title: "Zove sledećeg na spisku", outcome: "Klijent izgubljen" },
      },
      withUs: {
        label: "Sa APLORY",
        start: { time: "odmah", title: "Automatski odgovor" },
        end: { time: "09:44", title: "Termin zakazan", outcome: "Klijent zadržan" },
      },
    },
    thread: {
      missed: { label: "Propušten poziv", time: "09:41" },
      messages: [
        { from: "us", time: "09:41", text: "Zdravo! Videli smo vaš poziv — kako možemo da pomognemo?" },
        { from: "client", time: "09:44", text: "Treba mi termin, može danas u 17:20?" },
        { from: "us", time: "09:44", text: "Naravno, zakazano za 17:20. Vidimo se!" },
      ],
      confirmation: "Upisano u kalendar",
    },
  },

  research: {
    eyebrow: "Istraživanja",
    title: "Zašto brzina odgovora odlučuje.",
    labels: [
      "firmi nikada ne odgovori na upit poslat preko sajta",
      "prosečno vreme odgovora na upit sa sajta",
      "manje šanse da kvalifikujete kontakt ako zovete posle 30 minuta umesto posle 5",
    ],
    caveatBefore: "Tuđa istraživanja, ne naši rezultati — navodimo ih kao pokazatelj problema. Izvori:",
    caveatBetween: "i",
    caveatAfter: ". Američko tržište, 2007–2016.",
  },

  faq: {
    eyebrow: "Pitanja",
    title: "Četiri pitanja, četiri odgovora.",
    items: [
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
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Recite nam kuda vam stižu upiti.",
    lede: "Javite nam koliko poziva i poruka dnevno primate. Vraćamo se sa konkretnim predlogom — bez obaveze i bez dugog prodajnog razgovora.",
    cta: "Pišite nam",
    newWindow: " (otvara se u novom prozoru)",
    channels: { email: "Email", phone: "Telefon" },
    otherValue: "WhatsApp · Viber · SMS",
    footer: {
      rights: "© 2026 APLORY",
      privacy: "Politika privatnosti",
      terms: "Uslovi korišćenja",
      // Both documents exist only in Serbian.
      legalNote: null,
    },
  },
};
