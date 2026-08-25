/**
 * Serbian copy — the site's only language for this rebuild (see PRODUCT.md).
 *
 * Every user-facing string lives here; components read it through useCopy().
 * Numbers, colours, source URLs and other language-neutral data stay in
 * src/data/research.js.
 */
export default {
  htmlLang: "sr",
  meta: {
    title: "APLORY — kad vas neko traži, odgovara za vas",
    description:
      "Propušten poziv, WhatsApp, Viber, Instagram ili poruka sa sajta. APLORY automatski odgovara na svaki upit za nekoliko sekundi, dok vi radite nešto drugo.",
  },

  nav: {
    home: "APLORY — početna",
    sections: "Sekcije",
    cta: "Zakažite razgovor",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    tabs: {
      problem: "Problem",
      resenje: "Šta radimo",
      pitanja: "Pitanja",
    },
  },

  hero: {
    kicker: "Za firme koje ne stignu da se jave na svaki poziv",
    title: "Kad vas neko traži, APLORY odgovara. Automatski.",
    lede: "Propušten poziv, poruka na WhatsAppu, Viberu, Instagramu ili sa sajta — APLORY odmah odgovori umesto vas, na broju i nalozima koje već koristite.",
    ctaPrimary: "Zakažite razgovor",
    ctaSecondary: "Kako to radi",
    diagramAlt:
      "Propušten poziv, WhatsApp, Viber, Instagram i poruke sa sajta. Svi kanali vode do jednog odgovorenog upita.",
    channels: ["Propušten poziv", "WhatsApp", "Viber", "Instagram", "Poruka sa sajta"],
    hub: { title: "Odgovoreno", note: "za par sekundi" },
  },

  problem: {
    eyebrow: "Problem",
    title: "Poziv na koji niko ne odgovori je klijent koji zove sledećeg na spisku.",
    lead: "Telefon zvoni dok radite, posle radnog vremena i vikendom. Svaki taj propušten poziv je izgubljen posao.",
    cards: [
      {
        title: "Zvoni dok radite",
        body: "Ruke su vam pune, a telefon zvoni bez odgovora. Taj poziv se retko ponovi.",
      },
      {
        title: "Zvoni posle radnog vremena",
        body: "Večeri, vikendi, praznici. Ljudi traže uslugu kad njima odgovara, ne kad je neko tu da se javi.",
      },
      {
        title: "Zvoni brže kod konkurencije",
        body: "Ko prvi odgovori, taj dobija klijenta. Ostali dobiju govornu poštu.",
      },
    ],
    stat: {
      value: "62%",
      body: "poziva ka malim firmama ne dobije živu osobu na liniji — završi na govornoj pošti ili ostane bez ikakvog odgovora.",
      source: "411 Locals, 2016 — 85 firmi, 58 delatnosti, 30 dana.",
    },
  },

  how: {
    eyebrow: "Kako radi",
    title: "Bez podešavanja na vašoj strani.",
    steps: [
      {
        n: "01",
        title: "Klijent vas kontaktira",
        body: "Pozivom, WhatsAppom, Viberom, Instagramom ili porukom sa sajta — kanal koji već koristite.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što klijent proba sledeći broj.",
      },
      {
        n: "03",
        title: "Termin zakazan",
        body: "Nastavljate kad stignete, sa kontekstom već tu. Broj i nalozi ostaju isti — ništa se ne menja na vašoj strani.",
      },
    ],
  },

  services: {
    eyebrow: "Šta radimo",
    title: "Hvatamo svaki upit i odgovaramo umesto vas.",
    leadTag: "Glavna usluga",
    moreTag: "Uz to",
    items: [
      {
        name: "Poruka posle propuštenog poziva",
        line: "Ko ne dobije vas, dobije poruku za par sekundi. Razgovor počinje odmah, umesto da klijent zatvori i pozove sledeći broj sa liste.",
      },
      {
        name: "Odgovor na kanalu koji klijent koristi",
        line: "WhatsApp, Viber ili Instagram — razgovor se nastavlja tamo gde je klijentu najlakše.",
      },
      {
        name: "Podsetnici za termine",
        line: "Automatski podsetnik pre termina. Manje praznih dolazaka.",
      },
      {
        name: "Google recenzije",
        line: "Zahtev za recenziju stiže kad je klijent najzadovoljniji.",
      },
      { name: "Chat na sajtu", line: "Posetilac ostavlja upit, vi dobijate kontakt." },
      { name: "Izrada sajta", line: "Sajt čiji je prvi zadatak da prikupi upit, ne da samo lepo izgleda." },
    ],
  },

  faq: {
    eyebrow: "Pitanja",
    title: "Pitanja koja najčešće dobijamo.",
    items: [
      {
        q: "Šta konkretno dobijam?",
        a: "Svaki upit koji vam stigne dobija automatski odgovor za par sekundi: propušten poziv, poruka na WhatsAppu, Viberu, Instagramu ili sa sajta. Razgovor je već počeo pre nego što klijent proba nekog drugog.",
      },
      {
        q: "Da li radite glasovnog agenta koji se javlja na telefon?",
        a: "Još ne. Radimo na tome, ali ga ne prodajemo dok ne budemo sigurni da radi kako treba. Sve ostalo sa ove strane je spremno danas.",
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
    more: {
      prompt: "Imate drugo pitanje?",
      cta: "Kontaktirajte nas",
    },
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Javite se, javljamo se.",
    lede: "Kratak razgovor, bez obaveze. Recite nam čime se bavite, mi ćemo vam reći tačno šta APLORY menja.",
    newWindow: " (otvara se u novom prozoru)",
    channels: { email: "Email", phone: "Telefon" },
    otherValue: "WhatsApp · Viber · SMS",
    form: {
      legend: "Pošaljite upit",
      requiredError: "Ovo polje je obavezno.",
      honeypot: "Ne popunjavajte ovo polje",
      steps: {
        counter: "Korak {n} od {total}",
        next: "Dalje",
        skip: "Preskočite",
        back: "Nazad",
        services: {
          title: "Šta vam treba?",
          lede: "Izaberite ono što vas najviše zanima.",
        },
        industry: {
          title: "Čime se bavite?",
          lede: "Da bismo znali kako vaši klijenti obično zovu.",
        },
        details: {
          title: "Vaši podaci",
          lede: "Javljamo se u najkraćem roku, bez obaveze.",
        },
      },
      fields: {
        name: { label: "Ime", placeholder: "Vaše ime" },
        email: { label: "Email", placeholder: "vas@email.com" },
        phone: { label: "Telefon", optional: "opciono", placeholder: "069 123 4567" },
        industry: {
          otherLabel: "Čime se bavite?",
          otherPlaceholder: "Upišite svoju delatnost",
          options: {
            "stomatoloske-ordinacije": "Stomatološka ordinacija",
            "veterinarske-klinike": "Veterinarska klinika",
            "advokatske-kancelarije": "Advokatska kancelarija",
            "servisi-i-radionice": "Servis ili radionica",
            "medical-spa-saloni": "Medical spa / salon",
            ecommerce: "E-commerce",
            drugo: "Drugo",
          },
        },
        services: {
          options: {
            "promasen-poziv": "Odgovor na propušten poziv",
            chat: "Chat na sajtu",
            sajt: "Izrada sajta",
            ostalo: "Ostalo",
          },
          otherLabel: "Šta vas još zanima?",
          otherPlaceholder: "Upišite šta vam treba",
        },
      },
      submit: "Pošaljite upit",
      sending: "Šaljemo…",
      sentTitle: "Hvala!",
      sent: "Poruka je stigla. Javljamo se u najkraćem roku.",
      error: "Slanje nije uspelo. Pišite nam direktno na office.aplory@gmail.com.",
      privacyBefore: "Slanjem prihvatate ",
      privacyLink: "politiku privatnosti",
      privacyAfter: ".",
    },
    footer: {
      rights: "© 2026 APLORY",
      privacy: "Politika privatnosti",
      terms: "Uslovi korišćenja",
      cookies: "Politika kolačića",
      accessibility: "Izjava o pristupačnosti",
    },
  },
};
