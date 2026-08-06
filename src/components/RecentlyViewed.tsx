import { Product } from "../data/mockProducts"
import { Star, ChevronRight } from "lucide-react"

interface RecentlyViewedProps {
  products: Product[]
  onSelectProduct?: (productId: string) => void
}

const formatPrice = (p: number) => `₺${p.toLocaleString("tr-TR")}`

export function RecentlyViewed({ products, onSelectProduct }: RecentlyViewedProps) {
  const recentProducts = products.slice(0, 4)

  if (recentProducts.length === 0) return null

  return (
    <section className="py-10 bg-[#FAF8F5] border-b border-navy/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold block">
              GEÇMİŞİNİZ
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-navy tracking-tight">
              Son Gezdiklerin
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recentProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProduct?.(p.id)}
              className="bg-white rounded-2xl p-3 border border-navy/10 hover:border-gold/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden mb-2 relative">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="text-xs font-bold text-navy truncate group-hover:text-gold transition-colors mb-1">
                  {p.name}
                </h3>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={10} className="fill-gold text-gold" />
                  <span className="text-[10px] font-bold text-navy">{p.rating}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs md:text-sm font-extrabold text-navy">{formatPrice(p.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
