import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: "Serinletici jel yastık kimler için uygundur?",
    answer:
      "Gece uykusunda baş ve boyun bölgesinde terleme yaşayanlar, sıcak havalarda sık uyananlar, boyun fıtığı/düzleşmesi şikayeti olanlar ve ortopedik ergonomik destek arayan tüm kullanıcılar için idealdir.",
  },
  {
    question: "Jel katmanı zamanla özelliğini kaybeder mi?",
    answer:
      "Hayır. Pillow Market serinletici jel molekülleri termosensitif yapıya sahip olup ömür boyu ısı dengeleme özelliğini korur. 10 yıl şekil ve performans garantisi altındadır.",
  },
  {
    question: "Yastık kılıfı yıkanabilir mi?",
    answer:
      "Evet, fermuarlı dış kılıf kolayca çıkarılarak 40°C veya 60°C'de çamaşır makinesinde yıkanabilir. İç visco jel çekirdek ise nemli bezle silinerek hijyenik olarak temizlenebilir.",
  },
  {
    question: "Kaç günde teslim edilir?",
    answer:
      "Siparişleriniz aynı gün veya en geç 24 saat içerisinde kargoya verilir. Yurtiçi ve MNG Kargo güvencesiyle 1-3 iş günü içerisinde adresinize teslim edilmektedir.",
  },
  {
    question: "99 gece deneme nasıl çalışıyor?",
    answer:
      "Ürünü teslim aldığınız günden itibaren 99 gece boyunca kendi yatağınızda test edebilirsiniz. Memnun kalmamanız durumunda kargo ücreti ödemeden %100 kesintisiz iade hakkınız mevcuttur.",
  },
]

export function CategoryFAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-12 md:py-20 bg-white border-b border-navy/8">
      <div className="max-w-[840px] mx-auto px-4 md:px-6">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold font-extrabold text-[11px] uppercase tracking-wider mb-3">
            <HelpCircle size={14} />
            <span>SSS</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight">
            Sık Sorulan Sorular
          </h2>
        </div>

        {/* ACCORDION CARDS */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div
                key={index}
                className="bg-[#FAF8F5] rounded-2xl border border-navy/10 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 font-bold text-navy text-sm md:text-base hover:text-gold transition-colors cursor-pointer select-none"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 bg-gold text-white" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-5 md:px-5 md:pb-6 text-xs md:text-sm text-navy/70 leading-relaxed border-t border-navy/8 pt-3 animate-image-fade">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
