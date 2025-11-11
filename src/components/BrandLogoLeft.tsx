import { useSettings } from '@/contexts/SettingsContext'
import { getLogoUrl } from '@/lib/logo-utils'
import { Sparkles } from 'lucide-react'

export const BrandLogoLeft = () => {
  const { logos } = useSettings()

  if (!logos) {
    return (
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-light text-foreground tracking-wider">ESSENCE</h1>
      </div>
    )
  }

  const mainLogoUrl = getLogoUrl(logos, 'main_logo')

  if (!mainLogoUrl) {
    return (
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-light text-foreground tracking-wider">ESSENCE</h1>
      </div>
    )
  }

  return (
    <a href="/" aria-label="Home">
      <img 
        src={mainLogoUrl} 
        alt="Main logo"
        className="h-8 w-auto object-contain" 
      />
    </a>
  )
}
