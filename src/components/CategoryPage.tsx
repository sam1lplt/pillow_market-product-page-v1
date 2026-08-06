import { useState, useMemo } from "react"
import { MOCK_PRODUCTS, Product } from "../data/mockProducts"
import { CategoryHero } from "./CategoryHero"
import { SubcategoryCards, SubcategoryKey } from "./SubcategoryCards"
import { StickyFilterBar, SortOption } from "./StickyFilterBar"
import { BestsellerStrip } from "./BestsellerStrip"
import { ProductCard } from "./ProductCard"
import { CategoryGuide } from "./CategoryGuide"
import { CategoryFAQ } from "./CategoryFAQ"
import { SocialProof } from "./SocialProof"
import { RecentlyViewed } from "./RecentlyViewed"
import { ArrowRight, Sparkles, Trophy, Award, RotateCcw, ShieldCheck } from "lucide-react"

interface CategoryPageProps {
  onSelectProduct: (productId: string) => void
  onOpenQuizModal?: () => void
  onAddToCart?: (product: Product) => void
  activeSubcategory?: SubcategoryKey
  onSelectSubcategory?: (key: SubcategoryKey) => void
}

export function CategoryPage({
  onSelectProduct,
  onOpenQuizModal,
  onAddToCart,
  activeSubcategory: controlledSubcategory,
  onSelectSubcategory: controlledSelectSubcategory,
}: CategoryPageProps) {
  // STATE MANAGEMENT
  const [internalSubcategory, setInternalSubcategory] = useState<SubcategoryKey>("all")
  const activeSubcategory = controlledSubcategory ?? internalSubcategory
  const setActiveSubcategory = controlledSelectSubcategory ?? setInternalSubcategory
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [selectedSoftness, setSelectedSoftness] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>("bestseller")
  
  // LOAD MORE STATE: Initial 24 cards
  const [visibleCount, setVisibleCount] = useState<number>(24)
  
  // WISHLIST & COMPARE STATES
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [compareList, setCompareList] = useState<Set<string>>(new Set())

  // SUBCATEGORY COUNTS
  const subcategoryCounts = useMemo(() => {
    const counts: Record<SubcategoryKey, number> = {
      all: MOCK_PRODUCTS.length,
      "ekstra-soguk": 0,
      "boyun-destek": 0,
      "tombul-form": 0,
      "ince-form": 0,
      seyahat: 0,
    }

    MOCK_PRODUCTS.forEach((p) => {
      if (p.subcategory && counts[p.subcategory] !== undefined) {
        counts[p.subcategory]++
      }
    })

    return counts
  }, [])

  // FILTERING & SORTING LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS]

    // 1. Subcategory filter
    if (activeSubcategory !== "all") {
      result = result.filter((p) => p.subcategory === activeSubcategory)
    }

    // 2. Form filter
    if (selectedForm) {
      result = result.filter((p) => p.form === selectedForm)
    }

    // 3. Softness filter
    if (selectedSoftness) {
      result = result.filter((p) => p.softness === selectedSoftness)
    }

    // 4. Sorting
    switch (sortOption) {
      case "bestseller":
        result.sort((a, b) => (b.reviewCount * b.rating) - (a.reviewCount * a.rating))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id))
        break
    }

    return result
  }, [activeSubcategory, selectedForm, selectedSoftness, sortOption])

  // TOGGLES
  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleToggleCompare = (id: string) => {
    setCompareList((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleClearFilters = () => {
    setActiveSubcategory("all")
    setSelectedForm(null)
    setSelectedSoftness(null)
    setSortOption("bestseller")
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  // JSON-LD SCHEMA FOR SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://pillowmarket.com" },
          { "@type": "ListItem", "position": 2, "name": "Yastıklar", "item": "https://pillowmarket.com/yastiklar" },
          { "@type": "ListItem", "position": 3, "name": "Serinletici Jel Yastıklar", "item": "https://pillowmarket.com/serinletici-yastiklar" },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Serinletici Jel Yastıklar",
        "numberOfItems": filteredProducts.length,
        "itemListElement": visibleProducts.map((p, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": p.name,
          "price": p.price,
          "priceCurrency": "TRY",
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Serinletici jel yastık kimler için uygundur?",
            "acceptedAnswer": { "@type": "Answer", "text": "Gece baş terlemesi yaşayanlar ve boyun fıtığı olanlar için uygundur." },
          },
        ],
      },
    ],
  }

  return (
    <div className="w-full">
      {/* JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 2. CATEGORY HERO */}
      <CategoryHero
        totalCount={MOCK_PRODUCTS.length}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenQuizModal={onOpenQuizModal}
      />

      {/* STICKY FILTER + SORT BAR */}
      <StickyFilterBar
        totalCount={MOCK_PRODUCTS.length}
        filteredCount={filteredProducts.length}
        selectedForm={selectedForm}
        selectedSoftness={selectedSoftness}
        sortOption={sortOption}
        onSelectForm={(form) => {
          setSelectedForm(form)
          setVisibleCount(9)
        }}
        onSelectSoftness={(softness) => {
          setSelectedSoftness(softness)
          setVisibleCount(9)
        }}
        onSelectSort={(sort) => setSortOption(sort)}
        onClearFilters={handleClearFilters}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-6">
        {/* 5. BESTSELLER STRIP */}
        <BestsellerStrip
          products={MOCK_PRODUCTS}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
        />

        {/* 6. PRODUCT GRID & 7. QUIZ BANNER */}
        <section className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {visibleProducts.map((product, index) => {
              // Inject QUIZ BANNER between grid rows (e.g. after index 5 / 6th card)
              const showQuizHere = index === 5

              return (
                <div key={product.id} className="contents">
                  <ProductCard
                    product={product}
                    isWishlisted={wishlist.has(product.id)}
                    isCompared={compareList.has(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                  />

                  {/* 7. QUIZ BANNER INJECTED AFTER 6TH CARD */}
                  {showQuizHere && (
                    <div className="col-span-2 md:col-span-3 my-6">
                      <div className="bg-gradient-to-r from-[#173156] via-[#1E2D3D] to-[#173156] text-white rounded-3xl p-6 md:p-10 border border-gold/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-3 text-center md:text-left max-w-[640px]">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider">
                            <Sparkles size={14} />
                            <span>KİŞİSELLEŞTİRİLMİŞ UYKU TESTİ</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            Hangi Yastık Sana Uygun?
                          </h2>
                          <p className="text-xs md:text-sm text-white/80 leading-relaxed font-normal">
                            Boyun ağrınız, yatış pozisyonunuz ve sıcaklık tercihinize göre 3 soruda %100 uyumlu modelinizi eşleştirelim.
                          </p>
                        </div>

                        <button
                          onClick={onOpenQuizModal}
                          className="bg-transparent hover:bg-gold text-gold hover:text-white border-2 border-gold font-extrabold text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
                        >
                          <span>TESTİ BAŞLAT</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 8. LOAD MORE */}
          <div className="mt-12 text-center space-y-4 max-w-[420px] mx-auto">
            {hasMore ? (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 9, filteredProducts.length))}
                className="w-full py-4 px-8 rounded-2xl border-2 border-navy text-navy hover:bg-navy hover:text-white font-extrabold text-xs md:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                Daha Fazla Ürün Yükle
              </button>
            ) : (
              <div className="p-3 bg-navy/5 rounded-2xl text-xs font-bold text-navy/70">
                Tüm ürünler görüntülendi ({filteredProducts.length} / {filteredProducts.length})
              </div>
            )}

            {/* CAPTION & PROGRESS BAR */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-navy/60">
                {Math.min(visibleCount, filteredProducts.length)} / {filteredProducts.length} ürün görüntülendi
              </p>
              <div className="w-full h-1.5 bg-navy/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-500 rounded-full"
                  style={{
                    width: `${(Math.min(visibleCount, filteredProducts.length) / filteredProducts.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 9. NAVY STAT BAND */}
      <section className="bg-[#173156] text-white py-14 md:py-20 my-10 border-t border-b border-gold/20 shadow-inner">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT TITLE & DESC */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-extrabold tracking-[0.14em] text-gold uppercase bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
              ÜSTÜN MÜHENDİSLİK
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Neden Pillow Market Serinletici Serisi?
            </h2>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-normal max-w-[540px]">
              Termosensitif jel ve visco bellek köpüğünü birleştiren çift katmanlı mimari; ısı dengeleme ve ergonomik destek için ayrı ayrı hesaplanmış laboratuvar onaylı konfor.
            </p>
          </div>

          {/* RIGHT 2x2 AMBER STATS */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              { val: "5.400+", label: "DEĞERLENDİRME" },
              { val: "4.9", label: "ORTALAMA PUAN" },
              { val: "10 yıl", label: "ŞEKİL GARANTİSİ" },
              { val: "OEKO-TEX", label: "SERTİFİKALI ÜRETİM" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-gold/30 rounded-2xl p-5 text-center backdrop-blur-xs shadow-xs"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-gold tracking-tight mb-1">
                  {stat.val}
                </p>
                <p className="text-[10px] md:text-[11px] font-bold text-white/70 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CATEGORY GUIDE (SEO) */}
      <CategoryGuide />

      {/* 11. FAQ ACCORDION */}
      <CategoryFAQ />

      {/* 12. SOCIAL PROOF */}
      <SocialProof />

      {/* 13. RECENTLY VIEWED */}
      <RecentlyViewed products={MOCK_PRODUCTS} onSelectProduct={onSelectProduct} />
    </div>
  )
}
