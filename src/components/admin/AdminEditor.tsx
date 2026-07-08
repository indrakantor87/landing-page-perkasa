'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SiteContent } from '@/lib/site-content-shared'
type MetricsSummary = {
  days: Array<{ day: string; visits: number; waClicks: number }>
  totals: { visits: number; waClicks: number }
  updatedAt: string
}

type AdminTab = 'hero' | 'popup' | 'packages' | 'testimonials' | 'sections' | 'features' | 'company' | 'footer' | 'advanced'

type PopupBanner = {
  active: boolean
  imageUrl: string
  delayMs: number
}

type Testimonial = {
  name: string
  role: string
  text: string
  rating: number
  avatar: string
}

type Plan = {
  name: string
  speed: string
  price: string
  features: string[]
  popular?: boolean
}

type PackageConfig = {
  title: string
  desc: string
  icon: string
  plans: Plan[]
}

function asStringArray(v: unknown) {
  return Array.isArray(v) ? v.map((x) => String(x)) : []
}

function asNumber(v: unknown, fallback: number) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function asRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === 'object' ? (v as Record<string, unknown>) : {}
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: 'text' | 'number'
}) {
  return (
    <label className="block space-y-2">
      <div className="text-xs font-bold text-white/70">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-perkasa-blue/60"
      />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <label className="block space-y-2">
      <div className="text-xs font-bold text-white/70">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-perkasa-blue/60"
      />
    </label>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
      <span className="text-sm font-semibold text-white/80">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-white/20 bg-black/40"
      />
    </label>
  )
}

