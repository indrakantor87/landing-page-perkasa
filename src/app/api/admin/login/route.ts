import { NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string }
  const password = String(body?.password ?? '')
  const expected = String(process.env.LP_ADMIN_PASSWORD ?? '')
  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 })
  }
  if (!process.env.LP_ADMIN_SECRET) {
    return NextResponse.json({ error: 'LP_ADMIN_SECRET belum di-set' }, { status: 500 })
  }
  await setAdminCookie()
  return NextResponse.json({ ok: true })
}
