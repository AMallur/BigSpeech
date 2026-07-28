import Stripe from 'stripe'

export const runtime = 'nodejs'

// TODO: Add STRIPE_SECRET_KEY to your environment variables to verify real
// payments. Without it, only mock_ sessions (created in preview) are accepted.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get('session_id')
  if (!sessionId) {
    return Response.json({ unlocked: false, error: 'Missing session_id' }, { status: 400 })
  }

  // Preview mode: accept the mock sessions minted by the checkout route only
  // when no real Stripe key is configured.
  if (!STRIPE_SECRET_KEY) {
    return Response.json({ unlocked: sessionId.startsWith('mock_'), mock: true })
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return Response.json({ unlocked: session.payment_status === 'paid' })
  } catch (err) {
    console.log('[v0] Stripe verify error:', err)
    return Response.json({ unlocked: false, error: 'Verification failed' }, { status: 500 })
  }
}
