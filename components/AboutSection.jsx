export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <div className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">About layr3d</div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Custom prints, crafted with care.
            </h2>
            <p className="mt-6 text-gray-300 text-lg leading-relaxed">
              layr3d is a boutique 3D printing studio built around one idea: any image you can imagine should exist in the real world. Whether it's a personal logo, a gift for someone special, or a prototype for your next big idea — we bring it to life, layer by layer.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Every order is handled personally. We use professional-grade printers and quality materials to ensure your print looks exactly how you envisioned it. Not happy? We'll make it right.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { label: 'Materials', value: 'PLA, PETG, TPU' },
                { label: 'Turnaround', value: '2–7 business days' },
                { label: 'Sizes', value: 'Small to Life Size' },
                { label: 'Support', value: 'Personal & hands-on' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-brand-400 text-xs font-bold uppercase tracking-wider">{item.label}</div>
                  <div className="text-white font-semibold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="relative">
            <div className="aspect-square bg-brand-800 rounded-3xl flex items-center justify-center border border-brand-700 overflow-hidden">
              <div className="text-center text-brand-600">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <p className="text-brand-500 text-sm">Photo placeholder</p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-600/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
