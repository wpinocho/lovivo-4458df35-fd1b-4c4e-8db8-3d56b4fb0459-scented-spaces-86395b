import { Flame, Sparkles, Home, Gift } from 'lucide-react'

const guides = [
  {
    icon: Home,
    title: 'Living Spaces',
    description: 'Create warmth with amber and woody notes for your main living areas'
  },
  {
    icon: Sparkles,
    title: 'Bedrooms',
    description: 'Calming lavender and sage for restful, peaceful nights'
  },
  {
    icon: Flame,
    title: 'Workspaces',
    description: 'Fresh citrus and botanical scents to energize and focus'
  },
  {
    icon: Gift,
    title: 'Gift Ideas',
    description: 'Curated sets that make perfect presents for any occasion'
  }
]

export const GuideSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
            Scent Your Spaces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the art of creating atmosphere through fragrance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <div 
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
