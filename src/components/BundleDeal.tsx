import { useState } from "react"
import { Check, Percent } from "lucide-react"

interface BundleDealProps {
  onAddBundle?: (totalPrice: number) => void
  className?: string
}

export function BundleDeal({ onAddBundle, className = "" }: BundleDealProps) {
  const [added, setAdded] = useState(false)

  const handleAddBundle = () => {
    setAdded(true)
    onAddBundle?.(1799)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className={`bg-white rounded-2xl p-5 md:p-6 border border-navy/10 shadow-3xs text-navy ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT & MIDDLE AREA: TITLE + IMAGES + PRODUCT DETAILS */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-5 md:gap-6">
          {/* TITLE TEXT */}
          <div className="shrink-0 text-center sm:text-left min-w-[150px]">
            <h3 className="text-base md:text-lg font-bold text-navy leading-tight">
              Birlikte Al,
            </h3>
            <p className="text-base md:text-lg font-black text-gold leading-tight mt-0.5">
              481 TL Daha Az Öde!
            </p>
          </div>

          {/* PRODUCTS COMBINATION ROW */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            {/* PRODUCT 1 IMAGE */}
            <div className="w-20 sm:w-24 aspect-[2/3] rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-navy/10 p-0.5">
              <img src="/images/product-hero.jpg" alt="Jelli Serinletici Visco Yastık" className="w-full h-full object-cover rounded-lg" />
            </div>

            {/* PLUS ICON */}
            <span className="text-navy/50 font-bold text-lg sm:text-xl shrink-0">+</span>

            {/* PRODUCT 2 IMAGE */}
            <div className="w-20 sm:w-24 aspect-[2/3] rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-navy/10 p-0.5">
              <img src="/images/softy-1.png" alt="Softy Comfort Visco Yastık" className="w-full h-full object-cover rounded-lg" />
            </div>

            {/* PRODUCT 2 INFO & SAVINGS BADGE */}
            <div className="min-w-0 space-y-1">
              <span className="inline-flex items-center gap-1 bg-gold/15 text-gold border border-gold/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs">
                <Percent size={10} strokeWidth={3} />
                Kazancın: 481 TL
              </span>
              <h4 className="text-xs md:text-sm font-bold text-navy leading-snug line-clamp-2">
                Pillow Market Softy Ortopedik Visko Yastık
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-navy/40 line-through">1.099 TL</span>
                <span className="text-sm font-extrabold text-navy">799 TL</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY & CTA BOX */}
        <div className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-5 text-center border border-gold/30">
          <p className="text-xs font-semibold text-navy/60 mb-1">Toplam Fiyat:</p>
          <p className="text-2xl md:text-3xl font-black text-navy mb-3 tracking-tight">
            1.799,00 TL
          </p>
          <button
            onClick={handleAddBundle}
            className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs md:text-sm transition-all cursor-pointer shadow-sm border ${
              added
                ? "bg-emerald-700 border-emerald-700 text-white"
                : "bg-[#1E2D3D] border-[#1E2D3D] text-white hover:bg-navy"
            }`}
          >
            {added ? (
              <span className="flex items-center justify-center gap-1.5"><Check size={16} strokeWidth={3} /> Birlikte Sepete Eklendi</span>
            ) : (
              "Birlikte Sepete Ekle"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}



