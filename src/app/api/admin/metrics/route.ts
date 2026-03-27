import { NextResponse } from 'next/server'
import { getSummary, getRangeSummary } from '@/lib/metrics'
import { isAdminAuthed } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const url = new URL(req.url)
  const start = url.searchParams.get('start')
  const end = url.searchParams.get('end')
  let data
  if (start && end) {
    const s = new Date(start)
    const e = new Date(end)
    data = await getRangeSummary(s, e)
  } else {
    const days = Math.max(1, Math.min(365, parseInt(url.searchParams.get('days') || '30')))
    data = await getSummary(days)
  }
  return NextResponse.json(data)
}
