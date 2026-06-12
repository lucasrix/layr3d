# layr3d — Setup Guide

Follow these steps to get layr3d live on Vercel with Supabase as your backend.

---

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com) and click **Start your project**
2. Sign up with GitHub or email
3. Click **New Project**
4. Choose a name (e.g. `layr3d`), set a strong database password, and pick the region closest to you
5. Wait ~2 minutes for the project to provision

---

## Step 2: Create the Orders Table

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New Query** and paste the following SQL, then click **Run**:

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  material TEXT NOT NULL,
  color TEXT NOT NULL,
  size TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  image_filename TEXT,
  status TEXT DEFAULT 'pending'
);
```

---

## Step 3: Create the Image Storage Bucket

1. In the left sidebar, click **Storage**
2. Click **New bucket**
3. Name it exactly: `order-images`
4. Toggle **Public bucket** ON (so image URLs work without auth)
5. Click **Save**

Next, set the upload policy so the API can write files:

1. Still in Storage, click **Policies** (top right)
2. Under `order-images`, click **New Policy**
3. Choose **For full customization**
4. Set:
   - **Policy name**: `service-role-upload`
   - **Allowed operation**: INSERT
   - **Target roles**: `service_role`
   - **USING expression**: `true`
5. Click **Review** then **Save policy**

---

## Step 4: Get Your API Keys

1. In the left sidebar, go to **Project Settings → API**
2. Copy the following three values — you'll need them in the next steps:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role / secret key** → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Keep the service_role key secret — never commit it to git or expose it in the browser.

---

## Step 5: Run Locally (Optional)

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.local.example .env.local

# 3. Open .env.local and paste in your three keys from Step 4

# 4. Start the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to verify everything works.

---

## Step 6: Deploy to Vercel

1. Push your project to a GitHub repository (or fork it)
2. Go to [https://vercel.com](https://vercel.com) and sign in
3. Click **Add New → Project**
4. Import your GitHub repository
5. Before clicking **Deploy**, click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key |

6. Click **Deploy** — Vercel will build and host your site automatically

Your site will be live at `https://your-project-name.vercel.app` within ~2 minutes.

---

## Viewing Orders

To see submitted orders, go to your Supabase project → **Table Editor → orders**. Each row is a customer order with their name, email, shipping address, material, size, price, and a link to their uploaded image.

---

## Next Steps (When You're Ready)

- **Add payment**: Integrate [Stripe Checkout](https://stripe.com/docs/checkout/quickstart) for payment collection
- **Email notifications**: Use [Resend](https://resend.com) to email yourself when a new order comes in
- **Custom domain**: Add your domain in Vercel → Project Settings → Domains
- **Admin dashboard**: Build a password-protected `/admin` page to manage and update order status
