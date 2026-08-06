import { useState, useMemo, useEffect, useRef } from "react"
import { Search, X, ArrowRight, Sparkles, Star } from "lucide-react"
import { MOCK_PRODUCTS, Product } from "../data/mockProducts"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (productId: string) => void
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setSearchTerm("")
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const quickTags = [
    "Jel Yastık",
    "Visco",
    "Boyun Destek",
    "Seyahat",
    "Ekstra Soğuk",
    "Ergonomik",
    "Yumuşak",
  ]

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return MOCK_PRODUCTS.slice(0, 8) // Show top 8 by default
    }
    const query = searchTerm.toLowerCase().trim()
    return MOCK_PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(query)
      const matchBadges = product.badges?.some((b) => b.toLowerCase().includes(query))
      const matchChips = product.featureChips?.some((c) => c.toLowerCase().includes(query))
      const matchForm = product.form.toLowerCase().includes(query)
      const matchSub = product.subcategory.toLowerCase().includes(query)
      return matchName || matchBadges || matchChips || matchForm || matchSub
    })
  }, [searchTerm])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 md:pt-16 px-4 bg-navy/60 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-2xl overflow-hidden border border-navy/10 flex flex-col max-h-[85vh] animate-scaleUp">
        
        {/* Search Input Bar */}
        <div className="p-4 md:p-6 border-b border-navy/10 flex items-center gap-3 bg-[#FAF8F5]">
          <Search size={22} className="text-gold shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Yastık adı, özellik veya kategori ara... (Örn: Visco, Jel, Seyahat)"
            className="w-full bg-transparent text-navy placeholder:text-navy/40 text-base md:text-lg font-medium focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-1.5 text-navy/40 hover:text-navy rounded-full hover:bg-navy/5 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 -mr-1 text-navy/60 hover:text-navy hover:bg-navy/10 rounded-full transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider flex items-center gap-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Tags */}
        <div className="px-4 md:px-6 py-3 bg-white border-b border-navy/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy/40 shrink-0 flex items-center gap-1">
            <Sparkles size={12} className="text-gold" />
            Popüler:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                searchTerm.toLowerCase() === tag.toLowerCase()
                  ? "bg-navy text-gold font-bold shadow-xs"
                  : "bg-navy/5 text-navy/70 hover:bg-navy/10 font-medium"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="px-4 md:px-6 py-2.5 bg-[#FAF8F5]/50 flex items-center justify-between text-xs text-navy/60">
          <span>
            {searchTerm.trim() ? (
              <>
                <strong className="text-navy">"{searchTerm}"</strong> için <strong className="text-navy">{filteredProducts.length}</strong> sonuç bulundu
              </>
            ) : (
              "Öne Çıkan & Çok Satılan Ürünler"
            )}
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gold font-bold hover:underline cursor-pointer"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Products Grid / Scroll Area */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-navy/5 text-navy/40 flex items-center justify-center mx-auto">
                <Search size={24} />
              </div>
              <p className="text-sm font-bold text-navy">Aradığınız kriterlere uygun ürün bulunamadı</p>
              <p className="text-xs text-navy/60">Farklı bir kelime deneyebilir veya kategorilere göz atabilirsiniz.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {filteredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product.id)
                    onClose()
                  }}
                  className="group bg-white rounded-xl p-3 border border-navy/10 hover:border-gold/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF8F5] mb-2 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badges && product.badges[0] && (
                        <span className="absolute top-1 left-1 bg-navy/90 backdrop-blur-sm text-gold text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          {product.badges[0]}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold text-navy line-clamp-2 group-hover:text-gold transition-colors mb-1">
                      {product.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[10px] text-navy/60 mb-2">
                      <Star size={10} className="fill-gold text-gold" />
                      <span className="font-bold text-navy">{product.rating}</span>
                      <span>({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-2 border-t border-navy/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-navy">₺{product.price.toLocaleString("tr-TR")}</span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-navy/40 line-through ml-1">₺{product.oldPrice.toLocaleString("tr-TR")}</span>
                      )}
                    </div>
                    <span className="w-6 h-6 rounded-full bg-navy/5 group-hover:bg-gold group-hover:text-white text-navy flex items-center justify-center transition-colors">
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
