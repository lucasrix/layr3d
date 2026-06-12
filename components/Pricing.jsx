const tiers = [
  {
    size: 'Small',
    price: 15,
    dimensions: 'Up to 3"',
    description: 'Perfect for keychains, badges, and small decorative pieces.',
    highlight: false,
  },
  {
    size: 'Medium',
    price: 25,
    dimensions: 'Up to 6"',
    description: 'Great for desk decor, figurines, and small prototypes.',
    highlight: false,
  },
  {
    size: 'Large',
    price: 40,
    dimensions: 'Up to 10"',
    description: 'Ideal for display pieces, cosplay props, and models.',
    highlight: true,
  },
  {
    size: 'Extra Large',
    price: 60,
    dimensions: 'Up to 15"',
    description: 'Statement pieces, larger props, and detailed sculptures.',
    highlight: false,
  },
  {
    size: 'Costume',
    price: 120,
    dimensions: '16"+ / full scale',
    description: 'Full-scale costume pieces, replicas, large installations, and display art.',
    highlight: false,
  },
];

const materials = [
  { name: 'PLA', description: 'Rigid, great detail, wide color range. Best for decorative and display items.' },
  { name: 'PETG', description: 'Durable and slightly flexible. Better for functional parts and outdoor use.' },
  { name: 'TPU', description: 'Soft and flexible. Perfect for wearables, grips, and impact-resistant pieces.' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-heading">Simple Pricing</h2>
          <p className="section-subheading">
            Pay by size. No hidden fees — price includes printing, QA, and standard shipping.
          </p>
        </div>

        {/* Size pricing grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.size}
              className={`relative rounded-2xl p-6 flex flex-col ${
                tier.highlight
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-200 ring-2 ring-brand-500'
                  : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`text-sm font-semibold uppercase tracking-wider ${tier.highlight ? 'text-brand-200' : 'text-brand-600'}`}>
                {tier.size}
              </div>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-extrabold">${tier.price}</span>
              </div>
              <div className={`text-xs mt-1 font-medium ${tier.highlight ? 'text-brand-200' : 'text-gray-400'}`}>
                {tier.dimensions}
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${tier.highlight ? 'text-brand-100' : 'text-gray-500'}`}>
                {tier.description}
              </p>
              <a
                href="#order"
                className={`mt-6 text-center text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors ${
                  tier.highlight
                    ? 'bg-white text-brand-600 hover:bg-brand-50'
                    : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                }`}
              >
                Order This Size
              </a>
            </div>
          ))}
        </div>

        {/* Materials */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Available Materials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materials.map((m) => (
              <div key={m.name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-brand-600 font-bold text-lg">{m.name}</div>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
