export function dictionary() {
  return {
    brand: 'zerozero',
    slogan: 'Precision. Clarity. Confidence.',
    nav: {
      home: 'Home', services: 'Services', about: 'About', industries: 'Industries', testimonials: 'Testimonials', resources: 'Resources', pricing: 'Pricing', contact: 'Contact', cta: 'Book a Consultation'
    },
    hero: {
      badge: 'Precision. Clarity. Confidence.',
      title: 'Accounting that turns numbers into clear decisions.',
      subtitle: 'zerozero is a modern, reliable accounting and advisory partner for businesses that value accuracy, insight, and long-term relationships.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'View Our Services',
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
      title: 'About zerozero',
      p1: 'We’re a team of experienced accountants and advisors focused on delivering precision, clarity, and confidence. We combine modern tools with human judgment to translate complex numbers into simple, actionable insights.',
      p2: 'Our philosophy is simple: build long-term partnerships, prioritize transparency, and help you make confident decisions at every stage of your business.',
      bullets: [
        'We translate complex numbers into simple language.',
        'We combine modern tools with personal attention.',
        'We focus on long-term partnerships, not one-off jobs.',
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
      title: 'What Our Clients Say', intro: 'Trusted by founders and finance teams.',
      items: [
        { quote: 'zerozero transformed our monthly close and gave us real visibility into cash flow.', name: 'Amelia R.', role: 'Founder, Local Retail Brand' },
        { quote: 'Their advice helped us structure smarter and prepare for fundraising.', name: 'Jonas M.', role: 'CEO, SaaS Startup' },
        { quote: 'Responsive, precise, and a pleasure to work with.', name: 'Priya K.', role: 'COO, Design Studio' },
      ],
    },
    resources: { title: 'Resources & Insights', intro: 'Practical guidance from our team.', readMore: 'Read more', exploreAll: 'Explore all resources →' },
    pricing: {
      title: 'Simple, Transparent Pricing', intro: 'Choose a plan that fits your stage.',
      mostPopular: 'Most Popular',
      plans: [
        { name: 'Starter', price: 'from €149/month', desc: 'For solo founders and early-stage businesses.', features: ['Core bookkeeping', 'Quarterly reports', 'Email support'] },
        { name: 'Growth', price: 'from €349/month', desc: 'For SMEs needing robust reporting.', features: ['Monthly close', 'Management reports', 'Payroll support', 'Tax filings'], highlighted: true },
        { name: 'Custom', price: 'Custom', desc: 'Complex needs or larger teams.', features: ['Dedicated advisor', 'Advanced reporting', 'Custom workflows'] },
      ],
      button: 'Request a Quote',
    },
    contact: {
      title: 'Let’s Talk About Your Numbers', intro: 'Tell us about your business. We’ll reach out to schedule a consultation.',
      fields: { name: 'Name*', company: 'Company', email: 'Email*', phone: 'Phone', size: 'Company size', message: 'Message*' },
      checkbox: 'I agree to the privacy policy', submit: 'Send Message', success: 'Thanks! Your message has been sent. We’ll get back to you soon.'
    },
    footer: { rights: 'All rights reserved.', privacy: 'Privacy Policy' },
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

