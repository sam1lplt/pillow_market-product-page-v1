import { Sparkles, Check, HelpCircle } from "lucide-react"

export function CategoryGuide() {
  return (
    <section className="py-12 md:py-20 border-t border-b border-navy/8 bg-[#FAF8F5]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* SECTION HEADER */}
        <div className="mb-10 text-left">
          <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-gold block mb-2">
            SATIN ALMA REHBERİ
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight">
            Serinletici Yastık Nasıl Seçilir?
          </h2>
        </div>

        {/* TWO-COLUMN EDITORIAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-7 space-y-6 text-navy/80 text-sm md:text-base leading-relaxed">
            <p>
              Doğru serinletici yastığı seçmek; uyku kalitenizi artırmak, gece terlemelerini ve sabah boyun tutulmalarını önlemek için son derece önemlidir. Pillow Market Serinletici Jel Serisi, yüksek yoğunluklu medikal visco sünger ile termosensitif soğuk jel moleküllerini bir arada sunar.
            </p>
            <p>
              Yatış pozisyonunuza uygun yükseklik seçimi omurga hizanızı korurken, özel jel yüzeyi vücut ısınızı emer ve gece boyunca ideal 4–5°C ferahlık dengesini muhafaza eder.
            </p>

            <div className="pt-4 border-t border-navy/10">
              <h3 className="text-xl md:text-2xl font-bold text-navy mb-3 flex items-center gap-2">
                <Sparkles size={20} className="text-gold" />
                <span>Jel Teknolojisi Ne İşe Yarar?</span>
              </h3>
              <p className="text-sm md:text-base text-navy/70 leading-relaxed">
                Geleneksel elyaf veya standart sünger yastıklar vücut ısısını hapsederek baş bölgesinde terlemeye neden olur. Özel döküm termosensitif jel katmanımız ise ısıyı geniş yüzeye yayarak terlemeyi engeller, uyku bölünmelerinin önüne geçer ve cildinize nefes aldırır.
              </p>
            </div>
          </div>

          {/* RIGHT BORDERED CARD: MINI COMPARISON TABLE */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 border border-navy/12 shadow-md">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy/8">
                <HelpCircle size={20} className="text-gold" />
                <h3 className="text-base font-extrabold text-navy uppercase tracking-wider">
                  Hızlı Karşılaştırma
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-navy/5 text-navy font-bold">
                      <th className="py-2.5 px-3 rounded-l-lg">Özellik</th>
                      <th className="py-2.5 px-3 text-gold">Tombul Form</th>
                      <th className="py-2.5 px-3 text-navy rounded-r-lg">İnce Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/8 text-navy/80 font-medium">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-navy">Yükseklik</td>
                      <td className="py-3 px-3 text-gold font-bold">14 – 15 cm</td>
                      <td className="py-3 px-3">8 – 11 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-navy">Ağırlık</td>
                      <td className="py-3 px-3 text-gold font-bold">1200 g (Dolgun)</td>
                      <td className="py-3 px-3">800 g (Hafif)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-navy">Kimler İçin İdeal?</td>
                      <td className="py-3 px-3 text-gold font-bold">Yan ve sırt üstü yatanlar</td>
                      <td className="py-3 px-3">Yüz üstü ve alçak yastık sevenler</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
