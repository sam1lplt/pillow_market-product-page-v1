import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Truck } from "lucide-react"

interface CategoryHeroProps {
  totalCount: number
  onNavigateHome?: () => void
  onOpenQuizModal?: () => void
}

export function CategoryHero({ totalCount, onNavigateHome, onOpenQuizModal }: CategoryHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    // SLIDE 1: ORIGINAL LIFESTYLE HERO WITH NEW COOLING JEL PHOTO
    {
      id: "lifestyle-hero",
      type: "split",
      tag: "SERİNLETİCİ YASTIK KOLEKSİYONU",
      title: "Türkiye'nin En İyi Serinletici Yastık Koleksiyonu",
      desc: "Bulut yumuşaklığında, 12+ saat boyunca 4–5°C serinlik sağlayan termosensitif jel ve ergonomik visco desteği. Hangi uyku pozisyonunda olursanız olun, sizin için en ideal yastık burada.",
      ctaText: "Yastık Testini Başlat",
      imgSrc: "/images/serinletici-jel-hero.jpg",
      action: onOpenQuizModal,
    },
    // SLIDE 2: BUNDLE CAMPAIGN (CLEAN WHITE THEME)
    {
      id: "bundle-campaign",
      type: "split-light",
      tag: "%30 İNDİRİM + BİRLİKTE AL FIRSATI",
      title: "Jelli Serinletici + Softy Comfort İkili Uyum Seti",
      desc: "İki farkı konforu tek pakette birleştirin. Birlikte alımda 481 TL anında net indirim ve ücretsiz sigortalı kargo fırsatını kaçırmayın.",
      ctaText: "İkili Seti İncele",
      imgSrc: "/images/softy-hero.png",
      action: onOpenQuizModal,
    },
    // SLIDE 3: DEDICATED FREE SHIPPING SLIDE
    {
      id: "free-shipping-slide",
      type: "split-shipping",
      tag: "AYNI GÜN KARGO",
      title: "Tüm Türkiye'ye Ücretsiz Kargo",
      desc: "Verdiğiniz tüm siparişler aynı gün özenle paketlenir, özel korumalı ambalajında ve 81 ilde kapınıza kadar %100 ücretsiz ve sigortalı teslim edilir.",
      ctaText: "Koleksiyonu Keşfet",
      imgSrc: "/images/softy-model.png",
      action: onOpenQuizModal,
    },
  ]

  // AUTO SLIDE INTERVAL WITH PAUSE ON HOVER / MANUAL CHANGE
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  // MANUAL CHANGE HANDLER (PAUSES AUTO-SLIDE FOR 8 SECONDS)
  const handleManualChange = (newIndex: number) => {
    setCurrentSlide(newIndex)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 8000)
  }

  const nextSlide = () => handleManualChange((currentSlide + 1) % slides.length)
  const prevSlide = () => handleManualChange((currentSlide - 1 + slides.length) % slides.length)

  return (
    <section className="bg-[#FAF8F5] pt-4 md:pt-6 pb-2">
      <div
        className="max-w-[1280px] mx-auto px-4 md:px-6 relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* SLIDER CAROUSEL CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden border border-navy/8 shadow-xs bg-white min-h-[300px] md:min-h-[360px]">
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide

            return (
              <div
                key={slide.id}
                className={`w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 relative z-10 pointer-events-auto" : "opacity-0 absolute inset-0 z-0 pointer-events-none"
                }`}
              >
                {/* SPLIT SLIDE 1 */}
                {slide.type === "split" && (
                  <div className="bg-white w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-7 p-6 md:p-10 space-y-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy/50 block">
                        {slide.tag}
                      </span>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xs sm:text-sm md:text-base text-navy/70 leading-relaxed font-normal max-w-[540px]">
                        {slide.desc}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                          onClick={() => {
                            const el = document.getElementById("product-grid")
                            if (el) el.scrollIntoView({ behavior: "smooth" })
                          }}
                          className="bg-navy hover:bg-navy/90 text-white text-xs md:text-sm font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-98 inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>YASTIKLARI KEŞFET</span>
                          <ArrowRight size={16} className="text-gold" />
                        </button>

                        <span className="hidden md:inline text-navy/20 font-light text-lg">|</span>

                        <button
                          onClick={onOpenQuizModal}
                          className="text-xs font-medium text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                        >
                          <span>Hangi yastık uygun?</span>
                          <span className="font-extrabold underline decoration-gold underline-offset-4 text-navy hover:text-gold uppercase tracking-wider text-[11px]">YASTIK TESTİNİ BAŞLAT</span>
                        </button>
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative h-full min-h-[220px] md:min-h-[300px] max-h-[380px] bg-slate-100 overflow-hidden hidden lg:block">
                      <img
                        src={slide.imgSrc}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                )}

                {/* SPLIT SLIDE 2 (WHITE THEME BUNDLE CAMPAIGN) */}
                {slide.type === "split-light" && (
                  <div className="bg-white text-navy w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center min-h-[300px] md:min-h-[360px]">
                    <div className="lg:col-span-7 p-6 md:p-10 space-y-4 z-10">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold block">
                        {slide.tag}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-navy/70 leading-relaxed font-normal max-w-[540px]">
                        {slide.desc}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                          onClick={slide.action}
                          className="bg-navy hover:bg-navy/90 text-white text-xs md:text-sm font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-98 inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>İ K İ L İ S E T İ İ N C E L E</span>
                          <ArrowRight size={16} className="text-gold" />
                        </button>

                        <span className="hidden md:inline text-navy/20 font-light text-lg">|</span>

                        <button
                          onClick={onOpenQuizModal}
                          className="text-xs font-medium text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                        >
                          <span>Kararsız mısınız?</span>
                          <span className="font-extrabold underline decoration-gold underline-offset-4 text-navy hover:text-gold uppercase tracking-wider text-[11px]">YASTIK TESTİ YAP</span>
                        </button>
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative h-full min-h-[220px] md:min-h-[300px] max-h-[380px] bg-slate-50 overflow-hidden hidden lg:flex items-center justify-center p-4">
                      <img
                        src={slide.imgSrc}
                        alt={slide.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* SPLIT SLIDE 3 (DEDICATED FREE SHIPPING SLIDE) */}
                {slide.type === "split-shipping" && (
                  <div className="bg-gradient-to-r from-emerald-900/10 via-white to-emerald-900/5 text-navy w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center min-h-[300px] md:min-h-[360px]">
                    <div className="lg:col-span-7 p-6 md:p-10 space-y-4 z-10">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                        <Truck size={15} className="text-emerald-600" />
                        <span>{slide.tag}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-navy/70 leading-relaxed font-normal max-w-[540px]">
                        {slide.desc}
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={slide.action}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-98 inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative h-full min-h-[220px] md:min-h-[300px] max-h-[380px] bg-emerald-50/50 overflow-hidden hidden lg:flex items-center justify-center p-6">
                      <img
                        src={slide.imgSrc}
                        alt={slide.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* ARROW CONTROLS */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-navy flex items-center justify-center shadow-md backdrop-blur-md transition-all z-30 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110"
            aria-label="Önceki Slayt"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-navy flex items-center justify-center shadow-md backdrop-blur-md transition-all z-30 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110"
            aria-label="Sonraki Slayt"
          >
            <ChevronRight size={20} />
          </button>

          {/* SLIDE INDICATORS (DOTS) */}
          <div className="absolute bottom-4 right-6 md:right-10 z-30 flex items-center gap-2 bg-navy/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualChange(i)}
                className={`transition-all cursor-pointer rounded-full ${
                  i === currentSlide
                    ? "w-6 h-2 bg-gold shadow-sm"
                    : "w-2 h-2 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Slayt ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


