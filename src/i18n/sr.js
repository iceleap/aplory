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
    title: "kad vas neko traži — APLORY odgovara porukom za vas",
    description:
      "Propušten poziv, WhatsApp, Instagram ili poruka sa sajta. APLORY automatski odgovara porukom na svaki upit za nekoliko sekundi, dok vi radite nešto drugo.",
  },

  nav: {
    home: "APLORY — početna",
    sections: "Sekcije",
    cta: "Zakažite razgovor",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    tabs: {
      problem: "Problem",
      kako: "Kako radi",
      resenje: "Sve usluge",
      "za-koga": "Za koga",
      pitanja: "Pitanja",
    },
  },

  hero: {
    kicker: "Za firme koje ne stignu da se jave na svaki poziv",
    title: "Kad vas neko traži, APLORY odgovara porukom. Automatski.",
    lede: "Propušten poziv, poruka na WhatsAppu, Instagramu ili sa sajta — APLORY odmah odgovori porukom umesto vas, na broju i nalozima koje već koristite.",
    ctaPrimary: "Zakažite razgovor",
    ctaSecondary: "Kako radi",
    diagramAlt:
      "Propušten poziv, WhatsApp, Instagram i poruke sa sajta. Svi kanali vode do jednog odgovorenog upita.",
    channels: ["Propušten poziv", "WhatsApp", "Instagram", "Poruka sa sajta"],
    hub: { title: "Odgovoreno", note: "za par sekundi" },
  },

  problem: {
    eyebrow: "Problem",
    title: "Poziv na koji niko ne odgovori je klijent koji zove sledećeg na spisku.",
    cards: [
      {
        title: "Dok radite",
        body: "Ruke su vam pune, a telefon zvoni bez odgovora. Taj poziv se retko ponovi.",
      },
      {
        title: "Posle radnog vremena",
        body: "Večeri, vikendi, praznici. Ljudi traže uslugu kad njima odgovara, ne kad je neko tu da se javi.",
      },
      {
        title: "Kod konkurencije",
        body: "Ko prvi odgovori, taj dobija klijenta. Ostali dobiju govornu poštu.",
      },
    ],
    stat: {
      value: "62%",
      body: "poziva ka malim firmama ne dobije odgovor.",
      source:
        "Prema istraživanju američke kompanije 411 Locals iz 2016. godine, na uzorku od 85 malih firmi iz 58 delatnosti, 62% dolaznih poziva ostane bez odgovora — orijentacioni podatak iz SAD, jer ekvivalentno istraživanje za Srbiju još ne postoji.",
    },
  },

  how: {
    eyebrow: "Kako radi",
    title: "Klijent zove. Ne stignete da se javite. APLORY se javlja umesto vas.",
    nicheTitle: "Kako bi to izgledalo u vašoj branši.",
    mock: {
      caption: "Ovako izgleda na telefonu klijenta:",
      connector: "APLORY se javlja za par sekundi",
      legendIn: "APLORY",
      legendOut: "Klijent",
      /* The generic thread behind HowItWorks.jsx when no niche passes its own
         (see `demo` in src/data/niches.js for the per-profession versions). */
      demo: {
        missedLabel: "Propušten poziv",
        missedNumber: "+381 6x xxx xxx",
        messages: [
          { type: "in", text: "Zdravo. Ovde servis klima uređaja. Nismo mogli da se javimo, na terenu smo. Napišite šta vam treba i odgovaramo odmah." },
          { type: "out", text: "Ne radi mi klima u stanu, duva mlako. Može neko danas?" },
          { type: "in", text: "Može. Koji je model i koja adresa?" },
          { type: "out", text: "Gree, dvanaestica. Vojvode Mišića 14, Valjevo." },
          { type: "in", text: "Imamo termin danas u 16.30 ili sutra u 9. Šta vam odgovara?" },
          { type: "out", text: "Danas u 16.30." },
        ],
      },
    },
    steps: [
      {
        n: "01",
        title: "Klijent vas kontaktira",
        body: "Pozivom, WhatsAppom, Instagramom ili porukom sa sajta — kanal koji već koristite.",
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
        line: "WhatsApp ili Instagram — razgovor se nastavlja tamo gde je klijentu najlakše.",
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

  /* Only used on sta-radimo.html (see StaRadimo.jsx) — the mechanism/data/
     onboarding depth the SEO content audit flagged as missing from that
     page. Every claim here restates something already said elsewhere on the
     site (per-niche FAQ answers, the Contact section's own copy) rather
     than introducing a new commitment — no SLA numbers or uptime figures
     are invented here. */
  mechanism: {
    eyebrow: "Mehanizam",
    title: "Kako APLORY funkcioniše, korak po korak.",
    items: [
      {
        name: "Povezivanje bez menjanja broja",
        line: "APLORY se kači na broj telefona, WhatsApp, Instagram i chat na sajtu koje već koristite — ništa se ne prenosi niti menja. Kad poziv ili poruka ostane bez odgovora, APLORY preuzima razgovor na tom istom kanalu, sa istim brojem ili nalogom koji klijent već vidi.",
      },
      {
        name: "Kako počinje saradnja",
        line: "Podešavanje počinje kratkim razgovorom bez obaveze, u kom kažete čime se bavite. APLORY se zatim poveže na kanale koje već koristite; broj i nalozi ostaju vaši od prvog dana, bez instaliranja ičega na vašoj strani.",
      },
      {
        name: "Šta se dešava sa podacima koje klijent ostavi",
        line: "Prikupljaju se samo osnovni podaci potrebni da se odgovori na upit ili zakaže termin — ime, kontakt i razlog obraćanja, prilagođeno delatnosti. Osetljivi podaci poput medicinske dokumentacije, pravnih spisa ili podataka o plaćanju ne prolaze kroz APLORY; ti podaci ostaju deo razgovora koji dalje vodite direktno sa klijentom.",
      },
      {
        name: "Šta ostaje na vama",
        line: "U svakom trenutku možete preuzeti razgovor i nastaviti ga lično. APLORY ne donosi konačne odluke — ne postavlja dijagnozu, ne daje pravni savet i ne garantuje cenu; prikuplja kontekst i nudi termin na osnovu onoga što vi unapred definišete.",
      },
    ],
  },

  faq: {
    eyebrow: "Pitanja",
    title: "Pitanja koja najčešće dobijamo.",
    items: [
      {
        q: "Šta konkretno dobijam?",
        a: "Svaki upit koji vam stigne dobija automatski odgovor za par sekundi: propušten poziv, poruka na WhatsAppu, Instagramu ili sa sajta. Razgovor je već počeo pre nego što klijent proba nekog drugog.",
      },
      {
        q: "Da li radite glasovnog agenta koji se javlja na telefon?",
        a: "Još ne. Radimo na tome, ali ga ne prodajemo dok ne budemo sigurni da radi kako treba. Sve ostalo sa ove strane je spremno danas.",
      },
      {
        q: "Da li je ovo samo automatska SMS poruka na propušten poziv?",
        a: "Ne. Jednokratno automatsko obaveštenje ume da pošalje bilo koji telefon. APLORY vodi ceo razgovor koji sledi — postavlja pitanja, prikuplja ono što je bitno za vašu delatnost i nudi termin, umesto da klijent ostane sa jednom porukom bez odgovora.",
      },
      {
        q: "Da li moram da menjam broj telefona ili način rada?",
        a: "Ne. Broj ostaje isti, vaši nalozi ostaju isti. Mi se kačimo na ono što već koristite.",
      },
      {
        q: "Da li je ovo u skladu sa zakonom?",
        a: "APLORY je servis koji malim firmama u Srbiji automatski odgovara na propuštene pozive i poruke. Odgovor na upit koji klijent sam pošalje — propušten poziv, poruka na WhatsAppu, Instagramu ili sa sajta — pravno je najčistiji mogući slučaj: to je transakcioni odgovor na nešto što je klijent sam inicirao, ne neželjena marketinška poruka poslata bez povoda. APLORY ne šalje ništa dok upit prvo ne stigne od klijenta, a sadržaj odgovora unapred definiše firma koja ga koristi, nije generisan proizvoljno. Situacija je drugačija samo kod kampanja prema staroj bazi kontakata koji nisu upravo pisali — tu se, po Zakonu o oglašavanju (čl. 63) i Zakonu o zaštiti podataka o ličnosti (čl. 17), traži izričit prethodni pristanak primaoca za marketinšku komunikaciju. APLORY danas ne šalje takve kampanje. Ako se opcija slanja poruka staroj bazi ikad doda, pristanak bi se tražio odvojeno i eksplicitno pre slanja, ne pretpostavljao unapred.",
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
    otherValue: "WhatsApp · SMS",
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
            "klima-i-grejanje": "Klima i grejanje",
            "pvc-stolarija": "PVC stolarija",
            majstori: "Majstori i kućni servisi",
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
