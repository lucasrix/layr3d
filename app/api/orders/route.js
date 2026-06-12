import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get('image');
    const customerName = formData.get('customer_name');
    const customerEmail = formData.get('customer_email');
    const shippingAddress = formData.get('shipping_address');
    const material = formData.get('material');
    const color = formData.get('color');
    const size = formData.get('size');
    const price = parseFloat(formData.get('price'));

    // Validate required fields
    if (!customerName || !customerEmail || !shippingAddress || !material || !color || !size || !price) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const supabase = createServerClient();

    let imageUrl = null;
    let imageFilename = null;

    // Upload image to Supabase Storage if provided
    if (image && image.size > 0) {
      const ext = image.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('order-images')
        .upload(filename, buffer, {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 });
      }

      const { data: urlData } = supabase.storage
        .from('order-images')
        .getPublicUrl(uploadData.path);

      imageUrl = urlData.publicUrl;
      imageFilename = image.name;
    }

    // Save order to database
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
          price,
          image_url: imageUrl,
          image_filename: imageFilename,
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
