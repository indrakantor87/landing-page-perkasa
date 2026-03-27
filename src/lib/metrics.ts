import fs from 'fs/promises'
import path from 'path'

type Metrics = {
  visitsByDay: Record<string, number>
  waClicksByDay: Record<string, number>
  updatedAt: string
}

const metricsPath = path.join(process.cwd(), 'data', 'metrics.json')

async function ensureDir() {
  const dir = path.dirname(metricsPath)
  await fs.mkdir(dir, { recursive: true }).catch(() => {})
}

async function read(): Promise<Metrics> {
  try {
    const buf = await fs.readFile(metricsPath)
    const json = JSON.parse(buf.toString()) as Metrics
    return json
  } catch {
    return { visitsByDay: {}, waClicksByDay: {}, updatedAt: new Date().toISOString() }
  }
}

async function write(data: Metrics) {
  await ensureDir()
  const tmp = JSON.stringify({ ...data, updatedAt: new Date().toISOString() })
  await fs.writeFile(metricsPath, tmp)
}

function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export async function addVisit(date = new Date()) {
  const key = dayKey(date)
  const m = await read()
  m.visitsByDay[key] = (m.visitsByDay[key] ?? 0) + 1
  await write(m)
}

export async function addWaClick(date = new Date()) {
  const key = dayKey(date)
  const m = await read()
  m.waClicksByDay[key] = (m.waClicksByDay[key] ?? 0) + 1
  await write(m)
}

export async function getSummary(days = 30) {
  const m = await read()
  const out: Array<{ day: string; visits: number; waClicks: number }> = []
  for (let i = days - 1; i >= 0; i--) {
    const dt = new Date()
    dt.setDate(dt.getDate() - i)
    const key = dayKey(dt)
    out.push({
      day: key,
      visits: m.visitsByDay[key] ?? 0,
      waClicks: m.waClicksByDay[key] ?? 0,
    })
  }
  const totals = {
    visits: Object.values(m.visitsByDay).reduce((a, b) => a + b, 0),
    waClicks: Object.values(m.waClicksByDay).reduce((a, b) => a + b, 0),
  }
  return { days: out, totals, updatedAt: m.updatedAt }
}

export async function getRangeSummary(start: Date, end: Date) {
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  const m = await read()
  const out: Array<{ day: string; visits: number; waClicks: number }> = []
  if (isNaN(startTime) || isNaN(endTime) || startTime > endTime) {
    return { days: out, totals: { visits: 0, waClicks: 0 }, updatedAt: m.updatedAt }
  }
  const dayMs = 24 * 60 * 60 * 1000
  for (let t = startTime; t <= endTime; t += dayMs) {
    const dt = new Date(t)
    const key = dayKey(dt)
    out.push({
      day: key,
      visits: m.visitsByDay[key] ?? 0,
      waClicks: m.waClicksByDay[key] ?? 0,
    })
  }
  const totals = {
    visits: out.reduce((a, b) => a + b.visits, 0),
    waClicks: out.reduce((a, b) => a + b.waClicks, 0),
  }
  return { days: out, totals, updatedAt: m.updatedAt }
}
