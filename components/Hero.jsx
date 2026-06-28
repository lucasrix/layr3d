export default function Hero() {
  return (
    <section className="relative bg-brand-900 text-white pt-16 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand-800 text-brand-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-brand-700">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse"></span>
            PLA · PETG · TPU — Ships in 2–7 days
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Your image,
            <br />
            <span className="text-brand-400">brought to life</span>
            <br />
            in 3D.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
            Upload an STL file and we'll turn it into a custom 3D print — exactly to your specs. Don't have one yet? Convert any image to .stl with our AI STL Generator. Any color, any size, any material.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#order" className="btn-primary text-base px-8 py-4">
              Start Your Order
            </a>
            <a href="#how-it-works" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-base px-8 py-4">
              See How It Works
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { value: '3', label: 'Materials' },
              { value: '5', label: 'Size options' },
              { value: '2–7', label: 'Day turnaround' },
              { value: '100%', label: 'Custom prints' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="h-16 bg-gradient-to-b from-brand-900 to-white" />
    </section>
  );
}
