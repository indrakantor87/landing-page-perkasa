'use client'

import { useEffect } from 'react'

export default function VisitTracker() {
  useEffect(() => {
    try {
      const key = 'lp_visit_sent_v1'
      if (typeof window !== 'undefined' && !window.localStorage.getItem(key)) {
        fetch('/api/metrics/visit', { method: 'POST', keepalive: true }).catch(() => {})
        window.localStorage.setItem(key, String(Date.now()))
      }
    } catch {
      // ignore
    }
  }, [])
  return null
}

