import fs from 'fs/promises'
import path from 'path'
import { defaultPopupBanner, defaultSiteContent, type SiteContent } from '@/lib/site-content-shared'

function resolveContentPath() {
  const p = process.env.LP_CONTENT_PATH?.trim()
  if (p) return p
  return path.join(process.cwd(), 'data', 'site-content.json')
}

export async function readSiteContent(): Promise<SiteContent> {
  const filePath = resolveContentPath()
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const parsed = JSON.parse(raw) as Partial<SiteContent>
    return {
      ...defaultSiteContent,
      ...parsed,
      navigation: {
        ...defaultSiteContent.navigation,
        ...(parsed.navigation ?? {}),
      },
      popupBanner: {
        ...defaultPopupBanner,
        ...(parsed.popupBanner ?? {}),
      },
      pricingSection: {
        ...defaultSiteContent.pricingSection,
        ...(parsed.pricingSection ?? {}),
      },
      packageSection: {
        ...defaultSiteContent.packageSection,
        ...(parsed.packageSection ?? {}),
      },
      testimonialSection: {
        ...defaultSiteContent.testimonialSection,
        ...(parsed.testimonialSection ?? {}),
      },
      faqSection: {
        ...defaultSiteContent.faqSection,
        ...(parsed.faqSection ?? {}),
      },
      ctaSection: {
        ...defaultSiteContent.ctaSection,
        ...(parsed.ctaSection ?? {}),
      },
      aboutSection: {
        ...defaultSiteContent.aboutSection,
        ...(parsed.aboutSection ?? {}),
      },
    }
  } catch {
    return defaultSiteContent
  }
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  const filePath = resolveContentPath()
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  const tmpPath = `${filePath}.tmp`
  const json = JSON.stringify(content, null, 2)
  await fs.writeFile(tmpPath, json, 'utf8')
  await fs.rename(tmpPath, filePath)
}
