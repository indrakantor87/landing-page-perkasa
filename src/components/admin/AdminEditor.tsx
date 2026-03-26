'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SiteContent } from '@/lib/site-content-shared'

type AdminTab = 'hero' | 'popup' | 'packages' | 'testimonials' | 'advanced'

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
      const data = await r.json().catch(() => ({}))
      if (r.status === 401) {
        router.push('/admin/login')
        router.refresh()
        return
      }
      if (!r.ok) throw new Error(data?.error ?? 'Gagal upload')
      const url = String(data?.url ?? '')
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Editor</h1>
            <p className="text-sm text-white/70 mt-1">Update teks dan gambar landing page</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition">
              Lihat Web
            </Link>
            <button onClick={logout} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-black/40 transition">
              Logout
            </button>
          </div>
        </div>

        {error && <div className="rounded-lg bg-red-500/10 text-red-200 border border-red-500/30 px-3 py-2 text-sm">{error}</div>}

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
            <div className="flex items-center gap-2">
              {(['hero', 'popup', 'packages', 'testimonials'] as AdminTab[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    tab === k ? 'bg-perkasa-blue text-white' : 'border border-white/10 bg-black/30 text-white/80 hover:bg-black/40'
                  }`}
                >
                  {k === 'hero' ? 'Hero' : k === 'popup' ? 'Popup Banner' : k === 'packages' ? 'Packages' : 'Testimonials'}
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
