import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'lp_admin'

function getSecret() {
  return (process.env.LP_ADMIN_SECRET ?? '').trim()
}

function hmac(exp: string) {
  const secret = getSecret()
  return crypto.createHmac('sha256', secret).update(exp).digest('hex')
}

export async function isAdminAuthed() {
  const secret = getSecret()
  if (!secret) return false
  const store = await cookies()
  const raw = store.get(COOKIE_NAME)?.value ?? ''
  const [exp, sig] = raw.split('.')
  if (!exp || !sig) return false
  const expMs = Number(exp)
  if (!Number.isFinite(expMs) || Date.now() > expMs) return false
  const expected = hmac(exp)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function setAdminCookie() {
  const exp = String(Date.now() + 1000 * 60 * 60 * 24 * 14)
  const sig = hmac(exp)
  const store = await cookies()
  store.set(COOKIE_NAME, `${exp}.${sig}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  })
}
