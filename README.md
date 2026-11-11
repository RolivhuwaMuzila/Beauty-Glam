# MakeUpBy_Koki booking and shop

## Run it
1. Install Node.js (LTS) from nodejs.org.
2. Open this folder in VS Code, then Terminal > New Terminal.
3. `npm install`
4. Copy `.env.example` to `.env.local` and fill in every value.
5. Supabase > SQL Editor: paste `supabase/schema.sql` and press Run (once only).
6. `npm run dev` and open http://localhost:3000
7. Owner admin: http://localhost:3000/admin (the ADMIN_PASSWORD you chose).

## Go live
1. Push to GitHub, import the repo in Vercel, add the same environment variables.
2. Set NEXT_PUBLIC_SITE_URL to your live address.
3. Paystack > Settings > API Keys & Webhooks: set the webhook to https://YOURSITE/api/paystack/webhook
4. Test with sk_test_ keys and Paystack test cards. Switch to sk_live_ once her account is verified.
