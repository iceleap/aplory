/**
 * Per-niche landing page content — one entry per profession, each rendered by
 * src/pages/NicheLanding.jsx through its own Vite entry (see vite.config.js).
 *
 * `industryValue` must match a slug in ContactForm.jsx's INDUSTRIES array
 * (and its label in src/i18n/sr.js under contact.form.fields.industry.options)
 * so the contact form can be pre-selected to the right step when a visitor
 * arrives from that niche's page.
 *
 * Photos live in /public/niche/<slug>.jpg — free-license stock (Pexels
 * License: free for commercial use, no attribution required).
 */

const niches = [
  {
    slug: "stomatolozi",
    navLabel: "Stomatolozi",
    industryValue: "stomatoloske-ordinacije",
    photo: "/niche/stomatolozi.jpg",
    photoAlt: "Stomatološkinja u ordinaciji",
    eyebrow: "Za stomatološke ordinacije",
    heroTitle: "Kad pacijent zove, APLORY zakazuje termin. Dok vi radite u stolici.",
    heroLede:
      "Recepcija ne može da se javi dok traje intervencija. APLORY odgovara na propušten poziv, WhatsApp i Instagram poruku odmah, zakazuje termin i podseti pacijenta pre dolaska.",
    metaTitle: "APLORY za stomatološke ordinacije — automatski odgovor pacijentima",
    metaDescription:
      "Propušten poziv dok ste sa pacijentom u stolici? APLORY odmah odgovara na poziv, WhatsApp i Instagram poruku, zakazuje termin i šalje podsetnik pre dolaska.",
    pains: [
      {
        title: "Telefon zvoni dok ste u stolici",
        body: "Ruke su vam zauzete, asistentkinja je takođe. Poziv ostane bez odgovora, a pacijent često pozove sledeću ordinaciju sa liste.",
      },
      {
        title: "Zakazivanje van radnog vremena",
        body: "Ljudi traže termin uveče ili vikendom, kad ordinacija ne radi. Do ponedeljka ujutru već su zvali nekog drugog.",
      },
      {
        title: "Otkazani termini bez najave",
        body: "Prazan termin je izgubljen prihod za taj sat. Podsetnik dan ranije to najčešće spreči.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Ovde stomatološka ordinacija, trenutno smo sa pacijentom. Napišite šta vas boli, javljamo se odmah." },
        { type: "out", text: "Boli me zub gore levo već dva dana, može li pregled sutra?" },
        { type: "in", text: "Može. Da li ste ranije bili kod nas ili je ovo prvi pregled?" },
        { type: "out", text: "Prvi put dolazim." },
        { type: "in", text: "Imamo termin sutra u 11 ili u 16.30. Šta vam više odgovara?" },
        { type: "out", text: "11 sati mi odgovara." },
      ],
    },
  },
  {
    slug: "veterinari",
    navLabel: "Veterinari",
    industryValue: "veterinarske-klinike",
    photo: "/niche/veterinari.jpg",
    photoAlt: "Veterinar sa ljubimcem u klinici",
    eyebrow: "Za veterinarske klinike",
    heroTitle: "Vlasnik ljubimca piše u paničnom trenutku. APLORY mu odmah odgovori.",
    heroLede:
      "Poziv usred pregleda, poruka na WhatsAppu u pola noći — APLORY hvata svaki upit odmah, dok vi i tim ostajete uz pacijenta koji je već na stolu.",
    metaTitle: "APLORY za veterinarske klinike — automatski odgovor vlasnicima ljubimaca",
    metaDescription:
      "Propušten poziv ili Instagram poruka dobija odgovor za par sekundi. APLORY zakazuje preglede i podseća na vakcinaciju, dok se tim posvećuje pacijentu koji je već tu.",
    pains: [
      {
        title: "Poziv stiže usred pregleda",
        body: "Ruke su vam pune, doslovno. Telefon zvoni dok pregledate pacijenta, i taj poziv se retko ponovi.",
      },
      {
        title: "Hitni slučajevi van radnog vremena",
        body: "Ljubimac se razboli uveče ili vikendom, kad klinika ne radi. Vlasnik traži prvu kliniku koja odgovori.",
      },
      {
        title: "Propuštena revakcinacija",
        body: "Bez podsetnika, termin za vakcinu ili kontrolu lako prođe neopaženo — za vlasnika i za kliniku.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Ovde veterinarska klinika, trenutno smo sa pacijentom. Šta se dešava sa vašim ljubimcem?" },
        { type: "out", text: "Mačka mi povraća od jutros i ne jede ništa." },
        { type: "in", text: "Razumem. Da li je ranije bila kod nas? Trebalo bi da je pregledamo danas." },
        { type: "out", text: "Bila je pre par meseci na vakcinaciji." },
        { type: "in", text: "Imamo mesto danas u 15.30 ili sutra ujutru u 9. Šta vam odgovara?" },
        { type: "out", text: "Danas u 15.30, hvala." },
      ],
    },
  },
  {
    slug: "advokati",
    navLabel: "Advokati",
    industryValue: "advokatske-kancelarije",
    photo: "/niche/advokati.jpg",
    photoAlt: "Advokatkinja u kancelariji",
    eyebrow: "Za advokatske kancelarije",
    heroTitle: "Klijent zove usred ročišta. APLORY odgovori umesto vas.",
    heroLede:
      "Na sudu ili sa strankom ne možete da se javite. APLORY prihvata upit sa poziva, sajta ili poruke, zabeleži o čemu se radi i javi vam se čim budete slobodni.",
    metaTitle: "APLORY za advokatske kancelarije — automatski odgovor na upit klijenta",
    metaDescription:
      "Propušten poziv dok ste na ročištu ili sa strankom? APLORY odmah odgovara na upit, beleži o čemu se radi i prosleđuje vam kontakt čim ste slobodni.",
    pains: [
      {
        title: "Nedostupni ste na ročištu",
        body: "Telefon je na nemo dok traje ročište ili sastanak. Ko god zove u tom trenutku, ostaje bez odgovora.",
      },
      {
        title: "Prvi upit odlučuje",
        body: "Ko prvi odgovori na hitan pravni problem, taj najčešće dobije klijenta. Ostali dobiju govornu poštu.",
      },
      {
        title: "Nejasan upit bez konteksta",
        body: "Propušten poziv sam po sebi ne kaže ništa o čemu se radi — vraćate poziv naslepo, često van radnog vremena klijenta.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Ovde advokatska kancelarija, trenutno smo na ročištu. Ukratko opišite o čemu se radi, javljamo se čim završimo." },
        { type: "out", text: "Treba mi konsultacija oko raskida ugovora o radu, poslodavac me otpustio bez obrazloženja." },
        { type: "in", text: "Razumem. Da li imate rešenje o otkazu u pisanoj formi?" },
        { type: "out", text: "Imam, dobio sam ga juče." },
        { type: "in", text: "Dobro. Možemo sutra u 10 na kratku konsultaciju, doneli biste rešenje. Odgovara?" },
        { type: "out", text: "Odgovara, hvala." },
      ],
    },
  },
  {
    slug: "auto-servisi",
    navLabel: "Auto servisi",
    industryValue: "servisi-i-radionice",
    photo: "/niche/auto-servisi.jpg",
    photoAlt: "Automehaničar u radionici",
    eyebrow: "Za auto servise i radionice",
    heroTitle: "Ruke su vam pod haubom. APLORY odgovara na poziv umesto vas.",
    heroLede:
      "Telefon zvoni dok ste ispod auta ili sa mušterijom. APLORY odmah odgovori, uzme podatke o vozilu i kvaru i zakaže termin — vi nastavljate posao koji ste već započeli.",
    metaTitle: "APLORY za auto servise i radionice — automatski odgovor mušterijama",
    metaDescription:
      "Propušten poziv dok ste pod haubom? APLORY odmah odgovara, uzima podatke o vozilu i kvaru i zakazuje termin, dok vi nastavljate posao.",
    pains: [
      {
        title: "Ruke su vam zauzete poslom",
        body: "Ne možete da ostavite alat da biste podigli telefon. Taj poziv ode kod konkurencije koja je stigla da se javi.",
      },
      {
        title: "Mušterija zove sa puta",
        body: "Auto se pokvario, mušterija zove prvi servis koji joj se javi. Ako ne odgovorite za minut, zvaće sledeći iz pretrage.",
      },
      {
        title: "Nema podataka o kvaru unapred",
        body: "Kad se javite tek pri dolasku mušterije, gubite vreme da saznate model, godište i kvar koji je mogao da čeka vas spreman.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Ovde servis, trenutno smo na terenu. Napišite šta vam treba i odgovaramo odmah." },
        { type: "out", text: "Ne radi mi klima u autu, duva mlako." },
        { type: "in", text: "Može. Koji je model i koja godina?" },
        { type: "out", text: "Golf 7, 2016. godište." },
        { type: "in", text: "Imamo termin danas u 16.30 ili sutra u 9. Šta vam odgovara?" },
        { type: "out", text: "Danas u 16.30." },
      ],
    },
  },
  {
    slug: "saloni",
    navLabel: "Saloni i spa",
    industryValue: "medical-spa-saloni",
    photo: "/niche/saloni.jpg",
    photoAlt: "Frizerka u salonu",
    eyebrow: "Za salone i medical spa",
    heroTitle: "Klijentkinja piše dok radite na nekom drugom. APLORY odgovori umesto vas.",
    heroLede:
      "Ne stižete da pogledate telefon dok traje tretman. APLORY odmah odgovara na Instagram, WhatsApp i poziv, zakazuje termin i podseti klijentkinju dan pre dolaska.",
    metaTitle: "APLORY za salone i medical spa — automatski odgovor klijentkinjama",
    metaDescription:
      "Propušten poziv ili Instagram poruka dok radite na klijentkinji? APLORY odmah odgovara, zakazuje termin i šalje podsetnik pre dolaska.",
    pains: [
      {
        title: "Ne stižete do telefona tokom tretmana",
        body: "Ruke su vam zauzete, a poruka na Instagramu čeka. Dok je pročitate, klijentkinja je već zakazala kod nekog drugog.",
      },
      {
        title: "Upiti stižu uveče i vikendom",
        body: "Ljudi listaju Instagram i traže termin kad njima odgovara, ne kad je salon otvoren.",
      },
      {
        title: "Prazan termin bez najave",
        body: "Otkazivanje u zadnji čas znači prazan stolac za taj sat. Podsetnik dan ranije to najčešće spreči.",
      },
    ],
    demo: {
      missedLabel: "Poruka na Instagramu",
      missedNumber: "@vas_salon",
      messages: [
        { type: "in", text: "Zdravo! Trenutno radimo na klijentkinji, javljamo se odmah. Šta vas zanima?" },
        { type: "out", text: "Da li imate termin za farbanje ove nedelje?" },
        { type: "in", text: "Imamo. Da li ste ranije bile kod nas, radi lakšeg zakazivanja?" },
        { type: "out", text: "Nisam, prvi put dolazim." },
        { type: "in", text: "Sredа u 17h ili petak u 11h — šta vam više odgovara?" },
        { type: "out", text: "Sreda u 17h mi odgovara." },
      ],
    },
  },
  {
    slug: "ecommerce",
    navLabel: "Online prodavnice",
    industryValue: "ecommerce",
    photo: "/niche/ecommerce.jpg",
    photoAlt: "Vlasnica online prodavnice pakuje porudžbinu",
    eyebrow: "Za online prodavnice",
    heroTitle: "Kupac pita pre kupovine. APLORY odgovori pre nego što ode kod konkurencije.",
    heroLede:
      "Poruka na Instagramu ili sajtu koja ostane bez odgovora par sati je izgubljena porudžbina. APLORY odmah odgovara na pitanja o dostupnosti, veličini i dostavi.",
    metaTitle: "APLORY za online prodavnice — automatski odgovor kupcima",
    metaDescription:
      "Poruka na Instagramu ili sajtu bez odgovora je izgubljena porudžbina. APLORY odmah odgovara na pitanja o dostupnosti, veličini i dostavi, dok vi pakujete porudžbine.",
    pains: [
      {
        title: "Pitanje stiže dok pakujete porudžbine",
        body: "Instagram poruka čeka dok ste zauzeti pakovanjem i slanjem. Dok je pročitate, kupac je već pogledao drugu prodavnicu.",
      },
      {
        title: "Isto pitanje, iznova i iznova",
        body: "Da li imate ovo u mojoj veličini, koliko traje dostava — ista pitanja svaki dan, a odgovor uvek stiže sa zakašnjenjem.",
      },
      {
        title: "Porudžbina stiže van radnog vremena",
        body: "Kupci naručuju uveče i vikendom. Bez brzog odgovora na dodatno pitanje, korpa ostane napuštena.",
      },
    ],
    demo: {
      missedLabel: "Poruka sa sajta",
      missedNumber: "chat na sajtu",
      messages: [
        { type: "in", text: "Zdravo! Trenutno pakujemo porudžbine, javljamo se odmah. Kako možemo da pomognemo?" },
        { type: "out", text: "Da li imate crnu jaknu u veličini M?" },
        { type: "in", text: "Imamo, na stanju je. Da li vam treba i informacija o dostavi?" },
        { type: "out", text: "Da, koliko traje dostava do Novog Sada?" },
        { type: "in", text: "Obično 1-2 radna dana. Želite da vam pripremimo porudžbinu?" },
        { type: "out", text: "Da, naručujem." },
      ],
    },
  },
  {
    slug: "klimatizacija",
    navLabel: "Klima i grejanje",
    industryValue: "klima-i-grejanje",
    photo: "/niche/klimatizacija.jpg",
    photoAlt: "Serviser klima uređaja",
    eyebrow: "Za servise klima i grejanja",
    heroTitle: "Klima se pokvarila usred leta. APLORY odgovara dok ste vi na terenu.",
    heroLede:
      "Najviše poziva stiže baš kad ste na drugom terenu i ne možete da se javite. APLORY odmah odgovori, uzme adresu i model uređaja i zakaže izlazak.",
    metaTitle: "APLORY za servise klima uređaja i grejanja — automatski odgovor mušterijama",
    metaDescription:
      "Propušten poziv dok ste na terenu? APLORY odmah odgovara, uzima adresu i model uređaja i zakazuje izlazak servisera.",
    pains: [
      {
        title: "Najviše poziva kad ste najzauzetiji",
        body: "U sezoni vrućina ili hladnoća telefon zvoni non-stop, a vi ste već na terenu kod druge mušterije.",
      },
      {
        title: "Mušterija zove više servisera odjednom",
        body: "Kad se klima pokvari u avgustu, ljudi zovu prvog koji odgovori. Ko se prvi javi, taj dobija posao.",
      },
      {
        title: "Adresa i model se saznaju tek na licu mesta",
        body: "Bez unapred zabeleženih podataka, gubite vreme na terenu pitajući ono što je moglo biti zabeleženo pri prvom kontaktu.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Ovde servis klima uređaja, trenutno smo na terenu. Napišite šta vam treba i odgovaramo odmah." },
        { type: "out", text: "Ne radi mi klima u stanu, duva mlako. Može neko danas?" },
        { type: "in", text: "Može. Koji je model i koja adresa?" },
        { type: "out", text: "Gree, dvanaestica. Vojvode Mišića 14, Valjevo." },
        { type: "in", text: "Imamo termin danas u 16.30 ili sutra u 9. Šta vam odgovara?" },
        { type: "out", text: "Danas u 16.30." },
      ],
    },
  },
  {
    slug: "pvc-stolarija",
    navLabel: "PVC stolarija",
    industryValue: "pvc-stolarija",
    photo: "/niche/pvc-stolarija.jpg",
    photoAlt: "Monter PVC stolarije",
    eyebrow: "Za proizvođače i montere PVC stolarije",
    heroTitle: "Mušterija traži ponudu za prozore. APLORY je odmah usmeri ka pravom koraku.",
    heroLede:
      "Upit za mere i ponudu često stiže dok ste na montaži kod druge mušterije. APLORY odgovori odmah, uzme osnovne podatke i zakaže izlazak na merenje.",
    metaTitle: "APLORY za PVC stolariju — automatski odgovor na upit za ponudu",
    metaDescription:
      "Propušten poziv za ponudu dok ste na montaži? APLORY odmah odgovara, uzima osnovne podatke o objektu i zakazuje izlazak na merenje.",
    pains: [
      {
        title: "Poziv za ponudu stiže dok montirate",
        body: "Ruke su vam zauzete na terenu. Mušterija koja traži ponudu za prozore retko čeka — pozove sledećeg iz pretrage.",
      },
      {
        title: "Upit bez osnovnih podataka",
        body: "Propušten poziv ne kaže koliko prozora, kog objekta ili kada mušterija useljava. Vraćate poziv naslepo.",
      },
      {
        title: "Merenje se dogovara sporo",
        body: "Dok razmenite nekoliko poruka da zakažete izlazak na merenje, mušterija je već dobila ponudu od konkurencije.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Ovde PVC stolarija, trenutno smo na montaži. Napišite šta vam treba, odgovaramo odmah." },
        { type: "out", text: "Treba mi ponuda za 5 prozora za kuću u izgradnji." },
        { type: "in", text: "Može. Da li imate okvirne dimenzije ili bi neko trebalo da izađe na merenje?" },
        { type: "out", text: "Trebalo bi neko da izađe na merenje." },
        { type: "in", text: "Možemo izaći u četvrtak ili petak pre podne. Šta vam odgovara?" },
        { type: "out", text: "Četvrtak pre podne." },
      ],
    },
  },
  {
    slug: "majstori",
    navLabel: "Majstori",
    industryValue: "majstori",
    photo: "/niche/majstori.jpg",
    photoAlt: "Majstor sa alatom",
    eyebrow: "Za majstore i kućne servise",
    heroTitle: "Dok ste na jednom poslu, sledeći vas zove. APLORY odgovori umesto vas.",
    heroLede:
      "Bušilica u ruci ne dozvoljava da podignete telefon. APLORY odmah odgovori na poziv i poruku, uzme adresu i opis kvara i dogovori termin.",
    metaTitle: "APLORY za majstore i kućne servise — automatski odgovor mušterijama",
    metaDescription:
      "Propušten poziv dok ste na poslu kod druge mušterije? APLORY odmah odgovara, uzima adresu i opis kvara i dogovara termin dolaska.",
    pains: [
      {
        title: "Alat u rukama, telefon bez odgovora",
        body: "Dok završite trenutni posao, propušteni poziv je već zaboravljen — i od strane mušterije, koja je pozvala sledećeg majstora.",
      },
      {
        title: "Hitni pozivi ne čekaju",
        body: "Pukla cev ili kvar na struji ne trpi odlaganje. Mušterija zove nekoliko majstora odjednom i ide sa onim ko prvi odgovori.",
      },
      {
        title: "Adresa se razjašnjava usput",
        body: "Bez zabeleženih podataka pri prvom kontaktu, dogovor oko adrese i termina odugovlači se porukama tokom celog dana.",
      },
    ],
    demo: {
      missedLabel: "Propušten poziv",
      missedNumber: "+381 6x xxx xxx",
      messages: [
        { type: "in", text: "Zdravo. Trenutno sam na terenu. Napišite šta vam treba, javljam se odmah." },
        { type: "out", text: "Pukla mi cev ispod sudopere, curi voda." },
        { type: "in", text: "Razumem, hitno je. Koja je adresa?" },
        { type: "out", text: "Bulevar oslobođenja 22, Beograd." },
        { type: "in", text: "Mogu da budem kod vas za sat vremena. Odgovara?" },
        { type: "out", text: "Odgovara, hvala." },
      ],
    },
  },
];

export default niches;

export const nicheBySlug = Object.fromEntries(niches.map((n) => [n.slug, n]));
