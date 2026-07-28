import Stripe from 'stripe'

export const runtime = 'nodejs'

// TODO: Add STRIPE_SECRET_KEY to your environment variables to enable real
// Stripe Checkout. Without it, the route returns a mock session so the unlock
// flow is fully clickable in preview.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const PRICE_CENTS = 1299 // $12.99
const PRODUCT_NAME = 'Speech Unlock'

export async function POST(req: Request) {
  const origin =
    req.headers.get('origin') ?? new URL(req.url).origin ?? 'http://localhost:3000'

  // Fallback: no Stripe key -> hand back a mock session id the client can use
  // to simulate the success redirect and unlock the speech in preview.
  if (!STRIPE_SECRET_KEY) {
    const mockId = `mock_${Math.random().toString(36).slice(2)}`
    return Response.json({
      mock: true,
      sessionId: mockId,
      url: `${origin}/success?session_id=${mockId}`,
    })
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: PRICE_CENTS,
            product_data: {
              name: PRODUCT_NAME,
              description: 'Unlock your full personalized speech + PDF download.',
            },
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/result?canceled=1`,
    })

    return Response.json({ mock: false, sessionId: session.id, url: session.url })
  } catch (err) {
    console.log('[v0] Stripe checkout error:', err)
    return new Response('Unable to create checkout session', { status: 500 })
  }
}
