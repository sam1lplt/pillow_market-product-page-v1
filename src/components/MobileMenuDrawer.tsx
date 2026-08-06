import { X, Sparkles, ChevronRight, Home, Grid, Search, Heart, ShieldCheck, Truck, Phone } from "lucide-react"

interface MobileMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToHome: () => void
  onNavigateToCategory: () => void
  onOpenQuizModal: () => void
  onOpenSearchModal: () => void
}

export function MobileMenuDrawer({
  isOpen,
  onClose,
  onNavigateToHome,
  onNavigateToCategory,
  onOpenQuizModal,
  onOpenSearchModal,
}: MobileMenuDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-[85%] max-w-[340px] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideRight">
        {/* Header */}
        <div className="p-4 border-b border-navy/10 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Pillow Market" className="h-9 object-contain" />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-navy/60 hover:text-navy hover:bg-navy/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="p-4 border-b border-navy/5">
          <button
            onClick={() => {
              onClose()
              onOpenSearchModal()
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-navy/5 text-navy/50 text-xs font-medium hover:bg-navy/10 transition-colors"
          >
            <Search size={16} className="text-gold" />
            <span>Yastık ara...</span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <button
            onClick={() => {
              onNavigateToHome()
              onClose()
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-navy/5 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center text-navy">
                <Home size={18} />
              </div>
              <span className="text-sm font-bold text-navy">Ana Sayfa</span>
            </div>
            <ChevronRight size={16} className="text-navy/30 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              onNavigateToCategory()
              onClose()
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-navy/5 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center text-navy">
                <Grid size={18} />
              </div>
              <div>
                <span className="text-sm font-bold text-navy block">Tüm Yastıklar</span>
                <span className="text-[10px] text-navy/50 font-medium">24 Ürün Çeşidi</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-navy/30 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Subcategories (all go to 24 products) */}
          <div className="pl-11 pr-2 space-y-1 pt-1 pb-2 border-l-2 border-navy/10 ml-5 my-1">
            {[
              { label: "Serinletici Jel Yastıklar" },
              { label: "Ergonomik Visco Yastıklar" },
              { label: "Seyahat Yastıkları" },
            ].map((sub, i) => (
              <button
                key={i}
                onClick={() => {
                  onNavigateToCategory()
                  onClose()
                }}
                className="w-full text-left py-2 px-3 text-xs font-semibold text-navy/70 hover:text-navy hover:bg-navy/5 rounded-lg transition-colors block"
              >
                {sub.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onClose()
              onOpenQuizModal()
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gold/15 text-navy border border-gold/30 hover:bg-gold/25 transition-colors text-left mt-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold text-navy flex items-center justify-center font-bold">
                <Sparkles size={18} />
              </div>
              <div>
                <span className="text-xs font-extrabold block text-navy">Yastık Seçim Asistanı</span>
                <span className="text-[10px] text-navy/70 font-medium">3 Soruda İdeal Yastığını Bul</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-gold" />
          </button>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-navy/10 bg-[#FAF8F5] space-y-2 text-xs text-navy/60">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-gold" />
            <span>Tüm Türkiye'ye Ücretsiz Kargo</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-gold" />
            <span>30 Gün Hijyenik İade Garantisi</span>
          </div>
        </div>
      </div>
    </div>
  )
}
