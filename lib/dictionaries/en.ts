export function dictionary() {
  return {
    brand: 'zerozero',
    slogan: 'Precision. Clarity. Confidence.',
    nav: {
      home: 'Home', services: 'Services', about: 'About', team: 'Team', industries: 'Industries', tools: 'Salary Calculator', testimonials: 'Testimonials', resources: 'Resources', faq: 'FAQ', contact: 'Contact', cta: 'Book a Consultation'
    },
    hero: {
      badge: 'Precision. Clarity. Confidence.',
      title: 'Accounting that turns numbers into clear decisions.',
      subtitle: "Hi, I'm Hafiz Bajraktari. I founded zerozero to give business owners like you the financial clarity and confidence you deserve. Let's work together.",
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'Learn More About Me',
    },
    stats: [
      { label: 'Years of expertise', value: '10+' },
      { label: 'Businesses served', value: '100+' },
      { label: 'Transactions handled', value: '€50M+' },
      { label: 'Client retention', value: '99%' },
    ],
    services: {
      title: 'Our Services',
      intro: 'From bookkeeping to advisory, we provide end-to-end financial clarity for growing businesses.',
      items: [
        { title: 'Bookkeeping & Accounting', desc: 'Accurate, timely bookkeeping with streamlined workflows and expert oversight.' },
        { title: 'Tax Planning & Compliance', desc: 'Proactive planning and compliant filings to optimize your tax position.' },
        { title: 'Payroll Services', desc: 'Reliable payroll processing with complete compliance and reporting.' },
        { title: 'Financial Reporting & Analysis', desc: 'Clear monthly reports and insights to guide decision-making.' },
        { title: 'Startup & SME Advisory', desc: 'From setup to scale, guidance tailored to your growth journey.' },
        { title: 'Cash Flow & Budgeting', desc: 'Forecasting and budgeting to improve liquidity and control.' },
      ],
    },
    about: {
      title: 'Meet the Founder',
      p1: "I'm Hafiz Bajraktari, and I founded zerozero with a simple mission: to give every business owner the clarity and confidence they deserve when it comes to their finances. After years of seeing businesses struggle with confusing numbers and impersonal accounting services, I decided to build something different.",
      p2: 'At zerozero, I believe accounting should empower you, not overwhelm you. I combine modern tools with genuine care for your success, treating every client like a long-term partner rather than just another account.',
      bullets: [
        'Personal attention from day one – you work directly with me.',
        'Modern tools with a human touch – technology serves you, not the other way around.',
        'Long-term partnership mindset – your success is my success.',
      ],
    },
    industries: {
      title: 'Industries We Serve', intro: 'Tailored accounting solutions for modern businesses.',
      items: [
        { t: 'Small & Medium Businesses', d: 'Efficient finance operations built to scale with you.' },
        { t: 'Startups & Tech', d: 'From runway to metrics, we’ve got your back.' },
        { t: 'Freelancers & Creators', d: 'Less admin, more time for your craft.' },
        { t: 'Retail & E-commerce', d: 'Inventory, revenue, and tax done right.' },
        { t: 'Professional Services', d: 'Project profitability with clear reporting.' },
      ],
    },
    testimonials: {
      title: 'What Clients Say', intro: 'Business owners share their experience working with Hafiz.',
      items: [
        { quote: 'Hafiz transformed how I understand my business finances. For the first time, I actually look forward to my monthly reports.', name: 'Arta M.', role: 'Founder, Boutique Retail' },
        { quote: 'Working with Hafiz feels like having a trusted advisor on speed dial. His proactive approach saved us thousands in taxes.', name: 'Besnik K.', role: 'CEO, Tech Startup' },
        { quote: 'Finally, an accountant who explains things in plain language. Hafiz genuinely cares about my business success.', name: 'Donika R.', role: 'Owner, Creative Agency' },
      ],
    },
    resources: { title: 'Resources & Insights', intro: 'Practical guidance from our team.', readMore: 'Read more', exploreAll: 'Explore all resources →' },
    contact: {
      title: 'Let’s Talk About Your Numbers', intro: 'Tell us about your business. We’ll reach out to schedule a consultation.',
      fields: { name: 'Name*', company: 'Company', email: 'Email*', phone: 'Phone', size: 'Company size', message: 'Message*' },
      checkbox: 'I agree to the privacy policy', submit: 'Send Message', success: 'Thanks! Your message has been sent. We’ll get back to you soon.'
    },
    footer: { rights: 'All rights reserved.', privacy: 'Privacy Policy' },
    tools: {
      sectionTitle: 'Free Salary Calculator',
      sectionSubtitle: 'Calculate your Kosovo net/gross salary with up-to-date tax rates',
      salary: {
        tabTitle: 'Salary Calculator',
        tabDescription: 'Kosovo net/gross salary conversion',
        title: 'Kosovo Salary Calculator',
        subtitle: 'Calculate your net salary from gross or vice versa',
        employerType: 'Employer Type',
        primaryEmployer: 'Primary Employer',
        secondaryEmployer: 'Secondary Employer',
        mode: 'Calculation Mode',
        grossToNet: 'Gross → Net',
        netToGross: 'Net → Gross',
        grossInput: 'Monthly Gross Salary (Bruto)',
        netInput: 'Desired Net Salary (Neto)',
        grossPlaceholder: 'e.g., 800',
        netPlaceholder: 'e.g., 650',
        taxRatesTitle: 'Kosovo Tax Rates (2025):',
        taxRatesPension: 'Pension Contribution: 5% (employee) + 5% (employer)',
        taxRatesIncome: 'Income Tax: 0% (0-250€), 8% (250-450€), 10% (450€+)',
        taxRatesIncomeSecondary: 'Income Tax: flat 10% on taxable income',
        calculateNet: 'Calculate Net Salary',
        calculateGross: 'Calculate Gross Salary',
        grossSalary: 'Gross Salary (Bruto)',
        netSalary: 'Net Salary (Neto)',
        employeeDeductions: 'Employee Deductions',
        pensionContrib: 'Pension Contribution (5%)',
        taxableIncome: 'Taxable Income',
        incomeTax: 'Income Tax',
        employerCost: 'Employer Cost',
        employerPension: 'Employer Pension (5%)',
        totalEmployerCost: 'Total Employer Cost',
        annualSummary: 'Annual Summary',
        annualGross: 'Annual Gross',
        annualNet: 'Annual Net',
        annualEmployerCost: 'Annual Employer Cost',
        payrollHelp: 'Get Payroll Help',
        calculateAgain: 'Calculate Again',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      intro: 'Find answers to common questions about our services.',
      items: [
        { question: 'What services does zerozero offer?', answer: 'We offer comprehensive accounting and advisory services including bookkeeping, tax planning and compliance, payroll management, financial reporting, startup advisory, and cash flow management. Our services are tailored to meet the needs of small businesses, startups, freelancers, and growing companies.' },
        { question: 'How much do your services cost?', answer: 'Our services are tailored to your business size, complexity, and needs. We offer flexible plans ranging from basic bookkeeping to comprehensive advisory. Book a free consultation and we\'ll recommend the best plan and provide a personalized quote.' },
        { question: 'What industries do you specialize in?', answer: 'We work with a diverse range of industries including startups and tech companies, small and medium businesses, freelancers and creators, retail and e-commerce, and professional services firms. Our approach is tailored to the unique financial needs of each industry.' },
        { question: 'How do I get started with zerozero?', answer: 'Getting started is easy! Simply book a free consultation through our website. During the call, we\'ll learn about your business, understand your needs, and recommend the best approach. After that, we\'ll handle the onboarding process to get you set up quickly.' },
        { question: 'What software and tools do you use?', answer: 'We use modern, cloud-based accounting software and tools to ensure accuracy and real-time visibility. We work with popular platforms and can integrate with your existing tools. We\'ll recommend the best setup during your consultation.' },
        { question: 'How often will I receive financial reports?', answer: 'Report frequency depends on your plan. Starter plans include quarterly reports, while Growth plans include comprehensive monthly reports with management insights. We believe regular reporting is key to making informed business decisions.' },
        { question: 'Can you help with tax planning and optimization?', answer: 'Absolutely! Tax planning is one of our core services. We take a proactive approach to help you minimize tax liability legally, plan for major business decisions, and ensure you never miss a deadline. Our advisors stay current with tax law changes.' },
        { question: 'What service levels do you offer?', answer: 'We offer tiered service levels to match your business stage. From essential bookkeeping for early-stage businesses, to comprehensive packages with monthly closes, management reports, payroll support, and tax filings, to fully customized plans for complex needs. Contact us to find the right fit.' },
        { question: 'Do you offer virtual and remote services?', answer: 'Yes! All our services are available remotely. We use secure cloud tools for document sharing and video calls for consultations. Many of our clients have never met us in person but enjoy the same high-quality service.' },
        { question: 'What\'s included in a free consultation?', answer: 'During your free consultation, we\'ll discuss your business, current financial setup, challenges, and goals. We\'ll provide initial recommendations and explain how we can help. There\'s no obligation – it\'s a chance for us to understand if we\'re a good fit for each other.' },
      ],
    },
    team: {
      badge: 'Your Partner',
      title: 'Meet Hafiz Bajraktari',
      intro: 'The founder behind zerozero and your dedicated accounting partner.',
      metaTitle: 'About Hafiz Bajraktari | zerozero',
      metaDescription: 'Meet Hafiz Bajraktari, founder of zerozero. With years of experience in accounting and business advisory, Hafiz provides personalized financial clarity for growing businesses.',
      members: [
        {
          name: 'Hafiz Bajraktari',
          role: 'Founder & Lead Advisor',
          bio: 'I founded zerozero because I believe every business owner deserves clear, honest, and proactive financial guidance. With extensive experience in accounting, tax planning, and business advisory, I work directly with each client to understand their unique needs and help them make confident decisions. My approach is simple: treat every business as if it were my own.',
          image: '/images/hafiz-placeholder.svg',
          credentials: ['Certified Accountant', 'Tax Specialist', 'Business Advisor'],
        },
      ],
      valuesTitle: 'My Commitment to You',
      valuesIntro: 'The principles I bring to every client relationship.',
      values: [
        { title: 'Precision', desc: 'Every number matters. I maintain the highest standards of accuracy so you can trust your financial data completely.' },
        { title: 'Clarity', desc: 'No jargon, no confusion. I explain everything in plain language so you always understand your financial position.' },
        { title: 'Partnership', desc: 'I\'m invested in your long-term success. When you grow, I grow. That\'s the kind of relationship I build.' },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      p1: 'We respect your privacy. This website does not collect personal data beyond the information you voluntarily submit through our contact form. We use your details solely to respond to inquiries. We do not sell or share your data with third parties. If you would like your information deleted, please contact us.',
      p2: 'This page is provided for informational purposes and may be updated from time to time.',
    },
    resourcesData: [
      {
        slug: '5-accounting-mistakes-small-businesses-make',
        title: '5 Accounting Mistakes Small Businesses Make',
        excerpt: 'Avoid these common pitfalls to keep finances clean.',
        content:
          'Small businesses often move fast and accounting can lag behind. Common mistakes include mixing personal and business expenses, skipping monthly reconciliations, delaying invoicing, ignoring cash flow forecasts, and not documenting processes. Put a lightweight, consistent monthly close in place, keep receipts digitized, and review KPIs like gross margin and runway every month.',
      },
      {
        slug: 'how-to-prepare-for-year-end-taxes',
        title: 'How to Prepare for Year-End Taxes',
        excerpt: 'A simple checklist to file smoothly and on time.',
        content:
          'Start early with organized books, reconcile all accounts, collect W-9s, and ensure payroll and contractor records are accurate. Review fixed asset purchases, capture eligible deductions, and consult your tax calendar. A quick pre-close review with your advisor avoids surprises and keeps your filing efficient.',
      },
      {
        slug: 'what-your-financial-statements-are-really-telling-you',
        title: 'What Your Financial Statements Are Really Telling You',
        excerpt: 'Read your numbers like an operator, not just an accountant.',
        content:
          'Your P&L shows performance, your balance sheet shows health, and your cash flow statement shows reality. Track trends, not just absolute values. Segment revenue, understand unit economics, and monitor leading indicators. Meeting monthly with a simple dashboard drives clarity and better decisions.',
      },
    ],
  }
}

