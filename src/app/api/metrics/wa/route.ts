import { NextResponse } from 'next/server'
import { addWaClick } from '@/lib/metrics'

export const runtime = 'nodejs'

export async function POST() {
  try {
    await addWaClick()
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg || 'failed' }, { status: 500 })
  }
}

