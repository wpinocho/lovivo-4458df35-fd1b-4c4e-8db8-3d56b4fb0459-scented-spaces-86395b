import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { ScentFamilyChip } from '@/components/ScentFamilyChip';
import { GuideSection } from '@/components/GuideSection';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/hero-fragrance.jpg"
            alt="Luxury home fragrances"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-primary font-medium tracking-widest uppercase text-sm">
                Sensorial Experience
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-background mb-6 leading-tight tracking-tight">
              Transform Your Space<br />
              <span className="text-primary">With Fragrance</span>
            </h1>
            
            <p className="text-xl text-background/90 mb-8 leading-relaxed">
              Discover our curated collection of hand-poured candles and artisan diffusers, 
              crafted to elevate every moment.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg group"
              >
                Find Your Note
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground px-8 py-6 text-lg"
              >
                Explore Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Scent Families Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
                Explore by Scent Family
              </h2>
              <p className="text-lg text-muted-foreground">
                Find your perfect fragrance profile
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={selectedCollectionId === null ? "default" : "outline"}
                onClick={handleShowAllProducts}
                className={`
                  px-6 py-3 transition-all duration-300
                  ${selectedCollectionId === null
                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
                    : 'bg-card border-muted hover:border-primary hover:scale-105'
                  }
                `}
              >
                All Scents
              </Button>
              {collections.map((collection) => (
                <ScentFamilyChip
                  key={collection.id}
                  collection={collection}
                  isSelected={selectedCollectionId === collection.id}
                  onClick={() => handleViewCollectionProducts(collection.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-foreground mb-2 tracking-wide">
              {selectedCollectionId 
                ? collections.find(c => c.id === selectedCollectionId)?.name || 'Featured Products'
                : 'Our Collection'
              }
            </h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products in this collection yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Guide Section */}
      <GuideSection />

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Find Your Note
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Not sure where to start? Take our scent profile quiz and discover 
            fragrances perfectly matched to your preferences.
          </p>
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg"
          >
            Start Quiz
          </Button>
        </div>
      </section>

      {/* Gift Sets Highlight */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
              Gift Sets
            </h2>
            <p className="text-lg text-muted-foreground">
              Thoughtfully curated for those special moments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts
              .filter(p => p.tags?.includes('Gift Set'))
              .slice(0, 3)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};
