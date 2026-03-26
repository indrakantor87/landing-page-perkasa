import { NextResponse } from 'next/server'
import { isAdminAuthed } from '@/lib/admin-auth'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export const runtime = 'nodejs'

function safeExt(name: string) {
  const ext = path.extname(name).toLowerCase()
  const ok = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']
  return ok.includes(ext) ? ext : ''
}

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const form = await req.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: 'Form tidak valid' }, { status: 400 })
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })

  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Hanya file gambar yang diizinkan' }, { status: 400 })
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'Ukuran file maksimal 8MB' }, { status: 400 })

  const ext = safeExt(file.name)
  if (!ext) return NextResponse.json({ error: 'Ekstensi file tidak didukung' }, { status: 400 })

  const bytes = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadDir, { recursive: true })
  const targetPath = path.join(uploadDir, fileName)
  await fs.writeFile(targetPath, bytes)

  return NextResponse.json({ ok: true, url: `/uploads/${fileName}` })
}
