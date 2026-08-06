import { useState } from "react"
import { Product } from "../data/mockProducts"
import { Heart, Star, ShoppingBag, Check } from "lucide-react"

interface ProductCardProps {
  product: Product
  isWishlisted?: boolean
  isCompared?: boolean
  onToggleWishlist?: (id: string) => void
  onToggleCompare?: (id: string) => void
  onSelectProduct?: (id: string) => void
  onAddToCart?: (product: Product) => void
}

const formatPrice = (p: number) => `₺${p.toLocaleString("tr-TR")}`

export function ProductCard({
  product,
  isWishlisted = false,
  isCompared = false,
  onToggleWishlist,
  onToggleCompare,
  onSelectProduct,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setJustAdded(true)
    onAddToCart?.(product)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div
      onClick={() => onSelectProduct?.(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl md:rounded-3xl border border-navy/10 hover:border-gold/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer relative"
    >
      {/* IMAGE AREA */}
      <div className="relative aspect-[2/3] bg-slate-50 overflow-hidden shrink-0">
        {/* PRIMARY IMAGE */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width="400"
          height="600"
          className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
            isHovered && product.images[1] ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* SECOND HOVER IMAGE */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} detay`}
            loading="lazy"
            width="400"
            height="600"
            className={`w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105 absolute inset-0 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* TOP LEFT BADGES */}
        <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
          {product.badges?.slice(0, 2).map((badge, i) => {
            const isDiscount = badge.includes("İNDİRİM")
            return (
              <span
                key={i}
                className={`text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase shadow-2xs ${
                  isDiscount ? "bg-navy text-white" : "bg-gold text-white"
                }`}
              >
                {badge}
              </span>
            )
          })}
        </div>

        {/* WISHLIST HEART BUTTON TOP RIGHT */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist?.(product.id)
          }}
          className={`absolute top-2.5 right-2.5 md:top-3 md:right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer shadow-xs ${
            isWishlisted
              ? "bg-rose-500 text-white scale-110"
              : "bg-white/80 hover:bg-white text-navy/70 hover:text-rose-500 backdrop-blur-xs"
          }`}
          aria-label="Favorilere ekle"
        >
          <Heart size={15} className={isWishlisted ? "fill-white" : ""} />
        </button>

        {/* HOVER SLIDE-UP ADD TO CART BUTTON */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2.5 md:p-3 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent transition-all duration-300 z-20 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 md:py-3 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-navy hover:bg-navy/90 text-white active:scale-98"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span>Sepete Eklendi!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} className="text-gold" />
                <span>Sepete Ekle</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-3.5 md:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* PRODUCT NAME */}
          <h3 className="text-xs md:text-sm font-semibold text-navy group-hover:text-gold transition-colors line-clamp-2 leading-snug mb-1.5">
            {product.name}
          </h3>

          {/* RATING ROW */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs font-extrabold text-navy ml-1">{product.rating}</span>
            <span className="text-[11px] text-navy/50 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* PRICE & FOOTER ROW */}
        <div className="pt-2 border-t border-navy/8 space-y-2">
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-baseline gap-1.5">
              {product.oldPrice && (
                <span className="text-xs text-navy/40 line-through font-normal">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-base md:text-lg font-extrabold text-navy tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* GREEN FREE SHIPPING BADGE */}
            <span className="text-[9px] md:text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
              KARGO BEDAVA
            </span>
          </div>

          {/* COMPARE CHECKBOX */}
          <div className="flex items-center justify-between pt-1">
            <label
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-[11px] font-semibold text-navy/60 hover:text-navy cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare?.(product.id)}
                className="w-3.5 h-3.5 accent-[#173156] rounded border-navy/20 cursor-pointer"
              />
              <span>Karşılaştır</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
