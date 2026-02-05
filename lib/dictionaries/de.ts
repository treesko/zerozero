export function dictionary() {
  return {
    brand: 'zerozero',
    slogan: 'Präzision. Klarheit. Vertrauen.',
    nav: {
      home: 'Start', services: 'Leistungen', about: 'Über uns', industries: 'Branchen', tools: 'Rechner', testimonials: 'Referenzen', resources: 'Ressourcen', pricing: 'Preise', contact: 'Kontakt', cta: 'Beratung buchen'
    },
    hero: {
      badge: 'Präzision. Klarheit. Vertrauen.',
      title: 'Buchhaltung, die Zahlen in klare Entscheidungen verwandelt.',
      subtitle: 'zerozero ist ein modernes, verlässliches Buchhaltungs- und Beratungsunternehmen für Betriebe, die Genauigkeit, Einblicke und langfristige Partnerschaften schätzen.',
      primaryCta: 'Kostenloses Beratungsgespräch',
      secondaryCta: 'Unsere Leistungen ansehen',
    },
    stats: [
      { label: 'Jahre Erfahrung', value: '10+' },
      { label: 'Betreute Unternehmen', value: '100+' },
      { label: 'Abgewickelte Transaktionen', value: '€50M+' },
      { label: 'Kundenbindung', value: '99%' },
    ],
    services: {
      title: 'Unsere Leistungen',
      intro: 'Von Buchhaltung bis Beratung – ganzheitliche finanzielle Klarheit für wachsende Unternehmen.',
      items: [
        { title: 'Buchhaltung & Accounting', desc: 'Präzise, zeitnahe Buchführung mit schlanken Prozessen und Expertenaufsicht.' },
        { title: 'Steuerplanung & Compliance', desc: 'Proaktive Planung und rechtskonforme Erklärungen zur Optimierung Ihrer Steuerposition.' },
        { title: 'Lohn- & Gehaltsabrechnung', desc: 'Zuverlässige Abrechnung mit vollständiger Compliance und Reporting.' },
        { title: 'Finanzberichte & Analyse', desc: 'Klare Monatsberichte und Insights für fundierte Entscheidungen.' },
        { title: 'Beratung für Startups & KMU', desc: 'Vom Aufbau bis zum Skalieren – auf Ihren Wachstumspfad zugeschnitten.' },
        { title: 'Cashflow & Budgetierung', desc: 'Forecasts und Budgets zur Verbesserung von Liquidität und Steuerung.' },
      ],
    },
    about: {
      title: 'Über zerozero',
      p1: 'Wir sind ein Team erfahrener Buchhalterinnen und Berater, das auf Präzision, Klarheit und Vertrauen setzt. Wir verbinden moderne Tools mit menschlichem Urteilsvermögen und machen komplexe Zahlen einfach und umsetzbar.',
      p2: 'Unsere Philosophie: langfristige Partnerschaften, Transparenz und sichere Entscheidungen in jeder Phase Ihres Unternehmens.',
      bullets: [
        'Wir übersetzen komplexe Zahlen in klare Sprache.',
        'Moderne Werkzeuge kombiniert mit persönlicher Betreuung.',
        'Fokus auf langfristige Partnerschaften statt einmaliger Aufträge.',
      ],
    },
    industries: {
      title: 'Branchen, die wir bedienen', intro: 'Individuelle Buchhaltungslösungen für moderne Unternehmen.',
      items: [
        { t: 'Kleine & mittlere Unternehmen', d: 'Effiziente Finanzprozesse, die mit Ihnen skalieren.' },
        { t: 'Startups & Tech', d: 'Von Runway bis Metriken – wir unterstützen Sie.' },
        { t: 'Freelancer & Kreative', d: 'Weniger Admin, mehr Zeit für Ihr Handwerk.' },
        { t: 'Einzelhandel & E-Commerce', d: 'Bestand, Umsatz und Steuern – korrekt umgesetzt.' },
        { t: 'Professionelle Dienstleistungen', d: 'Projektprofitabilität mit transparentem Reporting.' },
      ],
    },
    testimonials: {
      title: 'Was unsere Kund:innen sagen', intro: 'Vertraut von Gründer:innen und Finance-Teams.',
      items: [
        { quote: 'zerozero hat unseren Monatsabschluss transformiert und echte Transparenz in den Cashflow gebracht.', name: 'Amelia R.', role: 'Gründerin, lokale Retail-Marke' },
        { quote: 'Ihre Beratung half uns, smarter zu strukturieren und uns auf Fundraising vorzubereiten.', name: 'Jonas M.', role: 'CEO, SaaS-Startup' },
        { quote: 'Schnell, präzise und sehr angenehm in der Zusammenarbeit.', name: 'Priya K.', role: 'COO, Designstudio' },
      ],
    },
    resources: { title: 'Ressourcen & Insights', intro: 'Praxisnahe Guidance von unserem Team.', readMore: 'Mehr lesen', exploreAll: 'Alle Ressourcen ansehen →' },
    pricing: {
      title: 'Einfache, transparente Preise', intro: 'Wählen Sie das passende Paket.',
      mostPopular: 'Am beliebtesten',
      plans: [
        { name: 'Starter', price: 'ab €149/Monat', desc: 'Für Solo-Gründer:innen und frühe Phasen.', features: ['Kernbuchhaltung', 'Quartalsberichte', 'E-Mail-Support'] },
        { name: 'Wachstum', price: 'ab €349/Monat', desc: 'Für KMU mit starkem Reporting-Bedarf.', features: ['Monatsabschluss', 'Management-Reports', 'Payroll-Support', 'Steuererklärungen'], highlighted: true },
        { name: 'Individuell', price: 'Individuell', desc: 'Komplexe Anforderungen oder größere Teams.', features: ['Dedizierte Beratung', 'Erweitertes Reporting', 'Individuelle Workflows'] },
      ],
      button: 'Angebot anfragen',
    },
    contact: {
      title: 'Sprechen wir über Ihre Zahlen', intro: 'Erzählen Sie uns von Ihrem Unternehmen. Wir melden uns für ein Beratungsgespräch.',
      fields: { name: 'Name*', company: 'Unternehmen', email: 'E-Mail*', phone: 'Telefon', size: 'Unternehmensgröße', message: 'Nachricht*' },
      checkbox: 'Ich stimme der Datenschutzerklärung zu', submit: 'Nachricht senden', success: 'Danke! Ihre Nachricht wurde gesendet. Wir melden uns in Kürze.'
    },
    footer: { rights: 'Alle Rechte vorbehalten.', privacy: 'Datenschutzerklärung' },
    privacy: {
      title: 'Datenschutzerklärung',
      p1: 'Wir respektieren Ihre Privatsphäre. Diese Website erhebt keine personenbezogenen Daten außer den Informationen, die Sie freiwillig über das Kontaktformular übermitteln. Wir verwenden Ihre Daten ausschließlich zur Beantwortung Ihrer Anfrage. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten. Wenn Sie die Löschung Ihrer Daten wünschen, kontaktieren Sie uns.',
      p2: 'Diese Seite dient rein zu Informationszwecken und kann gelegentlich aktualisiert werden.',
    },
    resourcesData: [
      {
        slug: '5-accounting-mistakes-small-businesses-make',
        title: '5 Buchhaltungsfehler kleiner Unternehmen',
        excerpt: 'Vermeiden Sie diese Fallen für saubere Finanzen.',
        content:
          'Kleine Unternehmen bewegen sich schnell – die Buchhaltung hinkt oft hinterher. Häufige Fehler: private und geschäftliche Ausgaben mischen, monatliche Abstimmungen auslassen, Rechnungen verzögert stellen, Cashflow-Prognosen ignorieren und Prozesse nicht dokumentieren. Etablieren Sie einen leichten, konsistenten Monatsabschluss, digitalisieren Sie Belege und prüfen Sie KPIs wie Bruttomarge und Runway monatlich.',
      },
      {
        slug: 'how-to-prepare-for-year-end-taxes',
        title: 'So bereiten Sie die Jahressteuer vor',
        excerpt: 'Eine einfache Checkliste für eine reibungslose und pünktliche Abgabe.',
        content:
          'Starten Sie früh mit geordneten Büchern, stimmen Sie alle Konten ab, sammeln Sie W-9/Steuerdokumente und stellen Sie korrekte Lohn- und Auftragnehmerdaten sicher. Prüfen Sie Investitionen, erfassen Sie abzugsfähige Ausgaben und beachten Sie den Steuerkalender. Ein kurzer Pre-Close-Check mit Ihrer Beratung vermeidet Überraschungen und macht die Abgabe effizient.',
      },
      {
        slug: 'what-your-financial-statements-are-really-telling-you',
        title: 'Was Ihre Finanzberichte wirklich sagen',
        excerpt: 'Lesen Sie Ihre Zahlen wie eine Führungskraft – nicht nur buchhalterisch.',
        content:
          'GuV zeigt Performance, Bilanz zeigt Gesundheit, Cashflow zeigt Realität. Beobachten Sie Trends statt nur absolute Werte. Segmentieren Sie Umsätze, verstehen Sie Unit Economics und überwachen Sie Frühindikatoren. Ein monatliches Meeting mit einem einfachen Dashboard schafft Klarheit und bessere Entscheidungen.',
      },
    ],
  }
}

