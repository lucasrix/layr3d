'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const SIZES = [
  { label: 'Small', value: 'small', price: 15, dimensions: 'Up to 3"' },
  { label: 'Medium', value: 'medium', price: 25, dimensions: 'Up to 6"' },
  { label: 'Large', value: 'large', price: 40, dimensions: 'Up to 10"' },
  { label: 'Extra Large', value: 'extralarge', price: 60, dimensions: 'Up to 15"' },
  { label: 'Costume', value: 'costume', price: 120, dimensions: '16"+ / full scale' },
];

const MATERIALS = [
  { name: 'PLA', surcharge: 0, label: 'PLA' },
  { name: 'PETG', surcharge: 5, label: 'PETG +$5' },
  { name: 'TPU', surcharge: 3, label: 'TPU +$3' },
];

const STL_INSTRUCTIONS_URL = 'https://studio.tripo3d.ai/';

export default function OrderForm() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [material, setMaterial] = useState('PLA');
  const [color] = useState('Black');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const basePrice = SIZES.find((s) => s.value === selectedSize)?.price ?? null;
  const materialSurcharge = MATERIALS.find((m) => m.name === material)?.surcharge ?? 0;
  const currentPrice = basePrice !== null ? basePrice + materialSurcharge : null;

  function handleFile(file) {
    if (!file) return;
    const isStl = file.name.toLowerCase().endsWith('.stl');
    if (!isStl) {
      setError(
        'Please upload an STL file (.stl). Have a photo or drawing instead? Use the AI STL Generator link below to convert it first.'
      );
      return;
    }
    setError(null);
    setImage(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!image) { setError('Please upload your STL file.'); return; }
    if (!selectedSize) { setError('Please select a size.'); return; }
    if (!customerName.trim()) { setError('Please enter your name.'); return; }
    if (!customerEmail.trim()) { setError('Please enter your email.'); return; }
    if (!shippingAddress.trim()) { setError('Please enter your shipping address.'); return; }

    setLoading(true);

    try {
      // Upload the STL file directly to Supabase Storage from the browser.
      // This avoids routing large files through the Vercel serverless function,
      // which has a body size limit that was causing uploads to fail.
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.stl`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('order-images')
        .upload(filename, image, {
          contentType: image.type || 'model/stl',
          upsert: false,
        });

      if (uploadError) {
        console.error('File upload error:', uploadError);
        setError('Failed to upload your STL file. Please try again.');
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('order-images')
        .getPublicUrl(uploadData.path);

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
          shipping_address: shippingAddress,
          material,
          color,
          size: selectedSize,
          price: currentPrice,
          image_url: urlData.publicUrl,
          image_filename: image.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSuccess(true);
        setOrderId(data.orderId);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section id="order" className="py-24 bg-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Order Received!</h2>
          <p className="mt-3 text-gray-500 text-lg">
            Thanks for your order. We'll get started on your 3D print right away and reach out if we have questions.
          </p>
          {orderId && (
            <div className="mt-4 inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500">
              Order ID: <span className="font-mono font-semibold text-gray-700">{orderId.slice(0, 8).toUpperCase()}</span>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-400">Expected delivery: 2–7 business days</p>
          <button
            onClick={() => { setSuccess(false); setImage(null); setSelectedSize(null); setMaterial('PLA'); setCustomerName(''); setCustomerEmail(''); setShippingAddress(''); setOrderId(null); }}
            className="mt-8 btn-secondary"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Place Your Order</h2>
          <p className="section-subheading">
            Upload your STL file, configure your print, and we'll handle the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Step 1: STL Upload */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1 — Upload Your STL File</h3>

            {image ? (
              <div className="relative flex items-center gap-4 border border-gray-100 rounded-xl p-5 bg-gray-50">
                <div className="w-12 h-12 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{image.name}</p>
                  <p className="text-xs text-gray-400">{(image.size / 1024 / 1024).toFixed(2)} MB · .stl</p>
                </div>
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="ml-auto bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm transition-colors flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/50'
                }`}
              >
                <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <p className="text-gray-600 font-medium">Drop your .stl file here, or <span className="text-brand-600">click to browse</span></p>
                <p className="mt-1 text-sm text-gray-400">Only .stl files are accepted</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".stl"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
              Have a photo or drawing instead of an STL?{' '}
              <a
                href={STL_INSTRUCTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-semibold hover:underline"
              >
                AI STL Generator
              </a>{' '}
              can convert any image into a printable .stl file — then come back and upload it here.
            </p>
          </div>

          {/* Step 2: Configure */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">2 — Configure Your Print</h3>

            {/* Size selection */}
            <div className="mb-6">
              <label className="label">Size</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSelectedSize(s.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedSize === s.value
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-100 hover:border-brand-200'
                    }`}
                  >
                    <div className={`text-sm font-bold ${selectedSize === s.value ? 'text-brand-700' : 'text-gray-700'}`}>{s.label}</div>
                    <div className={`text-xs mt-0.5 ${selectedSize === s.value ? 'text-brand-500' : 'text-gray-400'}`}>{s.dimensions}</div>
                    <div className={`text-base font-extrabold mt-1 ${selectedSize === s.value ? 'text-brand-600' : 'text-gray-900'}`}>${s.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-6">
              <label className="label">Material</label>
              <div className="flex gap-3 flex-wrap">
                {MATERIALS.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setMaterial(m.name)}
                    className={`px-5 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                      material === m.name
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-100 text-gray-600 hover:border-brand-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="label" htmlFor="color">Color</label>
              <input
                id="color"
                type="text"
                value={color}
                readOnly
                disabled
                className="input-field bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="mt-1.5 text-xs text-gray-400">Only Black is available right now. Other colors coming soon.</p>
            </div>
          </div>

          {/* Dynamic price summary */}
          {selectedSize && (
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-brand-600 font-semibold">Order Summary</div>
                  <div className="text-gray-700 text-sm mt-1">
                    {SIZES.find(s => s.value === selectedSize)?.label} · {material} · {color}
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-brand-700">${currentPrice}</div>
              </div>
              {materialSurcharge > 0 && (
                <div className="mt-2 flex justify-end gap-4 text-xs text-gray-500">
                  <span>Base: ${basePrice}</span>
                  <span>Material: +${materialSurcharge}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact & Shipping */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">3 — Your Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label" htmlFor="name">Full Name</label>
                <input id="name" type="text" placeholder="Jane Smith" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label" htmlFor="email">Email Address</label>
                <input id="email" type="email" placeholder="jane@example.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="input-field" />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                rows={3}
                placeholder="123 Main St, Apt 4B&#10;Austin, TX 78701"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="input-field resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Submitting Order...
              </span>
            ) : (
              'Submit Order'
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Payment is not collected at this time — we'll reach out after reviewing your order.
          </p>
        </form>
      </div>
    </section>
  );
}
