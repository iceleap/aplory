/**
 * Per-niche landing page content — one entry per profession, each rendered by
 * src/pages/NicheLanding.jsx through its own Vite entry (see vite.config.js).
 *
 * `industryValue` must match a slug in ContactForm.jsx's INDUSTRIES array
 * (and its label in src/i18n/sr.js under contact.form.fields.industry.options)
 * so the contact form can be pre-selected to the right step when a visitor
 * arrives from that niche's page.
 *
 * Photos live in /public/niche/<slug>.webp — free-license stock (Pexels
 * License: free for commercial use, no attribution required), re-exported
 * from the original JPEGs at the hero column's 2x display size (see
 * NicheHero.jsx's 420px-wide, 3:4 column) to cut oversized-image weight.
 *
 * Required per niche: slug, navLabel, industryValue, photo, photoAlt, eyebrow,
 * heroTitle, heroLede, metaTitle, metaDescription, pains (3), demo (6 messages,
 * alternating in/out — HowItWorks destructures them positionally).
 *
 * Optional, and the whole point of these pages not reading as the home page
 * with a photo swapped in — each drives one section that only exists here:
 *   painTitle / howTitle / faqTitle — override the shared sections' headings
 *   capabilities → niche/NicheCapabilities.jsx (what APLORY does for *them*,
 *                  not the home page's generic service list)
 *   faq          → Faq.jsx + the FAQPage JSON-LD in <head>, so this also has
 *                  to be regenerated with scripts/gen-niche-pages.mjs
 * Missing ones are skipped, not rendered empty. See stomatolozi for the shape.
 */

