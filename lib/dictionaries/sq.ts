export function dictionary() {
  return {
    brand: 'zerozero',
    slogan: 'Saktësi. Qartësi. Besim.',
    nav: {
      home: 'Kreu', services: 'Shërbimet', about: 'Rreth nesh', industries: 'Industrikat', testimonials: 'Dëshmitë', resources: 'Burimet', pricing: 'Çmimet', contact: 'Kontakti', cta: 'Rezervo Konsultim'
    },
    hero: {
      badge: 'Saktësi. Qartësi. Besim.',
      title: 'Kontabilitet që i kthen numrat në vendime të qarta.',
      subtitle: 'zerozero është partner modern dhe i besueshëm në kontabilitet dhe këshillim për biznese që vlerësojnë saktësinë, qartësinë dhe marrëdhëniet afatgjata.',
      primaryCta: 'Rezervo Konsultim Falas',
      secondaryCta: 'Shiko Shërbimet Tona',
    },
    stats: [
      { label: 'Vite përvojë', value: '10+' },
      { label: 'Biznese të shërbyera', value: '100+' },
      { label: 'Transaksione të menaxhuara', value: '€50M+' },
      { label: 'Mbajtje klientësh', value: '99%' },
    ],
    services: {
      title: 'Shërbimet Tona',
      intro: 'Nga kontabiliteti te këshillimi, ofrojmë qartësi financiare për bizneset në rritje.',
      items: [
        { title: 'Kontabilitet & Mbajtje Librash', desc: 'Kontabilitet i saktë dhe i përkohshëm me procese të thjeshtuara dhe mbikëqyrje eksperte.' },
        { title: 'Planifikim & Përputhshmëri Tatimore', desc: 'Planifikim proaktiv dhe deklarime në përputhje për të optimizuar pozicionin tatimor.' },
        { title: 'Shërbime Page', desc: 'Përpunim i besueshëm i pagave me përputhshmëri të plotë dhe raportim.' },
        { title: 'Raportim & Analizë Financiare', desc: 'Raporte mujore të qarta dhe njohuri për vendimmarrje më të mirë.' },
        { title: 'Këshillim për Startup & NVM', desc: 'Nga themelimi te shkallëzimi, këshilla të përshtatura për rrugëtimin tuaj.' },
        { title: 'Fluksi i Parasë & Buxhetimi', desc: 'Parashikim dhe buxhetim për të përmirësuar likuiditetin dhe kontrollin.' },
      ],
    },
    about: {
      title: 'Rreth zerozero',
      p1: 'Ne jemi ekip kontabilistësh dhe këshilltarësh me përvojë, të fokusuar në dhënien e saktësisë, qartësisë dhe besimit. Kombinojmë mjetet moderne me gjykimin njerëzor për t’i kthyer numrat kompleks në njohuri të thjeshta dhe të zbatueshme.',
      p2: 'Filozofia jonë është e thjeshtë: ndërtoni partneritete afatgjata, jepni përparësi transparencës dhe ndihmoni të merrni vendime me besim në çdo fazë të biznesit.',
      bullets: [
        'I përkthejmë numrat kompleks në gjuhë të thjeshtë.',
        'Kombinojmë mjetet moderne me kujdes personal.',
        'Fokusohemi në partneritete afatgjata, jo punë një-herëshe.',
      ],
    },
    industries: {
      title: 'Industrikat që Shërbejmë', intro: 'Zgjidhje të përshtatura kontabiliteti për bizneset moderne.',
      items: [
        { t: 'Biznese të Vogla & të Mesme', d: 'Operacionet financiare efikase që rriten bashkë me ju.' },
        { t: 'Startups & Teknologji', d: 'Nga runway te metrikat – jemi pranë jush.' },
        { t: 'Freelancerë & Krijues', d: 'Më pak administratë, më shumë kohë për krijim.' },
        { t: 'Retail & E-commerce', d: 'Inventar, të ardhura dhe taksa – siç duhet.' },
        { t: 'Shërbime Profesionale', d: 'Fitueshmëria e projekteve me raportim të qartë.' },
      ],
    },
    testimonials: {
      title: 'Çfarë Thonë Klientët Tanë', intro: 'Të besuar nga themelues dhe ekipe finance.',
      items: [
        { quote: 'zerozero transformoi mbylljen tonë mujore dhe na dha dukshmëri reale mbi fluksin e parave.', name: 'Amelia R.', role: 'Themeluese, Brand Lokal Retail' },
        { quote: 'Këshillat e tyre na ndihmuan të strukturohemi më zgjuar dhe të përgatitemi për ngritje fondesh.', name: 'Jonas M.', role: 'CEO, SaaS Startup' },
        { quote: 'Të përgjegjshëm, të saktë dhe kënaqësi për t’u bashkëpunuar.', name: 'Priya K.', role: 'COO, Studio Dizajni' },
      ],
    },
    resources: { title: 'Burime & Njohuri', intro: 'Udhëzime praktike nga ekipi ynë.', readMore: 'Lexo më shumë', exploreAll: 'Shiko të gjitha burimet →' },
    pricing: {
      title: 'Çmime të Thjeshta, Transparente', intro: 'Zgjidhni planin që ju përshtatet.',
      mostPopular: 'Më i Popullarizuari',
      plans: [
        { name: 'Fillestar', price: 'nga €149/muaj', desc: 'Për themelues solo dhe biznese në fazë të hershme.', features: ['Kontabilitet bazë', 'Raporte tremujore', 'Mbështetje me email'] },
        { name: 'Rritje', price: 'nga €349/muaj', desc: 'Për NVM që kërkojnë raportim të fuqishëm.', features: ['Mbyllje mujore', 'Raporte menaxheriale', 'Mbështetje për paga', 'Deklarime tatimore'], highlighted: true },
        { name: 'I personalizuar', price: 'Sipas kërkesës', desc: 'Nevoja komplekse ose ekipe më të mëdha.', features: ['Këshilltar i dedikuar', 'Raportim i avancuar', 'Procese të personalizuara'] },
      ],
      button: 'Kërko Ofertë',
    },
    contact: {
      title: 'Le të Flasim për Numrat Tuaj', intro: 'Na tregoni për biznesin tuaj. Do t’ju kontaktojmë për një konsultim.',
      fields: { name: 'Emri*', company: 'Kompania', email: 'Email*', phone: 'Telefoni', size: 'Madhësia e kompanisë', message: 'Mesazhi*' },
      checkbox: 'Jam dakord me politikën e privatësisë', submit: 'Dërgo Mesazhin', success: 'Faleminderit! Mesazhi juaj u dërgua. Do t’ju kontaktojmë së shpejti.'
    },
    footer: { rights: 'Të gjitha të drejtat e rezervuara.', privacy: 'Politika e Privatësisë' },
    privacy: {
      title: 'Politika e Privatësisë',
      p1: 'Respektojmë privatësinë tuaj. Ky website nuk mbledh të dhëna personale përveç informacionit që dërgoni vullnetarisht përmes formularit të kontaktit. Përdorim detajet vetëm për t’iu përgjigjur kërkesave. Nuk i shesim apo ndajmë të dhënat me palë të treta. Nëse dëshironi fshirjen e të dhënave, na kontaktoni.',
      p2: 'Kjo faqe është vetëm informuese dhe mund të përditësohet herë pas here.',
    },
    resourcesData: [
      {
        slug: '5-accounting-mistakes-small-businesses-make',
        title: '5 Gabime të Kontabilitetit që Bëjnë Bizneset e Vogla',
        excerpt: 'Shmangni gabimet e zakonshme për të mbajtur financat e pastra.',
        content:
          'Bizneset e vogla shpesh ecin shpejt dhe kontabiliteti mund të mbetet pas. Gabimet e zakonshme përfshijnë përzierjen e shpenzimeve personale me ato të biznesit, mungesën e pajtimeve mujore, vonesat në faturime, injorimin e parashikimeve të fluksit të parasë dhe mosdokumentimin e proceseve. Vendosni një mbyllje mujore të lehtë dhe të qëndrueshme, digjitalizoni faturat dhe rishikoni KPI-të si marzha bruto dhe runway çdo muaj.',
      },
      {
        slug: 'how-to-prepare-for-year-end-taxes',
        title: 'Si të Përgatiteni për Tatimin e Fundvitit',
        excerpt: 'Një listë e thjeshtë për deklarim pa stres dhe në kohë.',
        content:
          'Filloni herët me libra të rregullt, pajtoni të gjitha llogaritë, mblidhni W-9 dhe sigurohuni që pagat dhe kontraktorët të jenë të saktë. Rishikoni asetet fikse, kapni shpenzimet e zbritshme dhe konsultohuni me kalendarin tatimor. Një rishikim i shpejtë para mbylljes me këshilltarin shmang surprizat dhe e bën deklarimin efikas.',
      },
      {
        slug: 'what-your-financial-statements-are-really-telling-you',
        title: 'Çfarë Tregojnë me Të Vërtetë Pasqyrat Tuaja Financiare',
        excerpt: 'Lexoni numrat si operator, jo vetëm si kontabilist.',
        content:
          'Pasqyra e të ardhurave tregon performancën, bilanci tregon shëndetin, ndërsa fluksi i parasë tregon realitetin. Ndiqni trendet, jo vetëm vlerat absolute. Segmentoni të ardhurat, kuptoni ekonominë e njësisë dhe monitoroni treguesit pararendës. Një takim mujor me një panel të thjeshtë sjell qartësi dhe vendime më të mira.',
      },
    ],
  }
}

