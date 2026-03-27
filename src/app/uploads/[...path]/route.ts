import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { constants as fsConstants } from 'fs'

export const runtime = 'nodejs'

function mime(ext: string) {
  switch (ext.toLowerCase()) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  try {
    const p = await ctx.params
    const segs = Array.isArray(p?.path) ? p.path : []
    if (segs.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const rel = segs.join('/')
    if (!/^[a-zA-Z0-9._\-\/]+$/.test(rel) || rel.includes('..')) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, rel)
    const relCheck = path.relative(uploadDir, filePath)
    if (relCheck.startsWith('..')) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    await fs.access(filePath, fsConstants.R_OK).catch(() => {
      throw new Error('NOT_FOUND')
    })
    const ext = path.extname(filePath)
    const buf = await fs.readFile(filePath)
    return new Response(buf, {
      headers: {
        'Content-Type': mime(ext),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
