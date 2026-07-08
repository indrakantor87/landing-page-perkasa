export function normalizeWhatsAppNumber(input: string | null | undefined) {
  const digits = String(input ?? '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('62')) return digits
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  return digits
}

export function buildWhatsAppUrl(number: string | null | undefined, message?: string) {
  const normalized = normalizeWhatsAppNumber(number)
  if (!normalized) return '#'
  const text = String(message ?? '').trim()
  return text
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${normalized}`
}
