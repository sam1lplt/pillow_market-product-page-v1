import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Truck, Shield, Star, Award, ArrowRight } from "lucide-react"

interface HomePageProps {
  onNavigateToCategory: (subcategory?: string) => void
  onNavigateToProduct: (productId: string) => void
  onOpenQuizModal: () => void
}

export function HomePage({ onNavigateToCategory, onNavigateToProduct, onOpenQuizModal }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const heroSlides = [
    { id: "slide-1", imgSrc: "/images/slider_deneme1.png", action: () => onNavigateToCategory("ekstra-soguk") },
    { id: "slide-2", imgSrc: "/images/slider_deneme2.png", action: () => onNavigateToCategory("ekstra-soguk") },
    { id: "slide-3", imgSrc: "/images/slider_deneme3.png", action: () => onNavigateToCategory("all") },
    { id: "slide-4", imgSrc: "/images/slider_deneme4.png", action: () => onNavigateToProduct("softy") },
    { id: "slide-5", imgSrc: "/images/slider_deneme5.png", action: () => onNavigateToCategory("seyahat") },
    { id: "slide-6", imgSrc: "/images/slider_deneme6.png", action: () => onNavigateToCategory("all") },
    { id: "slide-7", imgSrc: "/images/slider_deneme7.png", action: () => onNavigateToCategory("boyun-destek") },
    { id: "slide-8", imgSrc: "/images/slider_deneme8.png", action: () => onNavigateToCategory("all") },
    { id: "slide-9", imgSrc: "/images/slider_deneme9.png", action: () => onNavigateToProduct("jelli") },
    { id: "slide-10", imgSrc: "/images/slider_deneme10.png", action: () => onNavigateToCategory("all") },
    { id: "slide-11", imgSrc: "/images/slider_deneme11.png", action: () => onNavigateToCategory("ekstra-soguk") },
    { id: "slide-12", imgSrc: "/images/slider_deneme12.png", action: () => onNavigateToCategory("all") },
  ]

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, heroSlides.length])

  const handleManualChange = (idx: number) => {
    setCurrentSlide(idx)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const nextSlide = () => handleManualChange((currentSlide + 1) % heroSlides.length)
  const prevSlide = () => handleManualChange((currentSlide - 1 + heroSlides.length) % heroSlides.length)

  const featuredCategories = [
    {
      title: "Serinletici Jel Yastıklar",
      desc: "4–5°C serinlik sağlayan jel teknolojisi",
      imgSrc: "/images/product-hero.jpg",
      subcategory: "ekstra-soguk",
    },
    {
      title: "Ergonomik Visco Yastıklar",
      desc: "Boyun ve omurga dostu ortopedik destek",
      imgSrc: "/images/product-model.jpg",
      subcategory: "boyun-destek",
    },
    {
      title: "Seyahat Yastıkları",
      desc: "Her yolculuğa eşlik eden konfor",
      imgSrc: "/images/softy-hero.png",
      subcategory: "seyahat",
    },
  ]

  return (
    <div className="w-full">
      {/* ═══════════════════════════════════════════════════
      {/* ═══════════════════════════════════════════════════
          HERO: FULL-WIDTH IMAGE SLIDER — Mobile-responsive height + desktop aspect ratio
         ═══════════════════════════════════════════════════ */}
      <section
        className="relative w-full h-[320px] sm:h-[420px] md:h-auto md:aspect-[1900/800] overflow-hidden group bg-white shadow-xs"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={slide.action}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out cursor-pointer border-none p-0 bg-transparent ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.imgSrc}
              alt=""
              className="w-full h-full object-cover md:object-contain object-center"
            />
          </button>
        ))}

        {/* Arrow Controls */}
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide() }}
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all z-30 cursor-pointer opacity-80 md:opacity-0 group-hover:opacity-100"
          aria-label="Önceki"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide() }}
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all z-30 cursor-pointer opacity-80 md:opacity-0 group-hover:opacity-100"
          aria-label="Sonraki"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); handleManualChange(i) }}
              className={`transition-all cursor-pointer rounded-full ${
                i === currentSlide
                  ? "w-6 md:w-8 h-2 md:h-2.5 bg-gold shadow-md"
                  : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TRUST BAR
         ═══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-navy/8">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Truck, title: "Ücretsiz Kargo", desc: "Tüm Türkiye'ye aynı gün kargo" },
            { icon: Shield, title: "30 Gün İade", desc: "Hijyenik iade garantisi" },
            { icon: Award, title: "10 Yıl Garanti", desc: "Şekil bozulma garantisi" },
            { icon: Star, title: "4.9 Puan", desc: "5.400+ müşteri değerlendirmesi" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-navy uppercase tracking-wider">{item.title}</p>
                <p className="text-[11px] text-navy/60 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED CATEGORIES
         ═══════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold block mb-2">
              KOLEKSİYONLARIMIZ
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight">
              İhtiyacınıza Özel Yastık Koleksiyonları
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {featuredCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => onNavigateToCategory(cat.subcategory)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 text-left"
              >
                <img
                  src={cat.imgSrc}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/75 font-medium mb-3">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-gold group-hover:text-white transition-colors">
                    <span>Koleksiyonu İncele</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          QUIZ CTA BANNER
         ═══════════════════════════════════════════════════ */}
      <section className="bg-[#173156] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-[600px] space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles size={14} />
                <span>KİŞİSELLEŞTİRİLMİŞ YASTIK REHBERİ</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                Hangi Yastık Sana Uygun?
              </h2>
              <p className="text-sm md:text-base text-white/75 leading-relaxed font-light">
                3 kısa soruda uyku pozisyonunuz, boyun ağrınız ve sıcaklık tercihinize göre
                %100 uyumlu modelinizi bulalım.
              </p>
            </div>

            <button
              onClick={onOpenQuizModal}
              className="bg-gold hover:bg-gold/90 text-navy font-extrabold text-sm uppercase tracking-widest px-10 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <span>TESTİ BAŞLAT</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BRAND STORY STRIP
         ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20 border-t border-navy/5">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold block mb-3">
            PILLOW MARKET
          </span>
          <h2 className="text-xl md:text-3xl font-extrabold text-navy tracking-tight max-w-[700px] mx-auto mb-4">
            10 Yıllık Ar-Ge ile Mühendislik Harikası Uyku Konforu
          </h2>
          <p className="text-sm md:text-base text-navy/60 leading-relaxed font-light max-w-[560px] mx-auto mb-10">
            OEKO-TEX sertifikalı, tamamen Türkiye'de üretilen yastıklarımız
            binlerce kullanıcının güvenini kazandı.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[900px] mx-auto">
            {[
              { val: "5.400+", label: "Değerlendirme" },
              { val: "4.9", label: "Ortalama Puan" },
              { val: "10 Yıl", label: "Şekil Garantisi" },
              { val: "OEKO-TEX", label: "Sertifikalı Üretim" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-2xl p-5 border border-navy/8">
                <p className="text-2xl md:text-3xl font-extrabold text-gold tracking-tight mb-1">{stat.val}</p>
                <p className="text-[10px] md:text-[11px] font-bold text-navy/60 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={() => onNavigateToCategory("all")}
              className="bg-navy hover:bg-navy/90 text-white text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] px-8 py-4 rounded-full shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>TÜM ÜRÜNLERE GÖZ AT</span>
              <ArrowRight size={16} className="text-gold" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
