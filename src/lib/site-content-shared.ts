import { defaultSiteConfig } from '@/data/site-config'

export type PopupBannerConfig = {
  active: boolean
  imageUrl: string
  delayMs: number
}

export type SiteContent = typeof defaultSiteConfig & {
  popupBanner?: PopupBannerConfig
}

export const defaultPopupBanner: PopupBannerConfig = {
  active: true,
  imageUrl: '/pop%20up%20banner.jpeg',
  delayMs: 600,
}

export const defaultSiteContent: SiteContent = {
  ...defaultSiteConfig,
  popupBanner: defaultPopupBanner,
}

