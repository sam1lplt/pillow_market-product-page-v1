import { useState } from "react"
import { ChevronDown, SlidersHorizontal, X, Check, RotateCcw } from "lucide-react"

export type SortOption = "bestseller" | "newest" | "price-asc" | "price-desc" | "rating"

interface StickyFilterBarProps {
  totalCount: number
  filteredCount: number
  selectedForm: string | null
  selectedSoftness: string | null
  sortOption: SortOption
  onSelectForm: (form: string | null) => void
  onSelectSoftness: (softness: string | null) => void
  onSelectSort: (sort: SortOption) => void
  onClearFilters: () => void
}

export function StickyFilterBar({
  totalCount,
  filteredCount,
  selectedForm,
  selectedSoftness,
  sortOption,
  onSelectForm,
  onSelectSoftness,
  onSelectSort,
  onClearFilters,
}: StickyFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showMobileSheet, setShowMobileSheet] = useState(false)

  const hasActiveFilters = Boolean(selectedForm || selectedSoftness)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const getFormLabel = (formKey: string) => {
    switch (formKey) {
      case "tombul": return "Tombul"
      case "ince": return "İnce"
      case "boyun": return "Boyun Desteği"
      case "seyahat": return "Seyahat"
      default: return formKey
    }
  }

  const getSoftnessLabel = (softnessKey: string) => {
    switch (softnessKey) {
      case "yumusak": return "Yumuşak"
      case "orta": return "Orta Sert"
      case "ekstra": return "Ekstra Yumuşak"
      default: return softnessKey
    }
  }

  return (
    <>
      <div className="sticky top-[64px] md:top-[96px] z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-navy/8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* DESKTOP FILTERS */}
          <div className="hidden md:flex items-center gap-2">
            {/* FORM FILTER */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("form")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  selectedForm
                    ? "bg-gold/20 text-navy font-bold"
                    : "bg-navy/5 text-navy/80 hover:bg-navy/10"
                }`}
              >
                <span>Yastık Formu{selectedForm ? `: ${getFormLabel(selectedForm)}` : ""}</span>
                <ChevronDown size={13} className={`transition-transform ${openDropdown === "form" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "form" && (
                <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-navy/10 p-2 z-50 animate-image-fade">
                  {[
                    { id: "tombul", label: "Tombul Form" },
                    { id: "ince", label: "İnce Form" },
                    { id: "boyun", label: "Boyun Destekli" },
                    { id: "seyahat", label: "Seyahat Tipi" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onSelectForm(selectedForm === opt.id ? null : opt.id)
                        setOpenDropdown(null)
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-navy hover:bg-[#FAF8F5] flex items-center justify-between cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      {selectedForm === opt.id && <Check size={14} className="text-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SOFTNESS FILTER */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("softness")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  selectedSoftness
                    ? "bg-gold/20 text-navy font-bold"
                    : "bg-navy/5 text-navy/80 hover:bg-navy/10"
                }`}
              >
                <span>Yumuşaklık{selectedSoftness ? `: ${getSoftnessLabel(selectedSoftness)}` : ""}</span>
                <ChevronDown size={13} className={`transition-transform ${openDropdown === "softness" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "softness" && (
                <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-navy/10 p-2 z-50 animate-image-fade">
                  {[
                    { id: "yumusak", label: "Yumuşak" },
                    { id: "orta", label: "Orta Sert" },
                    { id: "ekstra", label: "Ekstra Yumuşak" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onSelectSoftness(selectedSoftness === opt.id ? null : opt.id)
                        setOpenDropdown(null)
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-navy hover:bg-[#FAF8F5] flex items-center justify-between cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      {selectedSoftness === opt.id && <Check size={14} className="text-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ACTIVE REMOVABLE CHIPS */}
            {selectedForm && (
              <button
                onClick={() => onSelectForm(null)}
                className="px-2.5 py-1 rounded-full bg-gold text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{getFormLabel(selectedForm)}</span>
                <X size={12} />
              </button>
            )}

            {selectedSoftness && (
              <button
                onClick={() => onSelectSoftness(null)}
                className="px-2.5 py-1 rounded-full bg-gold text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{getSoftnessLabel(selectedSoftness)}</span>
                <X size={12} />
              </button>
            )}

            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs text-gold hover:text-navy transition-colors font-medium underline underline-offset-2 ml-1 cursor-pointer"
              >
                Temizle
              </button>
            )}
          </div>

          {/* MOBILE FILTER TRIGGER BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowMobileSheet(true)}
              className="px-3 py-1.5 rounded-full bg-navy text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal size={13} />
              <span>Filtrele {hasActiveFilters && "•"}</span>
            </button>
            {hasActiveFilters && (
              <button onClick={onClearFilters} className="text-xs font-bold text-gold">
                Temizle
              </button>
            )}
          </div>

          {/* RIGHT SIDE: COUNT & SORT DROPDOWN */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-navy/60 font-medium">
              <strong className="text-navy font-bold">{filteredCount}</strong> / {totalCount} ürün
            </span>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => onSelectSort(e.target.value as SortOption)}
                className="bg-transparent text-xs font-bold text-navy focus:outline-none cursor-pointer py-1 pr-2"
              >
                <option value="bestseller">Sırala: Çok Satanlar</option>
                <option value="rating">Sırala: En Yüksek Puanlı</option>
                <option value="price-asc">Sırala: Fiyat (Düşükten Yüksek)</option>
                <option value="price-desc">Sırala: Fiyat (Yüksekten Düşük)</option>
                <option value="newest">Sırala: En Yeniler</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET MODAL */}
      {showMobileSheet && (
        <div
          className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-image-fade"
          onClick={() => setShowMobileSheet(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-navy/10 pb-3">
              <h3 className="text-base font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-gold" />
                <span>Filtrele & Sırala</span>
              </h3>
              <button
                onClick={() => setShowMobileSheet(false)}
                className="w-7 h-7 rounded-full bg-navy/5 text-navy flex items-center justify-center cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* FORM OPTIONS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy/70 uppercase tracking-wider block">Yastık Formu</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "tombul", label: "Tombul Form" },
                  { id: "ince", label: "İnce Form" },
                  { id: "boyun", label: "Boyun Destekli" },
                  { id: "seyahat", label: "Seyahat Tipi" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onSelectForm(selectedForm === opt.id ? null : opt.id)}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedForm === opt.id
                        ? "bg-navy text-white font-bold"
                        : "bg-slate-100 text-navy hover:bg-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SOFTNESS OPTIONS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy/70 uppercase tracking-wider block">Yumuşaklık Derecesi</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "yumusak", label: "Yumuşak" },
                  { id: "orta", label: "Orta Sert" },
                  { id: "ekstra", label: "Ekstra Yumuşak" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onSelectSoftness(selectedSoftness === opt.id ? null : opt.id)}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedSoftness === opt.id
                        ? "bg-navy text-white font-bold"
                        : "bg-slate-100 text-navy hover:bg-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-3 border-t border-navy/10 flex items-center gap-3">
              <button
                onClick={() => {
                  onClearFilters()
                  setShowMobileSheet(false)
                }}
                className="flex-1 py-3 rounded-xl border border-navy/20 text-navy font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Temizle</span>
              </button>
              <button
                onClick={() => setShowMobileSheet(false)}
                className="flex-1 py-3 rounded-xl bg-navy text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Sonuçları Gör ({filteredCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