export default function AdminEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jsonText, setJsonText] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [content, setContent] = useState<SiteContent | null>(null)
  const [tab, setTab] = useState<AdminTab>('hero')
  const [activePackageKey, setActivePackageKey] = useState<string>('home')
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null)
  const [metricsError, setMetricsError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 29)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${dd}`
  })
  const [endDate, setEndDate] = useState(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${dd}`
  })

  const parsed = useMemo(() => {
    try {
      return JSON.parse(jsonText) as SiteContent
    } catch {
      return null
    }
  }, [jsonText])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('/api/admin/site-content', { cache: 'no-store', signal: controller.signal })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}))
        if (r.status === 401) {
          router.push('/admin/login')
          router.refresh()
          return
        }
        if (!r.ok) throw new Error(data?.error ?? 'Gagal memuat konten')
        setContent(data as SiteContent)
        setJsonText(JSON.stringify(data, null, 2))
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return
        setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [router])

  useEffect(() => {
    const controller = new AbortController()
    setMetricsError(null)
    fetch(`/api/admin/metrics?start=${startDate}&end=${endDate}`, { cache: 'no-store', signal: controller.signal })
      .then(async (r) => {
        if (r.status === 401) return
        const data = (await r.json().catch(() => null)) as { error?: string } | MetricsSummary | null
        if (!r.ok) {
          const message = data && typeof data === 'object' && 'error' in data ? String(data.error ?? '') : ''
          throw new Error(message || 'Gagal memuat statistik')
        }
        setMetrics(data as MetricsSummary)
      })
      .catch((e: unknown) => setMetricsError(e instanceof Error ? e.message : String(e)))
    return () => controller.abort()
  }, [startDate, endDate])

  const exportExcel = () => {
    if (!metrics) return
    const header = `<tr><th style="text-align:left">Tanggal</th><th style="text-align:right">Kunjungan</th><th style="text-align:right">Klik WA</th></tr>`
    const body = metrics.days
      .map((d) => `<tr><td>${d.day}</td><td style="text-align:right">${d.visits}</td><td style="text-align:right">${d.waClicks}</td></tr>`)
      .join('')
    const totals = `<tr><td><b>Total</b></td><td style="text-align:right"><b>${metrics.totals.visits}</b></td><td style="text-align:right"><b>${metrics.totals.waClicks}</b></td></tr>`
    const html =
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>` +
      `<table border="1" cellspacing="0" cellpadding="4">${header}${body}${totals}</table>` +
      `</body></html>`
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `metrics_${startDate}_to_${endDate}.xls`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    router.push('/admin/login')
    router.refresh()
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      const payload = content ?? parsed
      if (!payload) throw new Error('Konten belum siap')
      const r = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await r.json().catch(() => ({}))
      if (r.status === 401) {
        router.push('/admin/login')
        router.refresh()
        return
      }
      if (!r.ok) throw new Error(data?.error ?? 'Gagal menyimpan')
      setJsonText(JSON.stringify(payload, null, 2))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setSaving(false)
    }
  }

  const onUpload = async (file: File, applyUrl?: (url: string) => void) => {
    setUploading(true)
    setUploadUrl(null)
    setError(null)
    try {
      const fd = new FormData()
      fd.set('file', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const contentType = r.headers.get('content-type') ?? ''
      const data = contentType.includes('application/json') ? await r.json().catch(() => null) : null
      const text = !data ? await r.text().catch(() => '') : ''
      if (r.status === 401) {
        router.push('/admin/login')
        router.refresh()
        return
      }
      if (!r.ok) {
        const msg = (data && typeof data === 'object' && 'error' in data ? String((data as { error?: unknown }).error) : '') || text || `Gagal upload (HTTP ${r.status})`
        throw new Error(msg)
      }
      const url = String((data as { url?: unknown } | null)?.url ?? '')
      setUploadUrl(url)
      if (url) navigator.clipboard?.writeText(url).catch(() => {})
      if (url && applyUrl) applyUrl(url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setUploading(false)
    }
  }

  const applyJsonToForm = () => {
    if (!parsed) {
      setError('JSON tidak valid')
      return
    }
    setContent(parsed)
    setError(null)
  }

  const syncFormToJson = () => {
    if (!content) return
    setJsonText(JSON.stringify(content, null, 2))
  }

  const setPopupBanner = (next: PopupBanner) => {
    setContent((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        popupBanner: next,
      } as SiteContent
    })
  }

  const setHero = (updater: (hero: SiteContent['hero']) => SiteContent['hero']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, hero: updater(prev.hero) }
    })
  }

  const setNavigation = (updater: (navigation: SiteContent['navigation']) => SiteContent['navigation']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, navigation: updater(prev.navigation) }
    })
  }

  const setPackages = (updater: (packages: SiteContent['packages']) => SiteContent['packages']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, packages: updater(prev.packages) }
    })
  }

  const setTestimonials = (updater: (testimonials: SiteContent['testimonials']) => SiteContent['testimonials']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, testimonials: updater(prev.testimonials) }
    })
  }

  const setFeatures = (updater: (features: SiteContent['features']) => SiteContent['features']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, features: updater(prev.features) }
    })
  }

  const setFooter = (updater: (footer: SiteContent['footer']) => SiteContent['footer']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, footer: updater(prev.footer) }
    })
  }

  const setCompany = (updater: (company: SiteContent['company']) => SiteContent['company']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, company: updater(prev.company) }
    })
  }

  const setPricingSection = (updater: (section: SiteContent['pricingSection']) => SiteContent['pricingSection']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, pricingSection: updater(prev.pricingSection) }
    })
  }

  const setPackageSection = (updater: (section: SiteContent['packageSection']) => SiteContent['packageSection']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, packageSection: updater(prev.packageSection) }
    })
  }

  const setTestimonialSection = (updater: (section: SiteContent['testimonialSection']) => SiteContent['testimonialSection']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, testimonialSection: updater(prev.testimonialSection) }
    })
  }

  const setFaqSection = (updater: (section: SiteContent['faqSection']) => SiteContent['faqSection']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, faqSection: updater(prev.faqSection) }
    })
  }

  const setCtaSection = (updater: (section: SiteContent['ctaSection']) => SiteContent['ctaSection']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, ctaSection: updater(prev.ctaSection) }
    })
  }

  const setAboutSection = (updater: (section: SiteContent['aboutSection']) => SiteContent['aboutSection']) => {
    setContent((prev) => {
      if (!prev) return prev
      return { ...prev, aboutSection: updater(prev.aboutSection) }
    })
  }

  const packageKeys = useMemo(() => {
    if (!content) return []
    return Object.keys(content.packages)
  }, [content])

  useEffect(() => {
    if (packageKeys.length === 0) return
    if (packageKeys.includes(activePackageKey)) return
    setActivePackageKey(packageKeys[0])
  }, [activePackageKey, packageKeys])

  const currentPopup = useMemo<PopupBanner>(() => {
    const pb = (content as unknown as { popupBanner?: Partial<PopupBanner> } | null)?.popupBanner
    return {
      active: Boolean(pb?.active ?? true),
      imageUrl: String(pb?.imageUrl ?? '/pop%20up%20banner.jpeg'),
      delayMs: asNumber(pb?.delayMs, 600),
    }
  }, [content])

  const currentPkg = useMemo<PackageConfig | null>(() => {
    if (!content) return null
    const raw = (content.packages as Record<string, unknown>)[activePackageKey] as Partial<PackageConfig> | undefined
    if (!raw) return null
    return {
      title: String(raw.title ?? ''),
      desc: String(raw.desc ?? ''),
      icon: String(raw.icon ?? 'Home'),
      plans: Array.isArray(raw.plans)
        ? raw.plans.map((p) => ({
            name: String(asRecord(p).name ?? ''),
            speed: String(asRecord(p).speed ?? ''),
            price: String(asRecord(p).price ?? ''),
            features: asStringArray(asRecord(p).features),
            popular: Boolean(asRecord(p).popular ?? false) || undefined,
          }))
        : [],
    }
  }, [activePackageKey, content])

  const updateCurrentPackage = (next: PackageConfig) => {
    setPackages((prev) => {
      const m = { ...(prev as Record<string, unknown>) }
      m[activePackageKey] = next
      return m as unknown as SiteContent['packages']
    })
  }

  const currentTestimonials = useMemo<Testimonial[]>(() => {
    if (!content) return []
    return (content.testimonials ?? []).map((t) => ({
      name: String(t.name ?? ''),
      role: String(t.role ?? ''),
      text: String(t.text ?? ''),
      rating: asNumber(t.rating, 5),
      avatar: String(t.avatar ?? ''),
    }))
  }, [content])

  useEffect(() => {
    if (currentTestimonials.length === 0) return
    if (activeTestimonialIndex >= 0 && activeTestimonialIndex < currentTestimonials.length) return
    setActiveTestimonialIndex(0)
  }, [activeTestimonialIndex, currentTestimonials.length])

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4 relative z-20">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow">Admin Editor</h1>
            <p className="text-sm text-white/95 mt-1 drop-shadow">Update teks dan gambar landing page</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/70 bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80 hover:border-white transition cursor-pointer pointer-events-auto"
            >
              Lihat Web
            </Link>
            <button
              onClick={logout}
              className="rounded-lg border border-white/70 bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80 hover:border-white transition cursor-pointer pointer-events-auto"
            >
              Logout
            </button>
          </div>
        </div>

        {error && <div className="rounded-lg bg-red-500/10 text-red-200 border border-red-500/30 px-3 py-2 text-sm">{error}</div>}

        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold">Statistik Web</div>
              <div className="text-xs text-white/60">Kunjungan dan klik WhatsApp (30 hari)</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-white"
              />
              <span className="text-xs text-white/60">s/d</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-white"
              />
              <button
                onClick={exportExcel}
                disabled={!metrics}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold hover:bg-black/40 transition disabled:opacity-60"
              >
                Export Excel
              </button>
            </div>
          </div>
          {metricsError && <div className="text-xs text-amber-200">{metricsError}</div>}
          {!metrics ? (
            <div className="text-sm text-white/70">Memuat...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">Total Kunjungan</div>
                <div className="text-2xl font-bold">{metrics.totals.visits}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">Total Klik WA</div>
                <div className="text-2xl font-bold">{metrics.totals.waClicks}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">Rasio Klik</div>
                <div className="text-2xl font-bold">
                  {metrics.totals.visits ? Math.round((metrics.totals.waClicks / metrics.totals.visits) * 100) : 0}%
                </div>
              </div>
              <div className="md:col-span-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60 mb-2">30 Hari Terakhir</div>
                <div className="flex items-end gap-1 h-28">
                  {metrics.days.map((d) => {
                    const v = d.visits
                    const w = d.waClicks
                    const maxV = Math.max(...metrics.days.map(x => x.visits), 1)
                    const maxW = Math.max(...metrics.days.map(x => x.waClicks), 1)
                    const hv = Math.max(2, Math.round((v / maxV) * 80))
                    const hw = Math.max(2, Math.round((w / maxW) * 80))
                    return (
                      <div key={d.day} className="flex flex-col items-center gap-0.5">
                        <div className="flex items-end gap-0.5">
                          <div className="w-2 bg-blue-500" style={{ height: hv }} title={`Visits ${v}`} />
                          <div className="w-2 bg-green-500" style={{ height: hw }} title={`WA ${w}`} />
                        </div>
                        <div className="text-[10px] text-white/60">{d.day.slice(5)}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold">Upload Gambar</div>
              <div className="text-xs text-white/60">Hasilnya otomatis dicopy ke clipboard</div>
            </div>
            {uploadUrl && <div className="text-xs text-white/70 break-all">{uploadUrl}</div>}
          </div>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onUpload(f)
              e.currentTarget.value = ''
            }}
            className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-perkasa-blue file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:brightness-110 file:cursor-pointer"
          />
          {uploading && <div className="text-xs text-white/60">Mengupload...</div>}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(['hero', 'popup', 'packages', 'testimonials', 'sections', 'features', 'company', 'footer'] as AdminTab[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    tab === k ? 'bg-perkasa-blue text-white' : 'border border-white/10 bg-black/30 text-white/80 hover:bg-black/40'
                  }`}
                >
                  {k === 'hero'
                    ? 'Hero'
                    : k === 'popup'
                      ? 'Popup Banner'
                      : k === 'packages'
                        ? 'Packages'
                        : k === 'testimonials'
                          ? 'Testimonials'
                          : k === 'sections'
                            ? 'Section Copy'
                            : k === 'features'
                              ? 'Fitur'
                              : k === 'company'
                                ? 'Company'
                                : 'Footer'}
                </button>
              ))}
            </div>
            <button
              onClick={save}
              disabled={saving || loading || !content}
              className="rounded-lg bg-perkasa-red px-4 py-2 text-sm font-bold text-white disabled:opacity-60 hover:brightness-110 transition"
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>

          {loading || !content ? (
            <div className="text-sm text-white/70">Memuat...</div>
          ) : (
            <div className="space-y-5">
              {tab === 'popup' && (
                <div className="space-y-4">
                  <Toggle label="Aktifkan Popup Banner" checked={currentPopup.active} onChange={(v) => setPopupBanner({ ...currentPopup, active: v })} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Image URL" value={currentPopup.imageUrl} onChange={(v) => setPopupBanner({ ...currentPopup, imageUrl: v })} placeholder="/uploads/..." />
                    <Field
                      label="Delay (ms)"
                      type="number"
                      value={String(currentPopup.delayMs)}
                      onChange={(v) => setPopupBanner({ ...currentPopup, delayMs: asNumber(v, 600) })}
                      placeholder="600"
                    />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-2">
                    <div className="text-sm font-bold">Upload Gambar Popup</div>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) onUpload(f, (url) => setPopupBanner({ ...currentPopup, imageUrl: url }))
                        e.currentTarget.value = ''
                      }}
                      className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-perkasa-blue file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:brightness-110 file:cursor-pointer"
                    />
                    {uploading && <div className="text-xs text-white/60">Mengupload...</div>}
                  </div>
                  {uploadUrl && (
                    <button
                      onClick={() => setPopupBanner({ ...currentPopup, imageUrl: uploadUrl })}
                      className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
                    >
                      Pakai URL Terakhir untuk Popup Banner
                    </button>
                  )}
                </div>
              )}

              {tab === 'hero' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Badge" value={String(content.hero.badge ?? '')} onChange={(v) => setHero((h) => ({ ...h, badge: v }))} />
                    <Field label="Title 1" value={String(content.hero.title.first ?? '')} onChange={(v) => setHero((h) => ({ ...h, title: { ...h.title, first: v } }))} />
                    <Field label="Title 2" value={String(content.hero.title.second ?? '')} onChange={(v) => setHero((h) => ({ ...h, title: { ...h.title, second: v } }))} />
                    <Field label="Title 3" value={String(content.hero.title.third ?? '')} onChange={(v) => setHero((h) => ({ ...h, title: { ...h.title, third: v } }))} />
                  </div>
                  <TextArea label="Subtitle" value={String(content.hero.subtitle ?? '')} onChange={(v) => setHero((h) => ({ ...h, subtitle: v }))} rows={3} />
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-bold">Slides</div>
                      <div className="flex items-center gap-2">
                        {uploadUrl && (
                          <button
                            onClick={() =>
                              setHero((h) => ({
                                ...h,
                                slides: [...(h.slides ?? []), uploadUrl],
                              }))
                            }
                            className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                          >
                            Tambah URL Terakhir
                          </button>
                        )}
                        <label className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            onChange={(e) => {
                              const f = e.target.files?.[0]
                              if (f)
                                onUpload(f, (url) =>
                                  setHero((h) => ({
                                    ...h,
                                    slides: [...(h.slides ?? []), url],
                                  }))
                                )
                              e.currentTarget.value = ''
                            }}
                            className="hidden"
                          />
                          Upload Slide
                        </label>
                        <button
                          onClick={() => setHero((h) => ({ ...h, slides: [...(h.slides ?? []), '/hero-new.png'] }))}
                          className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                        >
                          Tambah Slide
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {(content.hero.slides ?? []).map((s, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            value={String(s)}
                            onChange={(e) =>
                              setHero((h) => {
                                const next = [...(h.slides ?? [])]
                                next[idx] = e.target.value
                                return { ...h, slides: next }
                              })
                            }
                            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-perkasa-blue/60"
                          />
                          <label className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition cursor-pointer whitespace-nowrap">
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploading}
                              onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (f)
                                  onUpload(f, (url) =>
                                    setHero((h) => {
                                      const next = [...(h.slides ?? [])]
                                      next[idx] = url
                                      return { ...h, slides: next }
                                    })
                                  )
                                e.currentTarget.value = ''
                              }}
                              className="hidden"
                            />
                            Upload
                          </label>
                          <button
                            onClick={() =>
                              setHero((h) => {
                                const next = [...(h.slides ?? [])]
                                next.splice(idx, 1)
                                return { ...h, slides: next }
                              })
                            }
                            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'packages' && currentPkg && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {packageKeys.map((k) => (
                      <button
                        key={k}
                        onClick={() => setActivePackageKey(k)}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          activePackageKey === k ? 'bg-perkasa-blue text-white' : 'border border-white/10 bg-black/30 text-white/80 hover:bg-black/40'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Title" value={currentPkg.title} onChange={(v) => updateCurrentPackage({ ...currentPkg, title: v })} />
                    <Field label="Icon" value={currentPkg.icon} onChange={(v) => updateCurrentPackage({ ...currentPkg, icon: v })} placeholder="Home / Building2 / Coffee / ..." />
                  </div>
                  <TextArea label="Deskripsi" value={currentPkg.desc} onChange={(v) => updateCurrentPackage({ ...currentPkg, desc: v })} rows={2} />
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-bold">Plans</div>
                      <button
                        onClick={() =>
                          updateCurrentPackage({
                            ...currentPkg,
                            plans: [
                              ...currentPkg.plans,
                              { name: 'PLAN BARU', speed: '0 Mbps', price: '0', features: [] },
                            ],
                          })
                        }
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                      >
                        Tambah Plan
                      </button>
                    </div>
                    <div className="space-y-4">
                      {currentPkg.plans.map((p, idx) => (
                        <div key={idx} className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-bold">{p.name || `Plan ${idx + 1}`}</div>
                            <button
                              onClick={() => updateCurrentPackage({ ...currentPkg, plans: currentPkg.plans.filter((_, i) => i !== idx) })}
                              className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                            >
                              Hapus
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Field
                              label="Nama"
                              value={p.name}
                              onChange={(v) => {
                                const next = [...currentPkg.plans]
                                next[idx] = { ...next[idx], name: v }
                                updateCurrentPackage({ ...currentPkg, plans: next })
                              }}
                            />
                            <Field
                              label="Speed"
                              value={p.speed}
                              onChange={(v) => {
                                const next = [...currentPkg.plans]
                                next[idx] = { ...next[idx], speed: v }
                                updateCurrentPackage({ ...currentPkg, plans: next })
                              }}
                            />
                            <Field
                              label="Price"
                              value={p.price}
                              onChange={(v) => {
                                const next = [...currentPkg.plans]
                                next[idx] = { ...next[idx], price: v }
                                updateCurrentPackage({ ...currentPkg, plans: next })
                              }}
                            />
                          </div>
                          <Toggle
                            label="Popular"
                            checked={Boolean(p.popular)}
                            onChange={(v) => {
                              const next = [...currentPkg.plans]
                              next[idx] = { ...next[idx], popular: v || undefined }
                              updateCurrentPackage({ ...currentPkg, plans: next })
                            }}
                          />
                          <TextArea
                            label="Features (1 baris = 1 item)"
                            value={p.features.join('\n')}
                            onChange={(v) => {
                              const next = [...currentPkg.plans]
                              next[idx] = {
                                ...next[idx],
                                features: v
                                  .split('\n')
                                  .map((x) => x.trim())
                                  .filter(Boolean),
                              }
                              updateCurrentPackage({ ...currentPkg, plans: next })
                            }}
                            rows={4}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'sections' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Navigasi</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Label Beranda" value={String(content.navigation.homeLabel ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, homeLabel: v }))} />
                      <Field label="Label Tentang" value={String(content.navigation.aboutLabel ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, aboutLabel: v }))} />
                      <Field label="Label Paket" value={String(content.navigation.packagesLabel ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, packagesLabel: v }))} />
                      <Field label="Label FAQ" value={String(content.navigation.faqLabel ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, faqLabel: v }))} />
                      <Field label="Label Kontak" value={String(content.navigation.contactLabel ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, contactLabel: v }))} />
                      <Field label="Label Tombol Utama" value={String(content.navigation.primaryCtaLabel ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, primaryCtaLabel: v }))} />
                      <Field label="Link Tombol Utama" value={String(content.navigation.primaryCtaHref ?? '')} onChange={(v) => setNavigation((nav) => ({ ...nav, primaryCtaHref: v }))} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Section Pricing</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Judul Pricing" value={String(content.pricingSection.title ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, title: v }))} />
                      <Field label="Highlight Pricing" value={String(content.pricingSection.highlight ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, highlight: v }))} />
                      <Field label="Badge Popular" value={String(content.pricingSection.popularBadge ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, popularBadge: v }))} />
                      <Field label="Label Tombol" value={String(content.pricingSection.ctaLabel ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, ctaLabel: v }))} />
                      <Field label="Label Hubungi Kami" value={String(content.pricingSection.callUsLabel ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, callUsLabel: v }))} />
                    </div>
                    <TextArea label="Deskripsi Pricing" value={String(content.pricingSection.description ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, description: v }))} rows={3} />
                    <TextArea label="Disclaimer Pricing" value={String(content.pricingSection.disclaimer ?? '')} onChange={(v) => setPricingSection((section) => ({ ...section, disclaimer: v }))} rows={3} />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Section Detail Paket</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Badge Popular" value={String(content.packageSection.popularBadge ?? '')} onChange={(v) => setPackageSection((section) => ({ ...section, popularBadge: v }))} />
                      <Field label="Label Tombol" value={String(content.packageSection.ctaLabel ?? '')} onChange={(v) => setPackageSection((section) => ({ ...section, ctaLabel: v }))} />
                      <Field label="Label Hubungi Kami" value={String(content.packageSection.callUsLabel ?? '')} onChange={(v) => setPackageSection((section) => ({ ...section, callUsLabel: v }))} />
                    </div>
                    <TextArea label="Disclaimer Detail Paket" value={String(content.packageSection.disclaimer ?? '')} onChange={(v) => setPackageSection((section) => ({ ...section, disclaimer: v }))} rows={3} />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Section Testimonials</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Judul" value={String(content.testimonialSection.title ?? '')} onChange={(v) => setTestimonialSection((section) => ({ ...section, title: v }))} />
                      <Field label="Highlight" value={String(content.testimonialSection.highlight ?? '')} onChange={(v) => setTestimonialSection((section) => ({ ...section, highlight: v }))} />
                    </div>
                    <TextArea label="Deskripsi" value={String(content.testimonialSection.description ?? '')} onChange={(v) => setTestimonialSection((section) => ({ ...section, description: v }))} rows={3} />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Section FAQ</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Judul" value={String(content.faqSection.title ?? '')} onChange={(v) => setFaqSection((section) => ({ ...section, title: v }))} />
                      <Field label="Highlight" value={String(content.faqSection.highlight ?? '')} onChange={(v) => setFaqSection((section) => ({ ...section, highlight: v }))} />
                    </div>
                    <TextArea label="Deskripsi" value={String(content.faqSection.description ?? '')} onChange={(v) => setFaqSection((section) => ({ ...section, description: v }))} rows={3} />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Section CTA</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Judul" value={String(content.ctaSection.title ?? '')} onChange={(v) => setCtaSection((section) => ({ ...section, title: v }))} />
                      <Field label="Highlight" value={String(content.ctaSection.highlight ?? '')} onChange={(v) => setCtaSection((section) => ({ ...section, highlight: v }))} />
                      <Field label="Label Tombol" value={String(content.ctaSection.buttonLabel ?? '')} onChange={(v) => setCtaSection((section) => ({ ...section, buttonLabel: v }))} />
                    </div>
                    <TextArea label="Deskripsi CTA" value={String(content.ctaSection.description ?? '')} onChange={(v) => setCtaSection((section) => ({ ...section, description: v }))} rows={3} />
                    <TextArea label="Pesan WhatsApp CTA" value={String(content.ctaSection.buttonMessage ?? '')} onChange={(v) => setCtaSection((section) => ({ ...section, buttonMessage: v }))} rows={2} />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Section About</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Judul About" value={String(content.aboutSection.title ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, title: v }))} />
                      <Field label="Highlight About" value={String(content.aboutSection.highlight ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, highlight: v }))} />
                      <Field label="Label Tahun Berdiri" value={String(content.aboutSection.foundedLabel ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, foundedLabel: v }))} />
                      <Field label="Label Pelanggan" value={String(content.aboutSection.customersLabel ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, customersLabel: v }))} />
                      <Field label="Status Legal" value={String(content.aboutSection.legalStatusTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, legalStatusTitle: v }))} />
                      <Field label="Deskripsi Legal" value={String(content.aboutSection.legalStatusDescription ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, legalStatusDescription: v }))} />
                      <Field label="Judul Visi Misi" value={String(content.aboutSection.visionMissionTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, visionMissionTitle: v }))} />
                      <Field label="Label Visi" value={String(content.aboutSection.visionTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, visionTitle: v }))} />
                      <Field label="Label Misi" value={String(content.aboutSection.missionTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, missionTitle: v }))} />
                      <Field label="Judul Legalitas" value={String(content.aboutSection.legalTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, legalTitle: v }))} />
                      <Field label="Judul Kontak" value={String(content.aboutSection.contactTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, contactTitle: v }))} />
                      <Field label="Judul Alamat" value={String(content.aboutSection.addressTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, addressTitle: v }))} />
                      <Field label="Label Link Maps" value={String(content.aboutSection.mapsLabel ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, mapsLabel: v }))} />
                      <Field label="Judul Telepon" value={String(content.aboutSection.phoneTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, phoneTitle: v }))} />
                      <Field label="Judul Email" value={String(content.aboutSection.emailTitle ?? '')} onChange={(v) => setAboutSection((section) => ({ ...section, emailTitle: v }))} />
                    </div>
                  </div>
                </div>
              )}

              {tab === 'features' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Judul" value={String(content.features.title ?? '')} onChange={(v) => setFeatures((features) => ({ ...features, title: v }))} />
                    <Field label="Highlight" value={String(content.features.highlight ?? '')} onChange={(v) => setFeatures((features) => ({ ...features, highlight: v }))} />
                    <Field label="Deskripsi" value={String(content.features.description ?? '')} onChange={(v) => setFeatures((features) => ({ ...features, description: v }))} />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-bold">Item Fitur</div>
                      <button
                        onClick={() =>
                          setFeatures((features) => ({
                            ...features,
                            items: [
                              ...(features.items ?? []),
                              {
                                title: 'Fitur Baru',
                                description: 'Deskripsi fitur baru',
                                icon: 'Home',
                                color: 'text-perkasa-red',
                                colSpan: 'md:col-span-1',
                                bg: 'bg-red-900/10',
                                border: 'hover:border-red-500/50',
                              },
                            ],
                          }))
                        }
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                      >
                        Tambah Fitur
                      </button>
                    </div>
                    <div className="space-y-4">
                      {content.features.items.map((item, idx) => (
                        <div key={`${item.title}-${idx}`} className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-bold">{item.title || `Fitur ${idx + 1}`}</div>
                            <button
                              onClick={() =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.filter((_, i) => i !== idx),
                                }))
                              }
                              className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                            >
                              Hapus
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field
                              label="Judul"
                              value={String(item.title ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, title: v } : feature)),
                                }))
                              }
                            />
                            <Field
                              label="Icon"
                              value={String(item.icon ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, icon: v } : feature)),
                                }))
                              }
                            />
                            <Field
                              label="Color Class"
                              value={String(item.color ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, color: v } : feature)),
                                }))
                              }
                            />
                            <Field
                              label="ColSpan Class"
                              value={String(item.colSpan ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, colSpan: v } : feature)),
                                }))
                              }
                            />
                            <Field
                              label="Background Class"
                              value={String(item.bg ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, bg: v } : feature)),
                                }))
                              }
                            />
                            <Field
                              label="Border Class"
                              value={String(item.border ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, border: v } : feature)),
                                }))
                              }
                            />
                            <Field
                              label="Link (opsional)"
                              value={String((item as { href?: string }).href ?? '')}
                              onChange={(v) =>
                                setFeatures((features) => ({
                                  ...features,
                                  items: features.items.map((feature, i) => (i === idx ? { ...feature, href: v || undefined } : feature)),
                                }))
                              }
                            />
                          </div>
                          <TextArea
                            label="Deskripsi"
                            value={String(item.description ?? '')}
                            onChange={(v) =>
                              setFeatures((features) => ({
                                ...features,
                                items: features.items.map((feature, i) => (i === idx ? { ...feature, description: v } : feature)),
                              }))
                            }
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'testimonials' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {currentTestimonials.map((t, idx) => (
                      <button
                        key={`${t.name}-${idx}`}
                        onClick={() => setActiveTestimonialIndex(idx)}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          activeTestimonialIndex === idx ? 'bg-perkasa-blue text-white' : 'border border-white/10 bg-black/30 text-white/80 hover:bg-black/40'
                        }`}
                      >
                        {t.name || `Testimonial ${idx + 1}`}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setTestimonials((prev) => [
                          ...prev,
                          { name: 'Nama', role: 'Pelanggan', text: '', rating: 5, avatar: '' },
                        ])
                      }
                      className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
                    >
                      Tambah
                    </button>
                  </div>

                  {currentTestimonials[activeTestimonialIndex] && (
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold">Edit Testimonial</div>
                        <button
                          onClick={() => setTestimonials((prev) => prev.filter((_, i) => i !== activeTestimonialIndex))}
                          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
                        >
                          Hapus
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field
                          label="Nama"
                          value={currentTestimonials[activeTestimonialIndex].name}
                          onChange={(v) =>
                            setTestimonials((prev) =>
                              prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, name: v } : t))
                            )
                          }
                        />
                        <Field
                          label="Role"
                          value={currentTestimonials[activeTestimonialIndex].role}
                          onChange={(v) =>
                            setTestimonials((prev) =>
                              prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, role: v } : t))
                            )
                          }
                        />
                        <Field
                          label="Avatar URL"
                          value={currentTestimonials[activeTestimonialIndex].avatar}
                          onChange={(v) =>
                            setTestimonials((prev) =>
                              prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, avatar: v } : t))
                            )
                          }
                          placeholder="/uploads/..."
                        />
                        <Field
                          label="Rating (1-5)"
                          type="number"
                          value={String(currentTestimonials[activeTestimonialIndex].rating)}
                          onChange={(v) =>
                            setTestimonials((prev) =>
                              prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, rating: asNumber(v, 5) } : t))
                            )
                          }
                        />
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-2">
                        <div className="text-sm font-bold">Upload Avatar</div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploading}
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f)
                              onUpload(f, (url) =>
                                setTestimonials((prev) =>
                                  prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, avatar: url } : t))
                                )
                              )
                            e.currentTarget.value = ''
                          }}
                          className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-perkasa-blue file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:brightness-110 file:cursor-pointer"
                        />
                        {uploading && <div className="text-xs text-white/60">Mengupload...</div>}
                      </div>
                      {uploadUrl && (
                        <button
                          onClick={() =>
                            setTestimonials((prev) =>
                              prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, avatar: uploadUrl } : t))
                            )
                          }
                          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
                        >
                          Pakai URL Terakhir untuk Avatar
                        </button>
                      )}
                      <TextArea
                        label="Teks"
                        value={currentTestimonials[activeTestimonialIndex].text}
                        onChange={(v) =>
                          setTestimonials((prev) =>
                            prev.map((t, i) => (i === activeTestimonialIndex ? { ...t, text: v } : t))
                          )
                        }
                        rows={5}
                      />
                    </div>
                  )}
                </div>
              )}

              {tab === 'company' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Profil Perusahaan</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Nama Perusahaan" value={String(content.company.name ?? '')} onChange={(v) => setCompany((company) => ({ ...company, name: v }))} />
                      <Field label="Nama Brand" value={String(content.company.shortName ?? '')} onChange={(v) => setCompany((company) => ({ ...company, shortName: v }))} />
                      <Field label="Tahun Berdiri" value={String(content.company.foundedYear ?? '')} onChange={(v) => setCompany((company) => ({ ...company, foundedYear: asNumber(v, new Date().getFullYear()) }))} />
                      <Field label="Jumlah Pelanggan" value={String(content.company.customers ?? '')} onChange={(v) => setCompany((company) => ({ ...company, customers: v }))} />
                      <Field label="Email" value={String(content.company.email ?? '')} onChange={(v) => setCompany((company) => ({ ...company, email: v }))} />
                      <Field label="Telepon / WA" value={String(content.company.phone ?? '')} onChange={(v) => setCompany((company) => ({ ...company, phone: v }))} />
                      <Field label="Link Maps" value={String(content.company.mapsUrl ?? '')} onChange={(v) => setCompany((company) => ({ ...company, mapsUrl: v }))} />
                    </div>
                    <TextArea label="Alamat" value={String(content.company.address ?? '')} onChange={(v) => setCompany((company) => ({ ...company, address: v }))} rows={3} />
                    <TextArea
                      label="Deskripsi About (1 paragraf = 1 baris)"
                      value={(Array.isArray(content.company.description) ? content.company.description : [content.company.description]).join('\n')}
                      onChange={(v) =>
                        setCompany((company) => ({
                          ...company,
                          description: v
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        }))
                      }
                      rows={5}
                    />
                    <TextArea label="Visi" value={String(content.company.vision ?? '')} onChange={(v) => setCompany((company) => ({ ...company, vision: v }))} rows={4} />
                    <TextArea
                      label="Misi (1 baris = 1 item)"
                      value={(content.company.mission ?? []).join('\n')}
                      onChange={(v) =>
                        setCompany((company) => ({
                          ...company,
                          mission: v
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        }))
                      }
                      rows={6}
                    />
                    <TextArea
                      label="Legalitas (1 baris = 1 item)"
                      value={(content.company.licenses ?? []).join('\n')}
                      onChange={(v) =>
                        setCompany((company) => ({
                          ...company,
                          licenses: v
                            .split('\n')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        }))
                      }
                      rows={6}
                    />
                  </div>
                </div>
              )}

              {tab === 'footer' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-4">
                    <div className="text-sm font-bold">Footer</div>
                    <TextArea label="Copyright" value={String(content.footer.copyright ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, copyright: v }))} rows={2} />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold">Social Links</div>
                        <button
                          onClick={() =>
                            setFooter((footer) => ({
                              ...footer,
                              socials: [
                                ...(footer.socials ?? []),
                                { name: 'Social Baru', link: 'https://', icon: 'MessageCircle', color: 'text-white', bgHover: 'group-hover:bg-white/20' },
                              ],
                            }))
                          }
                          className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                        >
                          Tambah Social
                        </button>
                      </div>
                      {(content.footer.socials ?? []).map((social, idx) => (
                        <div key={`${social.name}-${idx}`} className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-bold">{social.name || `Social ${idx + 1}`}</div>
                            <button
                              onClick={() =>
                                setFooter((footer) => ({
                                  ...footer,
                                  socials: footer.socials.filter((_, i) => i !== idx),
                                }))
                              }
                              className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                            >
                              Hapus
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="Nama" value={String(social.name ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, socials: footer.socials.map((item, i) => (i === idx ? { ...item, name: v } : item)) }))} />
                            <Field label="Link" value={String(social.link ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, socials: footer.socials.map((item, i) => (i === idx ? { ...item, link: v } : item)) }))} />
                            <Field label="Icon" value={String(social.icon ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, socials: footer.socials.map((item, i) => (i === idx ? { ...item, icon: v } : item)) }))} />
                            <Field label="Color Class" value={String(social.color ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, socials: footer.socials.map((item, i) => (i === idx ? { ...item, color: v } : item)) }))} />
                            <Field label="Hover Class" value={String(social.bgHover ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, socials: footer.socials.map((item, i) => (i === idx ? { ...item, bgHover: v } : item)) }))} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold">Footer Links</div>
                        <button
                          onClick={() =>
                            setFooter((footer) => ({
                              ...footer,
                              links: [...(footer.links ?? []), { name: 'Link Baru', href: '#' }],
                            }))
                          }
                          className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-semibold hover:bg-black/40 transition"
                        >
                          Tambah Link
                        </button>
                      </div>
                      {(content.footer.links ?? []).map((link, idx) => (
                        <div key={`${link.name}-${idx}`} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end rounded-xl border border-white/10 bg-black/30 p-4">
                          <Field label="Label" value={String(link.name ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, links: footer.links.map((item, i) => (i === idx ? { ...item, name: v } : item)) }))} />
                          <Field label="Href" value={String(link.href ?? '')} onChange={(v) => setFooter((footer) => ({ ...footer, links: footer.links.map((item, i) => (i === idx ? { ...item, href: v } : item)) }))} />
                          <button
                            onClick={() =>
                              setFooter((footer) => ({
                                ...footer,
                                links: footer.links.filter((_, i) => i !== idx),
                              }))
                            }
                            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setAdvancedOpen((v) => !v)}
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition"
            >
              {advancedOpen ? 'Tutup Advanced JSON' : 'Buka Advanced JSON'}
            </button>
          </div>

          {advancedOpen && (
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-bold">site-content.json</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={syncFormToJson}
                    disabled={!content}
                    className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition disabled:opacity-60"
                  >
                    Sync dari Form
                  </button>
                  <button
                    onClick={applyJsonToForm}
                    disabled={!parsed}
                    className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition disabled:opacity-60"
                  >
                    Terapkan ke Form
                  </button>
                </div>
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
                className="w-full h-[520px] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono text-white outline-none focus:ring-2 focus:ring-perkasa-blue/60"
              />
              {!parsed && <div className="text-xs text-amber-200">JSON tidak valid</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
