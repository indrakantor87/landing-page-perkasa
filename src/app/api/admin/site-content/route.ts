import { NextResponse } from 'next/server'
import { isAdminAuthed } from '@/lib/admin-auth'
import { readSiteContent, writeSiteContent } from '@/lib/site-content'
import type { SiteContent } from '@/lib/site-content-shared'

export const runtime = 'nodejs'

export async function GET() {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const content = await readSiteContent()
  return NextResponse.json(content, { headers: { 'Cache-Control': 'no-store' } })
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = (await req.json().catch(() => null)) as SiteContent | null
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Body tidak valid' }, { status: 400 })
  await writeSiteContent(body)
  return NextResponse.json({ ok: true })
}
