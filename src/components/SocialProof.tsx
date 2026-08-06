import { Star, CheckCircle2, Quote } from "lucide-react"

const REVIEWS = [
  {
    name: "Dr. Selin Yılmaz",
    date: "2 gün önce",
    quote:
      "Geceleri sürekli baş terlemesiyle uyanıyordum. Jel katmanı gerçekten 4-5 derece serin tutuyor, sabah boyun tutulmam tamamen bitti.",
  },
  {
    name: "Ahmet K. (Mimar)",
    date: "1 hafta önce",
    quote:
      "Tombul formunu aldım, visco yoğunluğu ve kılıf kalitesi muazzam. 99 gece deneme süresi içimi çok rahatlatmıştı ama kesinlikle iade etmem!",
  },
  {
    name: "Burcu A.",
    date: "2 hafta önce",
    quote:
      "Boyun düzleşmem için fizik tedavi doktorum önermişti. Hem serinlik hissi hem ergonomisi harika. Paketleme ve kargo da çok hızlıydı.",
  },
]

export function SocialProof() {
  return (
    <section className="py-12 md:py-20 bg-[#FAF8F5] border-b border-navy/8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-gold block mb-2">
            MÜŞTERİ YORUMLARI
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight">
            Kullanıcılarımız Ne Diyor?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-navy/10 shadow-xs flex flex-col justify-between relative"
            >
              <Quote size={32} className="text-gold/20 absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-4">
                {/* 5 AMBER STARS */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>

                {/* 2-LINE QUOTE */}
                <p className="text-xs md:text-sm text-navy/80 italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              {/* REVIEWER INFO & GREEN CHECK */}
              <div className="pt-4 mt-4 border-t border-navy/8 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-navy">{rev.name}</h3>
                  <span className="text-[10px] text-navy/40">{rev.date}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  <span>Doğrulanmış Alışveriş</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
