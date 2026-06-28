import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customer_name: customerName,
      customer_email: customerEmail,
      shipping_address: shippingAddress,
      material,
      color,
      size,
      price,
      image_url: imageUrl,
      image_filename: imageFilename,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !shippingAddress || !material || !color || !size || !price) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Save order to database. The image was already uploaded directly to
    // Supabase Storage from the browser, so we just store its public URL here.
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerName,
          customer_email: customerEmail,
          shipping_address: shippingAddress,
          material,
          color,
          size,
          price: parseFloat(price),
          image_url: imageUrl || null,
          image_filename: imageFilename || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('DB insert error:', error);
      return NextResponse.json({ error: 'Failed to save order.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId: data.id }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
