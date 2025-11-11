import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface ScentFamilyChipProps {
  collection: Collection
  isSelected: boolean
  onClick: () => void
}

export const ScentFamilyChip = ({ collection, isSelected, onClick }: ScentFamilyChipProps) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      onClick={onClick}
      className={`
        px-6 py-3 transition-all duration-300
        ${isSelected 
          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
          : 'bg-card border-muted hover:border-primary hover:scale-105'
        }
      `}
    >
      {collection.name}
    </Button>
  )
}
