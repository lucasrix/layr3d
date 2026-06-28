const steps = [
  {
    number: '01',
    title: 'Upload Your STL File',
    description: 'We print from 3D model files (.stl) only. Have a photo or drawing instead? Use a free AI STL Generator to convert any image into a printable .stl first.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Prep & Print',
    description: 'Our technician preps your STL file, sets up the printer with your chosen material, and prints your design.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 10h10M7 7h4"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'QA & Ship',
    description: 'Every print goes through quality review before it ships. Your custom 3D print arrives at your door in 2–7 business days.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading">
            From STL file to doorstep in three simple steps.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-brand-100 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              {/* Icon circle */}
              <div className="w-20 h-20 bg-brand-50 border-2 border-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                {step.icon}
              </div>

              <div className="text-xs font-bold tracking-widest text-brand-500 uppercase mb-2">
                Step {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Only have a photo or drawing?{' '}
            <a
              href="https://studio.tripo3d.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 font-semibold hover:underline"
            >
              AI STL Generator
            </a>{' '}
            converts any image into a printable .stl file in minutes.
          </p>
        </div>

        <div className="mt-8 text-center">
          <a href="#order" className="btn-primary">
            Place an Order
          </a>
        </div>
      </div>
    </section>
  );
}