const niches = [
  {
    slug: "stomatolozi",
    navLabel: "Stomatolozi",
    industryValue: "stomatoloske-ordinacije",
    photo: "/niche/stomatolozi.webp",
    photoAlt: "Stomatološkinja u ordinaciji",
    eyebrow: "Za stomatološke ordinacije",
    heroTitle: "Kad pacijent zove, APLORY zakazuje termin. Dok ste u ordinaciji.",
    heroLede:
      "Recepcija ne može da se javi dok traje intervencija. APLORY odgovara na propušten poziv, WhatsApp i Instagram poruku odmah, zakazuje termin i podseti pacijenta pre dolaska.",
    metaTitle: "APLORY za stomatološke ordinacije — automatski odgovor pacijentima",
    metaDescription:
      "Propušten poziv dok ste sa pacijentom u stolici? APLORY odmah odgovara porukom na propušten poziv, WhatsApp i Instagram poruku, zakazuje termin i šalje podsetnik pre dolaska.",
    pains: [
      {
        title: "Telefon zvoni dok ste u ordinaciji",
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
    /* --- Sekcije specifične za branšu ---------------------------------------
       Sve ispod je opciono: NicheLanding preskače sekciju koje nema, pa niša
       bez ove copy ostaje kraća stranica umesto prazne. Stomatolozi su pilot
       — ostale niše dobijaju isti raspored polja kad se copy napiše. */

    painTitle:
      "Pacijent sa zuboboljom ne ostavlja poruku. Zove sledeću ordinaciju sa Google mape.",

    howTitle: "Kako izgleda propušten poziv pacijenta koji traži termin.",

    steps: [
      {
        n: "01",
        title: "Pacijent vas kontaktira",
        body: "Pozivom, WhatsAppom, Instagramom ili porukom sa sajta — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što pacijent proba sledeću ordinaciju.",
      },
      {
        n: "03",
        title: "Termin zakazan",
        body: "Nastavljate pregled kad stignete, sa kontekstom već tu. Broj i nalozi ostaju isti — ništa se ne menja na vašoj strani.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poziv na koji niko ne stigne da se javi.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "5",
          label: "propuštenih poziva nedeljno",
          note: "Pretpostavka za manju ordinaciju sa jednim stomatologom i jednom asistentkinjom na recepciji.",
        },
        {
          value: "2",
          label: "pacijenta koji pozovu sledeću ordinaciju",
          note: "Konzervativno: troje ostavi poruku ili pozove ponovo, dvoje ode kod prve ordinacije koja se javi.",
        },
        {
          value: "~28.000 RSD",
          label: "mesečno u pregledima koji nisu urađeni",
          note: "2 pacijenta nedeljno × oko 3.500 RSD prosečnog prvog pregleda i osnovne intervencije, puta 4 nedelje.",
        },
      ],
      conclusion:
        "To je cifra koja lako pokrije trošak asistentkinje na pola radnog vremena — a nastaje od poziva koje niste ni čuli. Kod većih intervencija, kao što je ugradnja implanta ili protetika, iznos raste brže nego broj propuštenih poziva.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih pacijenata.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      title: "Šta APLORY radi za ordinaciju.",
      items: [
        {
          name: "Zakazuje termin dok ste u ordinaciji",
          line: "Pacijent ostavi razlog dolaska i dobije dva ponuđena termina. Vi vidite gotov dogovor kad skinete rukavice.",
        },
        {
          name: "Pita šta boli, pre nego što dođe",
          line: "Koliko dugo traje bol i da li je pacijent već bio kod vas — termin stiže sa kontekstom.",
        },
        {
          name: "Podsetnik dan ranije, i poziv na kontrolu",
          line: "Manje praznih termina, i popunjavanje rasporeda iz kartoteke koju već imate.",
        },
        {
          name: "Radi uveče, vikendom i na Google recenzijama",
          line: "Zubobolja ne poštuje radno vreme, a zamolba za recenziju stiže dan posle termina.",
        },
      ],
    },
    faqTitle: "Pitanja koja stomatolozi postave pre nego što probaju.",
    faq: [
      {
        q: "Da li pacijent zna da ne piše sa nama lično?",
        a: "Da. Poruka jasno kaže da je ordinacija trenutno zauzeta i da odgovara asistent. Cilj je da pacijent dobije termin, ne da bude prevaren.",
      },
      {
        q: "Da li APLORY daje savete o lečenju?",
        a: "Ne. Ne postavlja dijagnozu i ne preporučuje terapiju. Prikuplja šta boli, koliko dugo i da li je hitno, i na osnovu toga nudi termin.",
      },
      {
        q: "Kako termin završi u našem rasporedu?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen. Ako vodite raspored u sopstvenom softveru, dogovaramo način upisa na početku.",
      },
      {
        q: "Koji podaci o pacijentu se prikupljaju?",
        a: "Ime, kontakt i razlog dolaska — onoliko koliko treba da bi se zakazao termin. Kartoni, snimci i medicinska dokumentacija ne prolaze kroz APLORY.",
      },
    ],
  },
  {
    slug: "veterinari",
    navLabel: "Veterinari",
    industryValue: "veterinarske-klinike",
    photo: "/niche/veterinari.webp",
    photoAlt: "Veterinar sa ljubimcem u klinici",
    eyebrow: "Za veterinarske klinike",
    heroTitle: "Vlasnik ljubimca piše u paničnom trenutku. APLORY mu odmah odgovori porukom.",
    heroLede:
      "Poziv usred pregleda, poruka na WhatsAppu u pola noći — APLORY hvata svaki upit odmah, dok vi i tim ostajete uz pacijenta koji je već na stolu.",
    metaTitle: "APLORY za veterinarske klinike — automatski odgovor vlasnicima ljubimaca",
    metaDescription:
      "Propušten poziv ili Instagram poruka dobija odgovor porukom za par sekundi. APLORY zakazuje preglede i podseća na vakcinaciju, dok se tim posvećuje pacijentu koji je već tu.",
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

    painTitle:
      "Vlasnik ljubimca ne ostavlja poruku u panici. Zove sledeću kliniku sa Google mape.",

    howTitle: "Kako izgleda propušten poziv vlasnika čiji je ljubimac bolestan.",

    steps: [
      {
        n: "01",
        title: "Vlasnik ljubimca vas kontaktira",
        body: "Pozivom, WhatsAppom, Instagramom ili porukom sa sajta — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što vlasnik proba sledeću kliniku.",
      },
      {
        n: "03",
        title: "Termin zakazan",
        body: "Nastavljate pregled kad stignete, sa kontekstom već tu. Broj i nalozi ostaju isti — ništa se ne menja na vašoj strani.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poziv na koji niko ne stigne da se javi.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "4",
          label: "propuštena poziva nedeljno",
          note: "Pretpostavka za manju kliniku sa jednim doktorom i jednom osobom na recepciji.",
        },
        {
          value: "2",
          label: "vlasnika koji ne pozovu ponovo",
          note: "Konzervativno: dvoje se vrate ili napišu, dvoje odu kod prve klinike koja se javi.",
        },
        {
          value: "~28.000 RSD",
          label: "mesečno u pregledima koji nisu urađeni",
          note: "2 vlasnika nedeljno × oko 3.500 RSD prosečnog prvog pregleda i terapije, puta 4 nedelje.",
        },
      ],
      conclusion:
        "To je cifra koja lako pokrije pola plate na recepciji — a nastaje od poziva koje niste ni čuli. Ako radite i hirurgiju ili hospitalizaciju, iznos raste brže nego broj propuštenih poziva.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih pacijenata.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za kliniku.",
      items: [
        {
          name: "Zakazuje pregled dok ste sa pacijentom",
          line: "Vlasnik dobije odgovor za par sekundi, opiše šta se dešava sa ljubimcem i dobije dva ponuđena termina. Vi vidite gotov dogovor kad završite pregled, ne spisak propuštenih poziva.",
        },
        {
          name: "Prepoznaje hitan slučaj",
          line: "Povraćanje, povreda, teško disanje — takvi opisi idu u prvi slobodan termin uz odmah obaveštenje vama, umesto da čekaju red kao obično zakazivanje.",
        },
        {
          name: "Podsetnik za reviakcinaciju i kontrolu",
          line: "Ljubimac vakcinisan pre godinu dana dobije poruku da je vreme za ponovnu turu. To je popunjavanje termina iz kartoteke koju već imate, bez ijednog novog marketinškog dinara.",
        },
        {
          name: "Pita vrstu, rasu i simptome pre dolaska",
          line: "Termin stiže sa kontekstom — pas ili mačka, koliko dugo traje problem, da li je ranije bio pacijent. Znate treba li mu kratak pregled ili duži termin, pre nego što uđe u ordinaciju.",
        },
        {
          name: "Odgovara na pitanja o ceni kastracije i čipovanja",
          line: "„Koliko košta kastracija“ i „da li radite čipovanje“ dobijaju vaš odgovor, onako kako ste ga zadali — bez da neko na recepciji prekida rad da bi ga otkucao po deseti put.",
        },
        {
          name: "Radi uveče i vikendom",
          line: "Ljubimci se ne razbole prema radnom vremenu. Ko piše u nedelju uveče dobija odgovor i, ako je hitno, uputstvo šta da radi do jutra.",
        },
        {
          name: "Traži Google recenziju posle posete",
          line: "Zamolba stiže dan posle pregleda, dok je vlasnik olakšan i zadovoljan. Recenzije su ono što odlučuje koju kliniku će sledeći uplašeni vlasnik pozvati prvu.",
        },
      ],
    },
    faqTitle: "Pitanja koja veterinari postave pre nego što probaju.",
    faq: [
      {
        q: "Da li vlasnik zna da ne piše sa nama lično?",
        a: "Da. Poruka jasno kaže da je klinika trenutno zauzeta i da odgovara asistent. Cilj je da vlasnik dobije termin ili uputstvo, ne da bude prevaren.",
      },
      {
        q: "Da li APLORY postavlja dijagnozu ili savetuje terapiju?",
        a: "Ne. Ne postavlja dijagnozu i ne preporučuje lečenje. Prikuplja šta se dešava, koliko dugo i koliko je hitno, i na osnovu toga nudi termin — sve ostalo je pregled kod vas.",
      },
      {
        q: "Šta ako je u pitanju hitan slučaj usred noći?",
        a: "Hitni slučajevi se prepoznaju po opisu (povraćanje krvi, teško disanje, povreda) i poruka daje osnovno uputstvo i informaciju da li klinika ima dežurstvo ili gde je najbliža hitna veterinarska služba.",
      },
      {
        q: "Kako termin završi u našem rasporedu?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen. Ako vodite raspored u sopstvenom softveru, dogovaramo način upisa na početku — to je deo podešavanja, ne nešto što se rešava kasnije.",
      },
      {
        q: "Šta sa pitanjima o ceni kastracije i čipovanja?",
        a: "Odgovara onako kako vi zadate — rasponom, opsegom ili pozivom na konsultaciju. Ništa se ne izmišlja: ako cena zavisi od pregleda ili težine ljubimca, poruka to kaže i nudi termin.",
      },
      {
        q: "Koji podaci o ljubimcu i vlasniku se prikupljaju?",
        a: "Ime vlasnika, kontakt, vrsta i ime ljubimca i razlog dolaska — onoliko koliko treba da bi se zakazao termin. Medicinski karton i nalazi ne prolaze kroz APLORY.",
      },
    ],
  },
  {
    slug: "advokati",
    navLabel: "Advokati",
    industryValue: "advokatske-kancelarije",
    photo: "/niche/advokati.webp",
    photoAlt: "Advokatkinja u kancelariji",
    eyebrow: "Za advokatske kancelarije",
    heroTitle: "Klijent zove usred ročišta. APLORY odgovara porukom umesto vas.",
    heroLede:
      "Na sudu ili sa strankom ne možete da se javite. APLORY prihvata upit sa poziva, sajta ili poruke, zabeleži o čemu se radi i javi vam se čim budete slobodni.",
    metaTitle: "APLORY za advokatske kancelarije — automatski odgovor na upit klijenta",
    metaDescription:
      "Propušten poziv dok ste na ročištu ili sa strankom? APLORY odmah odgovara porukom na upit, beleži o čemu se radi i prosleđuje vam kontakt čim ste slobodni.",
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

    painTitle: "Klijent sa hitnim pravnim problemom ne ostavlja poruku. Zove sledećeg advokata sa liste.",

    howTitle: "Kako izgleda propušten poziv klijenta koji traži pravnu pomoć.",

    steps: [
      {
        n: "01",
        title: "Klijent vas kontaktira",
        body: "Pozivom, porukom sa sajta ili WhatsAppom — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Upit je zabeležen pre nego što klijent pozove sledeću kancelariju.",
      },
      {
        n: "03",
        title: "Konsultacija zakazana",
        body: "Javljate se čim ste slobodni, sa opisom slučaja već pri ruci. Broj i nalozi ostaju isti — ništa se ne menja na vašoj strani.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poziv na koji niko ne stigne da se javi.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "6",
          label: "propuštenih poziva nedeljno",
          note: "Pretpostavka za manju kancelariju, jedan advokat i povremeno ročište ili sastanak van kancelarije.",
        },
        {
          value: "2",
          label: "klijenta koji pozovu sledećeg",
          note: "Konzervativno: četvoro ostavi poruku ili pozove ponovo, dvoje ode kod prve kancelarije koja odgovori.",
        },
        {
          value: "1 predmet",
          label: "mesečno koji ode konkurenciji",
          note: "2 propuštena upita nedeljno je dovoljno da bar jedan mesečno bude predmet koji ste realno mogli da vodite.",
        },
      ],
      conclusion:
        "Jedan izgubljen predmet mesečno je često veći iznos od svega što biste uštedeli izbegavanjem ovakvog rešenja. A nastaje od poziva koje niste ni čuli, ne od nedostatka klijenata.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih klijenata.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za kancelariju.",
      items: [
        {
          name: "Prihvata upit dok ste na ročištu",
          line: "Klijent ukratko opiše o čemu se radi i dobije poruku da se javljate čim budete slobodni. Vi izlazite sa suda sa spiskom upita, ne sa spiskom propuštenih poziva bez konteksta.",
        },
        {
          name: "Beleži o čemu se radi pre nego što vi pozovete nazad",
          line: "Radni spor, nasledstvo, ugovor, krivična prijava — osnovni opis stiže unapred. Zovete klijenta pripremljeni, ne pitate „u vezi čega ste zvali“.",
        },
        {
          name: "Prepoznaje hitnost",
          line: "Rok koji ističe za par dana ili pritvor nisu isto što i opšta konsultacija. Poruka to prepoznaje po opisu i signalizira vam prioritet.",
        },
        {
          name: "Zakazuje prvu konsultaciju",
          line: "Kad klijent zna šta mu treba, APLORY nudi termin iz vašeg slobodnog vremena — bez razmene desetak poruka da se dogovori kad.",
        },
        {
          name: "Odgovara na pitanja o načinu naplate",
          line: "„Kolika je cena konsultacije“ i „da li radite po tarifi ili paušalno“ dobijaju vaš odgovor, zadat unapred — bez da neko prekida pripremu za ročište da bi ga otkucao po deseti put.",
        },
        {
          name: "Radi uveče i vikendom",
          line: "Pravni problem ne poštuje radno vreme kancelarije. Ko piše u nedelju uveče dobija odgovor i termin za ponedeljak, umesto da do jutra nađe drugu kancelariju.",
        },
        {
          name: "Traži Google recenziju posle završenog predmeta",
          line: "Zamolba stiže kad je klijent najzadovoljniji. Recenzije su ono što odlučuje koju kancelariju će sledeći sa hitnim problemom pozvati prvu.",
        },
      ],
    },
    faqTitle: "Pitanja koja advokati postave pre nego što probaju.",
    faq: [
      {
        q: "Da li klijent zna da ne piše sa vama lično?",
        a: "Da. Poruka jasno kaže da je kancelarija trenutno zauzeta i da odgovara asistent. Cilj je da klijent ostavi osnovni opis i dobije termin, ne da bude prevaren.",
      },
      {
        q: "Da li APLORY daje pravne savete?",
        a: "Ne. Ne tumači propise i ne daje mišljenje o predmetu. Prikuplja o čemu se radi i koliko je hitno, i na osnovu toga nudi konsultaciju — pravni savet ostaje isključivo na vama.",
      },
      {
        q: "Šta ako je klijent u hitnoj situaciji, npr. pritvoru ili roku koji ističe?",
        a: "Hitnost se prepoznaje po opisu (rok, pritvor, prinudno izvršenje) i takav upit dobija prioritetnu oznaku uz odmah obaveštenje vama, umesto da čeka red kao opšta konsultacija.",
      },
      {
        q: "Da li se čuva poverljivost onoga što klijent napiše?",
        a: "Prikuplja se samo osnovni opis potreban da zakažete konsultaciju — ne detalji predmeta ili dokumentacija. Sadržaj same konsultacije ostaje razgovor između vas i klijenta.",
      },
      {
        q: "Šta sa pitanjima o ceni konsultacije ili zastupanja?",
        a: "Odgovara onako kako vi zadate — fiksnom cenom, rasponom ili pozivom na konsultaciju za tačan iznos. Ništa se ne izmišlja: ako cena zavisi od predmeta, poruka to kaže.",
      },
      {
        q: "Kako termin završi u mom kalendaru?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen. Ako vodite kalendar u sopstvenom softveru, dogovaramo način upisa na početku, kao deo podešavanja.",
      },
    ],
  },
  {
    slug: "auto-servisi",
    navLabel: "Auto servisi",
    industryValue: "servisi-i-radionice",
    photo: "/niche/auto-servisi.webp",
    photoAlt: "Automehaničar u radionici",
    eyebrow: "Za auto servise i radionice",
    heroTitle: "Ruke su vam pod haubom. APLORY odgovara porukom umesto vas.",
    heroLede:
      "Telefon zvoni dok ste ispod auta ili sa mušterijom. APLORY odmah odgovori, uzme podatke o vozilu i kvaru i zakaže termin — vi nastavljate posao koji ste već započeli.",
    metaTitle: "APLORY za auto servise i radionice — automatski odgovor mušterijama",
    metaDescription:
      "Propušten poziv dok ste pod haubom? APLORY odmah odgovara porukom, uzima podatke o vozilu i kvaru i zakazuje termin, dok vi nastavljate posao.",
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

    painTitle: "Mušterija sa pokvarenim autom ne čeka da joj se javite. Zove sledeći servis iz pretrage.",

    howTitle: "Kako izgleda propušten poziv mušterije koja stoji pored auta na putu.",

    steps: [
      {
        n: "01",
        title: "Mušterija vas kontaktira",
        body: "Pozivom, WhatsAppom ili porukom sa sajta — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što mušterija proba sledeći servis.",
      },
      {
        n: "03",
        title: "Termin zakazan",
        body: "Nastavljate posao kad stignete, sa modelom i kvarom već zabeleženim. Broj i nalozi ostaju isti.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poziv na koji niko ne stigne da se javi.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "8",
          label: "propuštenih poziva nedeljno",
          note: "Pretpostavka za manji servis, jedan ili dva mehaničara, u sezoni redovnih pregleda i popravki.",
        },
        {
          value: "3",
          label: "mušterije koje pozovu sledeći servis",
          note: "Konzervativno: pet ostavi poruku ili pozove ponovo, troje ode kod prvog servisa koji se javi.",
        },
        {
          value: "~60.000 RSD",
          label: "mesečno u popravkama koje nisu urađene",
          note: "3 mušterije nedeljno × oko 5.000 RSD prosečne intervencije, računajući manje popravke i servise.",
        },
      ],
      conclusion:
        "To je red veličine jednog punog radnog dana mesečno, izgubljen zato što telefon nije stigao da se javi, ne zato što nije bilo posla. Kod većih popravki cifra raste brže nego broj propuštenih poziva.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih mušterija.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za servis.",
      items: [
        {
          name: "Uzima model, godište i kvar dok ste pod haubom",
          line: "Mušterija napiše šta se dešava sa autom, vi vidite gotov opis kad podignete glavu — ne prazan propušten poziv koji morate da vraćate naslepo.",
        },
        {
          name: "Zakazuje termin bez vašeg učešća",
          line: "Kad su podaci o kvaru jasni, APLORY ponudi dva slobodna termina iz vašeg rasporeda. Mušterija bira, vi dobijate potvrđen dolazak.",
        },
        {
          name: "Prepoznaje hitan slučaj na putu",
          line: "Pokvaren auto na putu i redovan servis nisu isto. Opis kao „stao sam na auto-putu“ dobija prioritetnu poruku, umesto da čeka red kao zakazivanje.",
        },
        {
          name: "Podsetnik za redovan servis i tehnički",
          line: "Mušterija od pre šest meseci dobije poruku da je vreme za servis ili da tehnički ističe. To je popunjavanje termina iz baze koju već imate.",
        },
        {
          name: "Odgovara na pitanja o ceni i dostupnosti delova",
          line: "„Koliko košta zamena kvačila“ i „imate li deo na stanju“ dobijaju vaš odgovor, zadat unapred — bez da mehaničar ispod auta prekida posao da bi ga otkucao po deseti put.",
        },
        {
          name: "Radi posle radnog vremena",
          line: "Kvar na putu ne bira radno vreme servisa. Ko piše uveče dobija odgovor i termin za sutra, umesto da do jutra nađe drugi servis.",
        },
        {
          name: "Traži Google recenziju posle preuzimanja auta",
          line: "Zamolba stiže istog dana kad mušterija preuzme vozilo, dok je zadovoljna. Recenzije su ono što odlučuje koji servis će sledeći sa kvarom pozvati prvi.",
        },
      ],
    },
    faqTitle: "Pitanja koja vlasnici servisa postave pre nego što probaju.",
    faq: [
      {
        q: "Da li mušterija zna da ne piše sa nekim iz servisa lično?",
        a: "Da. Poruka jasno kaže da je servis trenutno zauzet i da odgovara asistent. Cilj je da mušterija dobije termin, ne da bude prevarena.",
      },
      {
        q: "Da li APLORY procenjuje kvar ili daje dijagnozu?",
        a: "Ne. Ne postavlja dijagnozu kvara. Prikuplja model, godište i opis problema koji mušterija navede, i na osnovu toga nudi termin — pravu dijagnozu daje mehaničar na pregledu.",
      },
      {
        q: "Šta ako je mušterija stala na putu i vozilo je neispravno za vožnju?",
        a: "Takav opis (auto-put, dim, curenje) dobija prioritetnu poruku sa uputstvom i odmah obaveštenje vama, umesto da čeka red kao redovno zakazivanje. Za šlep službu i dalje važi da mušterija sama zove — APLORY ne organizuje prevoz vozila.",
      },
      {
        q: "Kako termin završi u našem rasporedu?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen, sa modelom i opisom kvara. Ako vodite raspored u sopstvenom softveru, dogovaramo način upisa na početku.",
      },
      {
        q: "Šta sa pitanjima o ceni popravke?",
        a: "Odgovara onako kako vi zadate — rasponom ili pozivom na pregled pre konačne cene. Ništa se ne izmišlja: ako cena zavisi od pregleda, poruka to kaže i nudi termin.",
      },
      {
        q: "Koji podaci o mušteriji i vozilu se prikupljaju?",
        a: "Ime, kontakt, model i godište vozila i opis kvara — onoliko koliko treba da bi se zakazao termin. Registarski dokumenti i podaci o vlasništvu ne prolaze kroz APLORY.",
      },
    ],
  },
  {
    slug: "saloni",
    navLabel: "Saloni i spa",
    industryValue: "medical-spa-saloni",
    photo: "/niche/saloni.webp",
    photoAlt: "Frizerka u salonu",
    eyebrow: "Za salone i medical spa",
    heroTitle: "Klijentkinja piše dok radite na nekom drugom. APLORY odgovara porukom umesto vas.",
    heroLede:
      "Ne stižete da pogledate telefon dok traje tretman. APLORY odmah odgovara na Instagram, WhatsApp i poziv, zakazuje termin i podseti klijentkinju dan pre dolaska.",
    metaTitle: "APLORY za salone i medical spa — automatski odgovor klijentkinjama",
    metaDescription:
      "Propušten poziv ili Instagram poruka dok radite na klijentkinji? APLORY odmah odgovara porukom, zakazuje termin i šalje podsetnik pre dolaska.",
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
      icon: "instagram",
      missedLabel: "Poruka na Instagramu",
      missedNumber: "@vas_salon",
      messages: [
        { type: "out", text: "Ćao! Imate li termin za farbanje ove nedelje?" },
        { type: "in", text: "Zdravo! Imamo. Da li ste ranije bile kod nas, radi lakšeg zakazivanja?" },
        { type: "out", text: "Nisam, prvi put dolazim." },
        { type: "in", text: "Nema problema. Sreda u 17h ili petak u 11h — šta vam više odgovara?" },
        { type: "out", text: "Sreda u 17h mi odgovara." },
        { type: "in", text: "Super, zakazano za sredu u 17h! Poslaćemo vam podsetnik dan ranije." },
      ],
    },

    painTitle: "Klijentkinja koja pita za termin ne čeka. Zakaže kod prvog salona koji odgovori na Instagramu.",

    howTitle: "Kako izgleda propuštena Instagram poruka klijentkinje koja traži termin.",

    steps: [
      {
        n: "01",
        title: "Klijentkinja vas kontaktira",
        body: "Instagram porukom, WhatsAppom ili pozivom — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što klijentkinja zakaže kod nekog drugog.",
      },
      {
        n: "03",
        title: "Termin zakazan",
        body: "Nastavljate rad kad stignete, sa terminom već potvrđenim. Nalog i broj ostaju vaši.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poruka na koju niko ne stigne da odgovori.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "10",
          label: "propuštenih upita nedeljno",
          note: "Pretpostavka za manji salon sa dve-tri stolice, računajući Instagram, WhatsApp i pozive.",
        },
        {
          value: "4",
          label: "klijentkinje koje zakažu drugde",
          note: "Konzervativno: šest ostavi poruku ili pozove ponovo, četiri odu kod prvog salona koji odgovori.",
        },
        {
          value: "~14.000 RSD",
          label: "nedeljno u terminima koji nisu zakazani",
          note: "4 klijentkinje nedeljno × oko 3.500 RSD prosečnog termina (šišanje, farbanje ili tretman lica).",
        },
      ],
      conclusion:
        "To je skoro pun radni dan nedeljno u zakazanim terminima koji jednostavno nisu stigli do vas. Kod medical spa tretmana sa višim cenama, gubitak raste brže nego broj propuštenih poruka.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih klijentkinja.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za salon.",
      items: [
        {
          name: "Odgovara na Instagram i WhatsApp dok radite",
          line: "Klijentkinja dobije odgovor za par sekundi dok vi bojite ili šišate. Vi vidite gotov dogovor kad završite klijentkinju, ne gomilu nepročitanih poruka.",
        },
        {
          name: "Zakazuje termin sama",
          line: "Kad klijentkinja kaže šta joj treba, APLORY ponudi dva slobodna termina iz vašeg rasporeda. Ne morate da prekidate tretman da biste otvorili kalendar.",
        },
        {
          name: "Podsetnik dan pre dolaska",
          line: "Poruka 24 sata pre termina, sa mogućnošću da klijentkinja pomeri umesto da se jednostavno ne pojavi. Prazan stolac je izgubljen sat koji se ne nadoknađuje.",
        },
        {
          name: "Poziv za redovno održavanje",
          line: "Klijentkinja od pre šest nedelja dobije poruku da je vreme za novi termin. To je popunjavanje rasporeda iz baze koju već imate, bez ijednog novog marketinškog dinara.",
        },
        {
          name: "Odgovara na pitanja o ceni i trajanju tretmana",
          line: "„Koliko košta balayage“ i „koliko traje“ dobijaju vaš odgovor, zadat unapred — bez da neko za stolicom prekida rad da bi ga otkucao po deseti put.",
        },
        {
          name: "Radi uveče i vikendom",
          line: "Klijentkinje listaju Instagram i pišu kad njima odgovara. Ko piše u nedelju uveče dobija odgovor i termin za sledeću nedelju, umesto da zakaže kod konkurencije.",
        },
        {
          name: "Traži Google recenziju posle tretmana",
          line: "Zamolba stiže dan posle termina, dok je klijentkinja zadovoljna rezultatom. Recenzije su ono što odlučuje koji salon će sledeća klijentkinja probati prva.",
        },
      ],
    },
    faqTitle: "Pitanja koja vlasnice salona postave pre nego što probaju.",
    faq: [
      {
        q: "Da li klijentkinja zna da ne piše sa vama lično?",
        a: "Da. Poruka jasno kaže da trenutno radite na nekoj drugoj klijentkinji i da odgovara asistent. Cilj je da klijentkinja dobije termin, ne da bude prevarena.",
      },
      {
        q: "Da li APLORY savetuje koji tretman odgovara klijentkinji?",
        a: "Ne. Ne preporučuje tretmane niti procenjuje stanje kose ili kože. Prikuplja šta klijentkinja traži i na osnovu toga nudi termin — savet i procena ostaju na vama pri dolasku.",
      },
      {
        q: "Kako termin završi u našem rasporedu?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen. Sinhronizujemo se sa vašim kalendarom.",
      },
      {
        q: "Šta ako klijentkinja traži konkretnog frizera ili terapeuta?",
        a: "Ako navede ime, poruka to prosleđuje uz termin. Raspoređivanje po zaposlenima dogovaramo pri podešavanju, prema tome kako već vodite kalendar.",
      },
      {
        q: "Šta sa pitanjima o ceni tretmana?",
        a: "Odgovara onako kako vi zadate — cenovnikom, rasponom ili pozivom na konsultaciju. Ništa se ne izmišlja: ako cena zavisi od dužine kose ili stanja kože, poruka to kaže.",
      },
      {
        q: "Koji podaci o klijentkinji se prikupljaju?",
        a: "Ime, kontakt i traženi tretman — onoliko koliko treba da bi se zakazao termin. Ništa se ne deli dalje niti koristi van dogovora oko termina.",
      },
    ],
  },
  {
    slug: "ecommerce",
    navLabel: "Online prodavnice",
    industryValue: "ecommerce",
    photo: "/niche/ecommerce.webp",
    photoAlt: "Vlasnica online prodavnice pakuje porudžbinu",
    eyebrow: "Za online prodavnice",
    heroTitle: "Kupac pita pre kupovine. APLORY odgovara porukom pre nego što ode kod konkurencije.",
    heroLede:
      "Poruka na Instagramu ili sajtu koja ostane bez odgovora par sati je izgubljena porudžbina. APLORY odmah odgovara na pitanja o dostupnosti, veličini i dostavi.",
    metaTitle: "APLORY za online prodavnice — automatski odgovor kupcima",
    metaDescription:
      "Poruka na Instagramu ili sajtu bez odgovora je izgubljena porudžbina. APLORY odmah odgovara porukom na pitanja o dostupnosti, veličini i dostavi, dok vi pakujete porudžbine.",
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

    painTitle: "Kupac koji pita pre kupovine ne čeka. Ode kod prve prodavnice koja odgovori.",

    howTitle: "Kako izgleda propuštena poruka kupca koji je spreman da naruči.",

    steps: [
      {
        n: "01",
        title: "Kupac vas kontaktira",
        body: "Chatom na sajtu, Instagram porukom ili WhatsAppom — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što kupac ode kod konkurencije.",
      },
      {
        n: "03",
        title: "Porudžbina kreće dalje",
        body: "Nastavljate pakovanje, sa odgovorom već poslatim. Nalog ostaje vaš — ništa se ne menja na vašoj strani.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poruka na koju niko ne stigne da odgovori.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "25",
          label: "upita nedeljno pre kupovine",
          note: "Pretpostavka za manju prodavnicu, računajući Instagram, chat na sajtu i poruke oko porudžbine.",
        },
        {
          value: "8",
          label: "kupaca koji odu bez odgovora",
          note: "Konzervativno: sedamnaest dobije odgovor na vreme, osmoro napusti korpu dok čeka.",
        },
        {
          value: "~40.000 RSD",
          label: "nedeljno u napuštenim korpama",
          note: "8 kupaca nedeljno × oko 5.000 RSD prosečne vrednosti porudžbine.",
        },
      ],
      conclusion:
        "To je iznos koji lako pokrije mesečni budžet za oglase — a nastaje od pitanja na koja niko nije stigao da odgovori na vreme, ne od nedostatka kupaca.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih porudžbina.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za prodavnicu.",
      items: [
        {
          name: "Odgovara na pitanja o dostupnosti i veličini",
          line: "„Imate li ovo u M“ dobija odgovor za par sekundi na osnovu stanja koje vi unesete, dok vi pakujete prethodnu porudžbinu.",
        },
        {
          name: "Objašnjava dostavu i rokove",
          line: "Koliko traje dostava do kog grada, cena i način plaćanja — pitanja koja se ponavljaju svaki dan dobijaju vaš unapred zadat odgovor, konzistentno i bez kašnjenja.",
        },
        {
          name: "Vodi kupca do porudžbine",
          line: "Kad kupac potvrdi šta želi, poruka prikuplja osnovne podatke za porudžbinu umesto da razgovor ostane na „hvala, razmisliću“.",
        },
        {
          name: "Radi uveče i vikendom",
          line: "Najviše upita stiže baš kad je prodavnica zatvorena. Ko piše u nedelju uveče dobija odgovor odmah, ne u ponedeljak kad je već kupio drugde.",
        },
        {
          name: "Odgovara isto svaki put",
          line: "Cena, veličine, materijal — odgovor je uvek onaj koji ste vi zadali, bez razlike od dana do dana ili od osobe do osobe koja odgovara na poruke.",
        },
        {
          name: "Traži Google recenziju posle isporuke",
          line: "Zamolba stiže kad je kupac dobio i otvorio paket, u trenutku kad je zadovoljstvo najveće. Recenzije su ono što ubeđuje sledećeg neodlučnog kupca.",
        },
      ],
    },
    faqTitle: "Pitanja koja vlasnici online prodavnica postave pre nego što probaju.",
    faq: [
      {
        q: "Da li kupac zna da ne piše sa vama lično?",
        a: "Da. Poruka jasno kaže da odgovara asistent dok vi pakujete porudžbine. Cilj je da kupac dobije tačan odgovor, ne da bude prevaren.",
      },
      {
        q: "Da li APLORY prima uplate ili obrađuje porudžbine?",
        a: "Ne. Ne obrađuje plaćanje niti menja stanje na skladištu. Prikuplja šta kupac traži i osnovne podatke za porudžbinu — samu obradu i naplatu i dalje vodite vi ili vaša platforma za prodaju.",
      },
      {
        q: "Kako APLORY zna šta je na stanju?",
        a: "Na osnovu informacija koje vi unesete i redovno ažurirate. Ne povezuje se automatski sa skladištem osim ako to posebno ne podesimo — bez tog podešavanja, odgovor je onoliko tačan koliko su tačni podaci koje ste zadali.",
      },
      {
        q: "Šta ako kupac traži nešto što nije na spisku odgovora?",
        a: "Poruka to prepoznaje i prosleđuje vam upit umesto da izmišlja odgovor. Vi se javljate lično za sve što izlazi iz onoga što ste unapred definisali.",
      },
      {
        q: "Da li radi i sa Instagram i WhatsApp porudžbinama, ne samo sa sajtom?",
        a: "Da. Ista logika pokriva chat na sajtu, Instagram i WhatsApp poruke — kupac dobija isti odgovor bez obzira odakle piše.",
      },
      {
        q: "Koji podaci o kupcu se prikupljaju?",
        a: "Ime, kontakt i šta kupac traži — onoliko koliko treba za porudžbinu ili odgovor na pitanje. Podaci o plaćanju ne prolaze kroz APLORY.",
      },
    ],
  },
  {
    slug: "klimatizacija",
    navLabel: "Klima i grejanje",
    industryValue: "klima-i-grejanje",
    photo: "/niche/klimatizacija.webp",
    photoAlt: "Serviser klima uređaja",
    eyebrow: "Za servise klima i grejanja",
    heroTitle: "Klima se pokvarila usred leta. APLORY odgovara porukom dok ste vi na terenu.",
    heroLede:
      "Najviše poziva stiže baš kad ste na drugom terenu i ne možete da se javite. APLORY odmah odgovori, uzme adresu i model uređaja i zakaže izlazak.",
    metaTitle: "APLORY za servise klima uređaja i grejanja — automatski odgovor mušterijama",
    metaDescription:
      "Propušten poziv dok ste na terenu? APLORY odmah odgovara porukom, uzima adresu i model uređaja i zakazuje izlazak servisera.",
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

    painTitle: "Mušterija sa pokvarenom klimom u avgustu ne čeka. Zove sledećeg servisera na spisku.",

    howTitle: "Kako izgleda propušten poziv mušterije koja zove nekoliko servisera odjednom.",

    steps: [
      {
        n: "01",
        title: "Mušterija vas kontaktira",
        body: "Pozivom, WhatsAppom ili porukom sa sajta — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što mušterija pozove sledećeg servisera.",
      },
      {
        n: "03",
        title: "Izlazak zakazan",
        body: "Nastavljate posao na terenu, sa adresom i modelom već zabeleženim. Broj i nalozi ostaju isti.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poziv na koji niko ne stigne da se javi.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "12",
          label: "propuštenih poziva nedeljno u sezoni",
          note: "Pretpostavka za manji servis, jedan ili dva servisera, u jeku letnje ili zimske sezone.",
        },
        {
          value: "5",
          label: "mušterija koje pozovu sledećeg servisera",
          note: "Konzervativno: sedmoro ostavi poruku ili pozove ponovo, petoro ode kod prvog servisera koji se javi.",
        },
        {
          value: "~75.000 RSD",
          label: "nedeljno u izlascima koji nisu zakazani",
          note: "5 mušterija nedeljno × oko 15.000 RSD prosečnog izlaska sa servisiranjem ili dopunom gasa.",
        },
      ],
      conclusion:
        "U sezoni je to iznos koji lako pokrije platu jednog servisera — a nastaje isključivo od poziva koje niste stigli da podignete, ne od nedostatka posla.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih mušterija.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za servis.",
      items: [
        {
          name: "Uzima adresu i model dok ste na terenu",
          line: "Mušterija napiše šta se dešava sa uređajem, vi vidite gotov opis kad završite prethodni izlazak — ne prazan propušten poziv koji morate da vraćate naslepo.",
        },
        {
          name: "Zakazuje izlazak bez vašeg učešća",
          line: "Kad su adresa i model poznati, APLORY ponudi dva slobodna termina iz vašeg rasporeda. Mušterija bira, vi dobijate potvrđen izlazak sa svim podacima.",
        },
        {
          name: "Radi u sezonskim vršnim opterećenjima",
          line: "Kad telefon zvoni non-stop u avgustu ili januaru, APLORY odgovara na svaki upit istog trenutka — niko ne čeka dok vi završite prethodni poziv.",
        },
        {
          name: "Podsetnik za sezonski servis",
          line: "Mušterija koja je prošle sezone servisirala klimu dobije poruku pre početka nove sezone. To je popunjavanje rasporeda iz baze koju već imate.",
        },
        {
          name: "Odgovara na pitanja o ceni dopune gasa i servisiranja",
          line: "„Koliko košta dopuna gasa“ i „koliko traje servisiranje“ dobijaju vaš odgovor, zadat unapred — bez da serviser na terenu prekida posao da bi ga otkucao po deseti put.",
        },
        {
          name: "Traži Google recenziju posle izlaska",
          line: "Zamolba stiže isti dan kad je uređaj popravljen, dok je mušterija zadovoljna. Recenzije su ono što odlučuje kog servisera će sledeća mušterija pozvati prvog.",
        },
      ],
    },
    faqTitle: "Pitanja koja vlasnici servisa klima i grejanja postave pre nego što probaju.",
    faq: [
      {
        q: "Da li mušterija zna da ne piše sa nekim iz servisa lično?",
        a: "Da. Poruka jasno kaže da je servis trenutno na terenu i da odgovara asistent. Cilj je da mušterija dobije termin, ne da bude prevarena.",
      },
      {
        q: "Da li APLORY procenjuje kvar unapred?",
        a: "Ne. Ne postavlja dijagnozu kvara. Prikuplja model uređaja, adresu i opis problema koji mušterija navede, a stvarnu dijagnozu daje serviser na licu mesta.",
      },
      {
        q: "Šta ako više mušterija piše istovremeno u sezoni?",
        a: "APLORY odgovara svima istog trenutka, bez reda čekanja — svaka mušterija dobije odgovor i ponuđen termin nezavisno od toga koliko ih istovremeno piše.",
      },
      {
        q: "Kako izlazak završi u našem rasporedu?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen sa adresom i modelom. Ako vodite raspored u sopstvenom softveru, dogovaramo način upisa na početku.",
      },
      {
        q: "Šta sa pitanjima o ceni servisiranja i dopune gasa?",
        a: "Odgovara onako kako vi zadate — cenovnikom, rasponom ili pozivom na pregled pre konačne cene. Ništa se ne izmišlja: ako cena zavisi od tipa uređaja, poruka to kaže.",
      },
      {
        q: "Koji podaci o mušteriji se prikupljaju?",
        a: "Ime, kontakt, adresa i model uređaja — onoliko koliko treba da bi se zakazao izlazak. Ništa se ne deli dalje niti koristi van dogovora oko termina.",
      },
    ],
  },
  {
    slug: "pvc-stolarija",
    navLabel: "PVC stolarija",
    industryValue: "pvc-stolarija",
    photo: "/niche/pvc-stolarija.webp",
    photoAlt: "Monter PVC stolarije",
    eyebrow: "Za proizvođače i montere PVC stolarije",
    heroTitle: "Mušterija traži ponudu za prozore. APLORY joj odmah odgovori porukom.",
    heroLede:
      "Upit za mere i ponudu često stiže dok ste na montaži kod druge mušterije. APLORY odgovori odmah, uzme osnovne podatke i zakaže izlazak na merenje.",
    metaTitle: "APLORY za PVC stolariju — automatski odgovor na upit za ponudu",
    metaDescription:
      "Propušten poziv za ponudu dok ste na montaži? APLORY odmah odgovara porukom, uzima osnovne podatke o objektu i zakazuje izlazak na merenje.",
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

    painTitle: "Mušterija koja traži ponudu za prozore ne čeka da razmenite deset poruka. Zove sledećeg iz pretrage.",

    howTitle: "Kako izgleda propušten poziv mušterije koja traži ponudu za prozore i vrata.",

    steps: [
      {
        n: "01",
        title: "Mušterija vas kontaktira",
        body: "Pozivom ili porukom sa sajta — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što mušterija zatraži ponudu od konkurencije.",
      },
      {
        n: "03",
        title: "Izlazak na merenje zakazan",
        body: "Nastavljate posao na terenu, sa osnovnim podacima već zabeleženim. Broj i nalozi ostaju isti.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta upit koji ostane bez brzog odgovora.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "6",
          label: "upita za ponudu nedeljno",
          note: "Pretpostavka za manju firmu koja proizvodi ili montira PVC stolariju, računajući pozive i poruke sa sajta.",
        },
        {
          value: "2",
          label: "mušterije koje dobiju ponudu od konkurencije",
          note: "Konzervativno: četvoro sačeka izlazak na merenje, dvoje uzme ponudu od prve firme koja im izađe u susret.",
        },
        {
          value: "1 posao",
          label: "mesečno koji ode konkurenciji",
          note: "2 propuštena upita nedeljno je dovoljno da bar jedan mesečno bude posao koji ste realno mogli da odradite.",
        },
      ],
      conclusion:
        "Jedan izgubljen posao mesečno kod prosečne porudžbine za kuću lako premaši cenu ovakvog rešenja za celu godinu — a nastaje od upita na koje niste stigli da odgovorite dovoljno brzo.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih poslova.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za firmu.",
      items: [
        {
          name: "Uzima osnovne podatke dok ste na montaži",
          line: "Broj prozora, tip objekta i rok useljenja stižu u poruci, vi vidite gotov opis kad završite trenutni posao — ne prazan propušten poziv koji morate da vraćate naslepo.",
        },
        {
          name: "Zakazuje izlazak na merenje",
          line: "Kad su osnovni podaci poznati, APLORY ponudi dva slobodna termina iz vašeg rasporeda za izlazak na merenje, bez razmene desetak poruka da se dogovori kad.",
        },
        {
          name: "Odgovara na pitanja o materijalu i profilu",
          line: "„Koja je razlika između tri i pet komora“ i „koliko traje isporuka“ dobijaju vaš odgovor, zadat unapred — bez da neko na terenu prekida montažu da bi ga otkucao po deseti put.",
        },
        {
          name: "Radi uveče i vikendom",
          line: "Ljudi traže ponude za renoviranje kad imaju vremena da o tome razmišljaju — uveče i vikendom. Ko piše tada dobija odgovor odmah, ne u ponedeljak kad je već dobio ponudu drugde.",
        },
        {
          name: "Traži Google recenziju posle montaže",
          line: "Zamolba stiže kad je mušterija upravo videla gotove prozore u svom domu, u trenutku najvećeg zadovoljstva. Recenzije su ono što ubeđuje sledećeg neodlučnog kupca.",
        },
      ],
    },
    faqTitle: "Pitanja koja vlasnici firmi za PVC stolariju postave pre nego što probaju.",
    faq: [
      {
        q: "Da li mušterija zna da ne piše sa nekim iz firme lično?",
        a: "Da. Poruka jasno kaže da je firma trenutno na terenu i da odgovara asistent. Cilj je da mušterija dobije zakazano merenje, ne da bude prevarena.",
      },
      {
        q: "Da li APLORY daje konačnu cenu ponude?",
        a: "Ne. Konačna cena zavisi od mera i izbora profila, pa se uvek daje posle merenja. APLORY prikuplja osnovne podatke i zakazuje izlazak — ponudu i dalje pravite vi.",
      },
      {
        q: "Kako izlazak na merenje završi u našem rasporedu?",
        a: "Termin se nudi iz vremena koje vi odredite kao slobodno i stiže vam potvrđen sa osnovnim podacima o objektu. Ako vodite raspored u sopstvenom sistemu, dogovaramo način upisa na početku.",
      },
      {
        q: "Šta ako mušterija ima okvirne mere i ne treba joj izlazak na merenje?",
        a: "Poruka to prepoznaje i prosleđuje vam okvirne dimenzije za orijentacionu ponudu, uz napomenu da je konačna cena moguća tek posle pravog merenja.",
      },
      {
        q: "Šta sa pitanjima o materijalu i garanciji?",
        a: "Odgovara onako kako vi zadate — informacijama o profilu, staklu i garantnim rokovima. Ništa se ne izmišlja: ako pitanje izlazi iz onoga što ste unapred definisali, prosleđuje se vama.",
      },
      {
        q: "Koji podaci o mušteriji se prikupljaju?",
        a: "Ime, kontakt, adresa objekta i osnovni opis (broj prozora, vrsta objekta, rok) — onoliko koliko treba da bi se zakazalo merenje.",
      },
    ],
  },
  {
    slug: "majstori",
    navLabel: "Majstori",
    industryValue: "majstori",
    photo: "/niche/majstori.webp",
    photoAlt: "Majstor sa alatom",
    eyebrow: "Za majstore i kućne servise",
    heroTitle: "Dok ste na jednom poslu, sledeći vas zove. APLORY odgovara porukom umesto vas.",
    heroLede:
      "Bušilica u ruci ne dozvoljava da podignete telefon. APLORY odmah odgovori na poziv i poruku, uzme adresu i opis kvara i dogovori termin.",
    metaTitle: "APLORY za majstore i kućne servise — automatski odgovor mušterijama",
    metaDescription:
      "Propušten poziv dok ste na poslu kod druge mušterije? APLORY odmah odgovara porukom, uzima adresu i opis kvara i dogovara termin dolaska.",
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

    painTitle: "Mušterija sa puklom cevi ne čeka da završite trenutni posao. Zove sledećeg majstora.",

    howTitle: "Kako izgleda propušten poziv mušterije koja ima hitan kvar u kući.",

    steps: [
      {
        n: "01",
        title: "Mušterija vas kontaktira",
        body: "Pozivom, WhatsAppom ili porukom — kanal koji već koristi.",
      },
      {
        n: "02",
        title: "APLORY odmah odgovori porukom",
        body: "Za par sekundi, ne za par sati. Razgovor počinje pre nego što mušterija pozove sledećeg majstora.",
      },
      {
        n: "03",
        title: "Dolazak dogovoren",
        body: "Nastavljate posao kod trenutne mušterije, sa adresom i kvarom već zabeleženim.",
      },
    ],

    proof: {
      eyebrow: "Računica",
      title: "Koliko vas košta poziv na koji niko ne stigne da se javi.",
      lede:
        "Bez procenata iz tuđih istraživanja — samo aritmetika sa brojevima koje sami znate. Zamenite ih svojima i pogledajte šta ostane.",
      figures: [
        {
          value: "10",
          label: "propuštenih poziva nedeljno",
          note: "Pretpostavka za majstora koji radi sam ili sa jednim pomoćnikom, po ceo dan na terenu.",
        },
        {
          value: "4",
          label: "mušterije koje pozovu sledećeg majstora",
          note: "Konzervativno: šestoro ostavi poruku ili pozove ponovo, četvoro ode kod prvog majstora koji se javi.",
        },
        {
          value: "~14.000 RSD",
          label: "nedeljno u poslovima koji nisu dogovoreni",
          note: "4 mušterije nedeljno × oko 3.500 RSD prosečne manje intervencije, bez računanja većih poslova.",
        },
      ],
      conclusion:
        "To je iznos koji lako pokrije još jedan radni dan nedeljno — a nastaje isključivo od poziva koje niste ni čuli, ne od nedostatka posla u vašem kraju.",
      source:
        "Računica je ilustrativna, sa pretpostavkama navedenim uz svaki broj. APLORY ne garantuje broj novih mušterija.",
    },

    capabilities: {
      eyebrow: "Šta dobijate",
      leadTag: "Glavno",
      title: "Šta APLORY radi za vas.",
      items: [
        {
          name: "Uzima adresu i opis kvara dok radite",
          line: "Mušterija napiše šta se pokvarilo, vi vidite gotov opis kad završite trenutni posao — ne prazan propušten poziv koji morate da vraćate naslepo.",
        },
        {
          name: "Prepoznaje hitan slučaj",
          line: "Pukla cev, kvar na struji ili curenje gasa dobijaju prioritetnu poruku sa procenom hitnosti, umesto da čekaju red kao običan poziv za procenu.",
        },
        {
          name: "Dogovara termin dolaska",
          line: "Kad su adresa i kvar poznati, APLORY predloži okvirno vreme dolaska na osnovu vašeg rasporeda, umesto da se to dogovara porukama tokom celog dana.",
        },
        {
          name: "Odgovara na pitanja o ceni izlaska",
          line: "„Koliko naplaćujete izlazak“ dobija vaš odgovor, zadat unapred — bez da vi prekidate posao da biste ga otkucali po deseti put.",
        },
        {
          name: "Radi uveče i vikendom",
          line: "Kvar ne bira radno vreme. Ko piše u nedelju uveče dobija odgovor i procenu da li može da sačeka do ponedeljka ili traži hitan izlazak.",
        },
        {
          name: "Traži Google recenziju posle završenog posla",
          line: "Zamolba stiže isti dan kad je posao gotov, dok je mušterija zadovoljna. Recenzije su ono što odlučuje kog majstora će sledeća mušterija pozvati prvog.",
        },
      ],
    },
    faqTitle: "Pitanja koja majstori postave pre nego što probaju.",
    faq: [
      {
        q: "Da li mušterija zna da ne piše sa mnom lično?",
        a: "Da. Poruka jasno kaže da ste trenutno na terenu i da odgovara asistent. Cilj je da mušterija dobije procenu i termin, ne da bude prevarena.",
      },
      {
        q: "Da li APLORY procenjuje kvar ili daje cenu unapred?",
        a: "Ne. Ne postavlja dijagnozu kvara. Prikuplja opis koji mušterija navede i na osnovu toga procenjuje hitnost — tačnu cenu i dijagnozu i dalje dajete vi na licu mesta.",
      },
      {
        q: "Šta ako je u pitanju stvarno hitan slučaj, npr. curenje gasa?",
        a: "Takav opis dobija najviši prioritet i jasnu poruku mušteriji da hitne slučajeve poput curenja gasa prvo prijavi nadležnoj službi, uz odmah obaveštenje vama.",
      },
      {
        q: "Kako se dogovara tačno vreme dolaska?",
        a: "APLORY predlaže okvirno vreme na osnovu onoga što vi definišete kao dostupno, a tačno vreme potvrđujete vi kad vidite gde se posao uklapa u raspored tog dana.",
      },
      {
        q: "Šta sa pitanjima o ceni izlaska i intervencije?",
        a: "Odgovara onako kako vi zadate — fiksnom cenom izlaska ili rasponom za samu intervenciju. Ništa se ne izmišlja: ako cena zavisi od kvara, poruka to kaže.",
      },
      {
        q: "Koji podaci o mušteriji se prikupljaju?",
        a: "Ime, kontakt, adresa i opis kvara — onoliko koliko treba da bi se dogovorio dolazak. Ništa se ne deli dalje niti koristi van tog dogovora.",
      },
    ],
  },
];

export default niches;

export const nicheBySlug = Object.fromEntries(niches.map((n) => [n.slug, n]));
