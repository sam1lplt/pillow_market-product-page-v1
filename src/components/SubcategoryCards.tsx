export type SubcategoryKey = "all" | "ekstra-soguk" | "boyun-destek" | "tombul-form" | "ince-form" | "seyahat"

interface SubcategoryCardsProps {
  activeSubcategory: SubcategoryKey
  onSelectSubcategory: (key: SubcategoryKey) => void
  counts: Record<SubcategoryKey, number>
}

const SUBCATEGORIES: Array<{ key: SubcategoryKey; label: string }> = [
  { key: "ekstra-soguk", label: "Ekstra Soğuk Jel" },
  { key: "boyun-destek", label: "Boyun Destekli" },
  { key: "tombul-form", label: "Tombul Form" },
  { key: "ince-form", label: "İnce Form" },
  { key: "seyahat", label: "Seyahat Tipi" },
]

export function SubcategoryCards({ activeSubcategory, onSelectSubcategory, counts }: SubcategoryCardsProps) {
  return (
    <div className="py-3 bg-[#FAF8F5]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {/* ALL BUTTON */}
          <button
            onClick={() => onSelectSubcategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSubcategory === "all"
                ? "bg-navy text-white shadow-2xs"
                : "bg-navy/5 hover:bg-navy/10 text-navy/70"
            }`}
          >
            Tüm Koleksiyon ({counts.all})
          </button>

          {SUBCATEGORIES.map((sub) => {
            const isSelected = activeSubcategory === sub.key
            const count = counts[sub.key] ?? 0

            return (
              <button
                key={sub.key}
                onClick={() => onSelectSubcategory(isSelected ? "all" : sub.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-navy text-white shadow-2xs"
                    : "bg-navy/5 hover:bg-navy/10 text-navy/70"
                }`}
              >
                <span>{sub.label}</span>
                <span className="ml-1.5 opacity-60 font-normal">({count})</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
