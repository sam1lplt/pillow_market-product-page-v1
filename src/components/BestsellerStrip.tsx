import { Product } from "../data/mockProducts"
import { Star, ShoppingBag } from "lucide-react"

interface BestsellerStripProps {
  products: Product[]
  onSelectProduct?: (productId: string) => void
  onAddToCart?: (product: Product) => void
}

const formatPrice = (p: number) => `₺${p.toLocaleString("tr-TR")}`

export function BestsellerStrip({ products, onSelectProduct, onAddToCart }: BestsellerStripProps) {
  const topProducts = products.filter((p) => p.isBestseller).slice(0, 3)

  if (topProducts.length === 0) return null

  return (
    <section className="my-6">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* HEADER OUTSIDE THE CONTAINER */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-navy tracking-tight">
            En Çok Satan Serinletici Yastıklar
          </h2>
        </div>

        {/* CONTAINER FOR THE TOP 3 PRODUCT CARDS */}
        <div className="bg-gradient-to-r from-navy/5 via-navy/8 to-navy/5 p-4 md:p-6 rounded-3xl border border-navy/10 overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {topProducts.map((p, idx) => {
            const rank = idx + 1
            return (
              <div
                key={p.id}
                onClick={() => onSelectProduct?.(p.id)}
                className="bg-white rounded-2xl p-4 border border-navy/10 hover:border-gold/60 shadow-xs hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group relative overflow-hidden"
              >
                {/* AMBER RANK BADGE */}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-gold text-white font-extrabold text-xs flex items-center justify-center shadow-xs z-10">
                  #{rank}
                </div>

                {/* SMALL IMAGE - VERTICAL 3:4 */}
                <div className="w-20 h-28 md:w-24 md:h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0 relative border border-navy/8">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="text-xs font-extrabold text-navy">{p.rating}</span>
                    <span className="text-[10px] text-navy/50">({p.reviewCount})</span>
                  </div>

                  <h3 className="text-xs md:text-sm font-bold text-navy truncate group-hover:text-gold transition-colors mb-1.5">
                    {p.name}
                  </h3>

                  {/* PRICE ROW */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm md:text-base font-extrabold text-navy">{formatPrice(p.price)}</span>
                    {p.oldPrice && (
                      <span className="text-xs text-navy/40 line-through">{formatPrice(p.oldPrice)}</span>
                    )}
                  </div>

                  {/* GHOST ADD TO CART BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddToCart?.(p)
                    }}
                    className="w-full py-1.5 px-3 rounded-lg border border-navy/20 hover:border-navy bg-transparent hover:bg-navy text-navy hover:text-white text-[11px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    <span>Sepete Ekle</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </div>
    </section>
  )
}
