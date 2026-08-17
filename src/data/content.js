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

/** The three steps in the Rezultat section. */
export const recoveryFlow = [
  {
    time: "09:41",
    title: "Upit stigne, a vi ste zauzeti",
    body: "Poziv koji ne stignete da javite, ili poruka van radnog vremena.",
    tone: "miss",
  },
  {
    time: "09:41 + 30s",
    title: "Automatska poruka odlazi",
    body: "„Zdravo, videli smo vaš upit. Kako možemo da pomognemo?“",
    tone: "send",
  },
  {
    time: "09:44",
    title: "Razgovor se nastavlja",
    body: "Klijent odgovara na WhatsAppu i termin je zakazan.",
    tone: "done",
  },
];

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
