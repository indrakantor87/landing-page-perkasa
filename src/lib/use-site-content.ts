'use client'

import { useEffect, useState } from 'react'
import { defaultPopupBanner, type SiteContent, defaultSiteContent } from '@/lib/site-content-shared'

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/site-content', { cache: 'no-store', signal: controller.signal })
      .then(async (r) => {
        const raw = (await r.json().catch(() => null)) as unknown
        if (!r.ok) {
          const msg =
            raw && typeof raw === 'object' && 'error' in raw
              ? String((raw as { error: unknown }).error)
              : 'Gagal memuat konten'
          throw new Error(msg)
        }
        const data = (raw && typeof raw === 'object' ? (raw as Partial<SiteContent>) : {}) as Partial<SiteContent>
        const merged: SiteContent = {
          ...defaultSiteContent,
          ...(data ?? {}),
          popupBanner: {
            ...defaultPopupBanner,
            ...(data.popupBanner ?? {}),
          },
        }
        setContent(merged)
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return
        setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  return { content, loading, error, setContent }
}
