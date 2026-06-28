import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-brand-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Text */}
        <div className="max-w-2xl">
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

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
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

        {/* Infographic — full width, uncropped, so the multi-panel graphic stays readable */}
        <div className="mt-16 relative rounded-3xl border border-brand-700 bg-black overflow-hidden">
          <div className="relative w-full aspect-[3/2] sm:aspect-[2.4/1]">
            <Image
              src="/about-photo.jpg"
              alt="From image to reality — how layr3d turns your upload into a finished 3D print"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
