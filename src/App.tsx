import { useState, useEffect, useRef } from "react"
import {
  Moon,
  ThermometerSnowflake,
  Cloud,
  ShieldCheck,
  Recycle,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Box,
  Gift,
  Package,
  Shield,
  Heart,
  Wind,
  Stethoscope,
  Flame,
  RotateCcw,
  Activity,
  Award,
  Sliders,
  HelpCircle,
  Sparkle,
  ArrowRight,
} from "lucide-react"

type Softness = "yumusak" | "extra"
type Shipping = "rollpack" | "keten" | "kutu"
type ProductId = "jelli" | "softy" | "ergo"

const SHIPPING_OPTIONS = [
  { id: "rollpack" as const, label: "Şeffaf Roll Pack", desc: "Vakumlu sıkıştırılmış, hacim kaybetmez", price: 0, icon: Package },
  { id: "keten" as const, label: "Keten Çanta", desc: "Geri dönüştürülebilir, hediye uyumlu", price: 100, icon: Box },
  { id: "kutu" as const, label: "Craft Kutu", desc: "Premium karton kutu, hediye bandı dahil", price: 250, icon: Gift },
]

const formatPrice = (p: number) => `₺${p.toLocaleString("tr-TR")}`

function GoldIcon({ Icon }: { Icon: any }) {
  return <Icon size={20} strokeWidth={1.5} className="text-gold" />
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C79C6C" stroke="#C79C6C" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const PRODUCTS: Record<ProductId, any> = {
  jelli: {
    id: "jelli",
    name: "Jelli Serinletici Visco Yastık",
    shortName: "Jelli Serinletici",
    series: "JEL TEKNOLOJİSİ SERİSİ",
    badge1: "JELLİ SERİNLETİCİ",
    badge2: "4–5°C SERİNLİK",
    basePrice: 1290,
    rating: 4.9,
    reviewCount: 1284,
    images: [
      { src: "/images/product-hero.jpg", label: "Kapak", desc: "Jelli Serinletici Visco Yastık" },
      { src: "/images/product-model.jpg", label: "Kullanım", desc: "Gece Boyu Serinlik" },
      { src: "/images/product-layers.png", label: "Katmanlar", desc: "Teknoloji Şeması" },
      { src: "/images/product-gel-detail.jpg", label: "Jel Teknolojisi", desc: "4-5°C Serinlik Hissi" },
      { src: "/images/product-dimensions.jpg", label: "Ölçüler", desc: "40 × 60 × 15 cm" },
    ],
    forms: [
      { id: "tombul", label: "Tombul", sub: "60×40×15 cm · 1200g", priceDelta: 0 },
      { id: "ince", label: "İnce", sub: "60×40×11 cm · 800g", priceDelta: -100 },
    ],
    softnessOpts: [
      { id: "yumusak", label: "Yumuşak", sub: "Hafif, havadar his", extra: "", priceDelta: 0 },
      { id: "extra", label: "Ekstra Yumuşak", sub: "Derin batma hissi", extra: "+₺200", priceDelta: 200 },
    ],
    formLabel: "Yastık Formu",
    features: [
      { icon: ThermometerSnowflake, title: "Soğuk Jel Katmanı", desc: "4–5°C daha serin uyku deneyimi" },
      { icon: Moon, title: "Visco Çekirdek", desc: "Boyun ve başı ergonomik destekler" },
      { icon: Cloud, title: "Nefes Alan Kumaş", desc: "Hava dolaşımını kesintisiz destekler" },
      { icon: Box, title: "İdeal Ölçüler", desc: "40 × 60 × 15 cm ergonomik form" },
      { icon: ShieldCheck, title: "Anti-Alerjik Yapı", desc: "Hijyenik ve bakterilere karşı korumalı" },
      { icon: Recycle, title: "Sürdürülebilir Lifler", desc: "Geri dönüştürülebilir dokuma yapı" },
    ],
    stats: [
      { val: "94%", label: "BOYUN AĞRISI AZALMASI" },
      { val: "−4°C", label: "YÜZEY SICAKLIĞI FARKI" },
      { val: "10 yıl", label: "ŞEKİL GARANTİSİ" },
      { val: "OEKO-TEX", label: "SERTİFİKALI ÜRETİM" },
    ],
    statBandTitle: "10 Yıllık Ar-Ge'nin Ürünü",
    statBandDesc: "Termosensitif jel ve visco bellek köpüğünü birleştiren çift katmanlı mimari; ısı dengeleme ve ergonomik destek için ayrı ayrı hesaplanmış destek.",
    showcaseTitle: "Yenilikçi Jel Yapısını Keşfedin",
    showcaseSubtitle: "TEKNOLOJİ VE ÜSTÜN ÖZELLİKLER",
    showcaseDesc: "Derin ve kesintisiz uyku sunan 3 özel detay. Her katmanda üstün termal konfor ve ergonomik boyun desteği.",
    showcaseRows: [
      {
        num: "01", label: "ÜÇLÜ DESTEK YAPISI", title: "3 Katmanlı Ergonomik Yapı",
        desc: "Nefes alan kılıf, serinletici soğuk jel katmanı ve yüksek yoğunluklu visco çekirdek bir arada. Boyun ve omurga hizanızı kusursuz dengede tutar.",
        img: "/images/product-layers.png", imgLabel: "01 / KATMAN ŞEMASI", imgAlt: "Yastık Katmanları", imgSide: "left",
        bullets: [
          { title: "Nefes Alan Kumaş Kılıf", sub: "Hava dolaşımını kesintisiz destekler, terletmez" },
          { title: "Soğuk Jel Katmanı", sub: "İlk temasta ve gece boyu serinlik sunar" },
          { title: "Visco Ergonomik Çekirdek", sub: "Boyun eğrisini kavrar ve basıyı %40 azaltır" },
        ],
        highlight: null, specs: null,
      },
      {
        num: "02", label: "TERLEMEYİ ÖNLEYEN JEL", title: "4–5°C Serinlik Deneyimi",
        desc: "Özel termosensitif jel molekülleri vücudun fazla ısısını emerek gece boyunca terleme ve uyanmaları önler. Her mevsim ferah bir uyku sağlar.",
        img: "/images/product-gel-detail.jpg", imgLabel: "02 / AKILLI SOĞUTMA", imgAlt: "Serinletici Jel Teknolojisi", imgSide: "right",
        bullets: null,
        highlight: { val: "-5°C", title: "Termal Isı Dengeleme Teknolojisi", sub: "Klasik pamuk yastıklara göre belirgin ferahlık hissi" },
        specs: null,
      },
      {
        num: "03", label: "ERGONOMİK BOYUN DESTEĞİ", title: "40 × 60 × 15 cm İdeal Ölçüler",
        desc: "Tüm standart ev kılıflarıyla %100 uyumlu ergonomik boyutlar. Hem yan hem sırt üstü yatanlar için omurgayı hizalayan 15 cm ideal yükseklik.",
        img: "/images/product-dimensions.jpg", imgLabel: "03 / STANDART ÖLÇÜLER", imgAlt: "Visco Yastık Ölçüleri", imgSide: "left",
        bullets: null, highlight: null,
        specs: [{ val: "40 cm", label: "En" }, { val: "60 cm", label: "Boy" }, { val: "15 cm", label: "Yükseklik" }],
      },
    ],
    techCards: [
      { icon: Sparkles, title: "Visco-Elastik Çekirdek", desc: "Basıncı %40 daha eşit dağıtan bellek köpüğü. Geceleri şeklini kaybetmez." },
      { icon: ThermometerSnowflake, title: "ArcticTouch™ Yüzey", desc: "Nano-kapsüllü serinletici fiber. İlk temasta ve gece boyunca serin kalır." },
      { icon: Cloud, title: "AirChannel™ Sirkülasyon", desc: "Mikro hava kanalları nem birikimini ve kokuyu önler. 3D örgü ara katman." },
      { icon: Shield, title: "SilverShield™", desc: "Bakteri üremesini engeller. Alerji hastaları için önerilir." },
      { icon: Box, title: "ErgoZone™ Destek", desc: "Farklı bölgelerde farklı yoğunluk: merkez sert destek, çevre yumuşak sarım." },
      { icon: Recycle, title: "Sürdürülebilir Ambalaj", desc: "Geri dönüştürülebilir ve doğa dostu ambalajlama." },
    ],
    comparisonName: "Visco Akıllı Yastık",
    comparisonRows: [
      { f: "Serinletici Yüzey", v: "ArcticTouch™", s: "Yok", g: "Yok" },
      { f: "Boyun Desteği", v: "ErgoZone™", s: "Tek yoğunluk", g: "Yetersiz" },
      { f: "Anti-Alerjik", v: "SilverShield™", s: "Kısmi", g: "Yok" },
      { f: "Hava Sirkülasyonu", v: "AirChannel™ 3D", s: "Yoğun köpük", g: "Orta" },
      { f: "Şekil Garantisi", v: "10 yıl", s: "2 yıl", g: "6 ay" },
      { f: "OEKO-TEX®", v: "Var", s: "Yok", g: "Yok" },
    ],
    crossSell: [
      { id: "softy", name: "Softy Visco Yastık", price: "₺990", img: "/images/softy-1.png", tag: "Bulut Yumuşaklığı", isProduct: true },
      { id: "ergo", name: "ErgoPro Medikal Fıtık Yastığı", price: "₺1.190", img: "/images/product-layers.png", tag: "Boyun Fıtığı Özel", isProduct: true },
    ],
  },

  softy: {
    id: "softy",
    name: "Softy Visco Yastık",
    shortName: "Softy Comfort",
    series: "SOFTY COMFORT SERİSİ",
    badge1: "SOFTY COMFORT",
    badge2: "EKSTRA YUMUŞAK",
    basePrice: 990,
    rating: 4.8,
    reviewCount: 876,
    images: [
      { src: "/images/softy-1.png", label: "Kapak", desc: "Softy Visco Yastık" },
      { src: "/images/softy-2.png", label: "Kullanım", desc: "Derin Konfor Uykusu" },
      { src: "/images/softy-3.png", label: "Katmanlar", desc: "Ergonomik Visco Yapı" },
      { src: "/images/softy-4.png", label: "Detay", desc: "Özel Kumaş Dokusu" },
      { src: "/images/softy-5.png", label: "Ölçüler", desc: "50 × 70 × 14 cm" },
    ],
    forms: [
      { id: "tombul", label: "Tombul Yastık", sub: "50×70×14 cm · 1050g", priceDelta: 0 },
      { id: "tekboyun", label: "Tek Boyun Destekli", sub: "50×70×17 cm · 1300g", priceDelta: 150 },
    ],
    softnessOpts: [
      { id: "yumusak", label: "Standart Yumuşak", sub: "Dengeli destek ve konfor", extra: "", priceDelta: 0 },
      { id: "extra", label: "Ekstra Yumuşak", sub: "Bulut gibi yumuşaklık", extra: "+₺180", priceDelta: 180 },
    ],
    formLabel: "Çekirdek Tipi",
    features: [
      { icon: Heart, title: "Ultra Yumuşak Visco", desc: "Bulut gibi saran bellek köpüğü çekirdeği" },
      { icon: Moon, title: "Ergonomik Boyun Desteği", desc: "Boyun eğrisini doğal pozisyonda tutar" },
      { icon: Wind, title: "Nefes Alan Kılıf", desc: "60°C yıkanabilir anti-alerjik dokuma" },
      { icon: Box, title: "Standart Ölçüler", desc: "50 × 70 × 14 cm — tüm kılıflarla uyumlu" },
      { icon: ShieldCheck, title: "Anti-Alerjik Yapı", desc: "Hijyenik ve bakterilere karşı korumalı" },
      { icon: Recycle, title: "Sürdürülebilir Üretim", desc: "OEKO-TEX® sertifikalı malzeme" },
    ],
    stats: [
      { val: "89%", label: "BOYUN AĞRISI AZALMASI" },
      { val: "Ultra", label: "YUMUŞAKLIK SINIFI" },
      { val: "10 yıl", label: "ŞEKİL GARANTİSİ" },
      { val: "OEKO-TEX", label: "SERTİFİKALI ÜRETİM" },
    ],
    statBandTitle: "Konforun Yeni Tanımı",
    statBandDesc: "Yüksek yoğunluklu ultra yumuşak visco formülü ve ergonomik boyun kanalı ile hem yan hem sırt üstü yatanlar için mükemmel uyku pozisyonu.",
    showcaseTitle: "Softy'nin Yumuşaklık Sırrı",
    showcaseSubtitle: "KONFOR VE ÜSTÜN ÖZELLİKLER",
    showcaseDesc: "Üç katmanlı konfor mimarisi ile her gece bulut üzerinde uyumanın hissi. Ergonomik tasarım ve ultra yumuşak visco bir arada.",
    showcaseRows: [
      {
        num: "01", label: "ULTRA YUMUŞAK YAPI", title: "3 Katmanlı Konfor Mimarisi",
        desc: "Nefes alan kılıf, ergonomik boyun kanalı ve ultra yumuşak visco çekirdek bir arada. Hem yan hem sırt üstü yatanlar için mükemmel destek.",
        img: "/images/softy-3.png", imgLabel: "01 / KATMAN ŞEMASI", imgAlt: "Softy Katmanları", imgSide: "left",
        bullets: [
          { title: "60°C Yıkanabilir Kılıf", sub: "Anti-alerjik dokuma, her mevsim ferah" },
          { title: "Ergonomik Boyun Kanalı", sub: "Boyun eğrisini doğal pozisyonda tutar" },
          { title: "Ultra Yumuşak Visco Çekirdek", sub: "Bulut gibi saran bellek köpüğü" },
        ],
        highlight: null, specs: null,
      },
      {
        num: "02", label: "ERGONOMİK BOYUN KANALI", title: "Yan ve Sırt Yatanlara Özel",
        desc: "Softy'nin patentli ergonomik boyun kanalı her uyku pozisyonuna uyum sağlar. Sabah boyun ve omuz ağrısına son.",
        img: "/images/softy-2.png", imgLabel: "02 / ERGONOMİK DESTEK", imgAlt: "Softy Ergonomik Boyun Desteği", imgSide: "right",
        bullets: null,
        highlight: { val: "180°", title: "Omurga Hizalama Teknolojisi", sub: "Boyun me omurgayı her pozisyonda destekler" },
        specs: null,
      },
      {
        num: "03", label: "STANDART ÖLÇÜLER", title: "50 × 70 × 14 cm İdeal Form",
        desc: "Tüm standart ev kılıflarıyla %100 uyumlu. Klasik ve yüksek profil seçenekleriyle kişisel uyku ihtiyacınıza göre özelleştirilebilir.",
        img: "/images/softy-4.png", imgLabel: "03 / ÖLÇÜLER", imgAlt: "Softy Yastık Ölçüleri", imgSide: "left",
        bullets: null, highlight: null,
        specs: [{ val: "50 cm", label: "En" }, { val: "70 cm", label: "Boy" }, { val: "14 cm", label: "Yükseklik" }],
      },
    ],
    techCards: [
      { icon: Heart, title: "UltraSoft™ Visco", desc: "Özel düşük yoğunluklu bellek köpüğü. Baskı noktalarını %50 azaltır." },
      { icon: Moon, title: "ErgoNeck™ Kanal", desc: "Boyun eğrisine göre şekillenen ergonomik boyun kanalı. Sabah ağrısız uyanış." },
      { icon: Wind, title: "AirFlow™ Kumaş", desc: "3D dokuma kılıf. Nem çeker, serinletir ve 60°C'de yıkanabilir." },
      { icon: Shield, title: "SilverShield™", desc: "Bakteri üremesini engeller. Alerji hastaları ve çocuklar için güvenli." },
      { icon: Sparkles, title: "DualZone™ Destek", desc: "Baş bölgesi yumuşak sarım, boyun bölgesi sert destek — iki bölgeli konfor." },
      { icon: Recycle, title: "Sürdürülebilir Üretim", desc: "OEKO-TEX® sertifikalı, geri dönüştürülebilir ambalaj." },
    ],
    comparisonName: "Softy Visco Yastık",
    comparisonRows: [
      { f: "Yumuşaklık Sınıfı", v: "UltraSoft™", s: "Standart", g: "Değişken" },
      { f: "Boyun Desteği", v: "ErgoNeck™ Kanal", s: "Tek yoğunluk", g: "Yetersiz" },
      { f: "Anti-Alerjik", v: "SilverShield™", s: "Kısmi", g: "Yok" },
      { f: "Hava Sirkülasyonu", v: "AirFlow™ 3D", s: "Yoğun köpük", g: "Orta" },
      { f: "Şekil Garantisi", v: "10 yıl", s: "2 yıl", g: "6 ay" },
      { f: "OEKO-TEX®", v: "Var", s: "Yok", g: "Yok" },
    ],
    crossSell: [
      { id: "jelli", name: "Jelli Serinletici Visco Yastık", price: "₺1.290", img: "/images/product-hero.jpg", tag: "Serinletici Jel", isProduct: true },
      { id: "ergo", name: "ErgoPro Medikal Fıtık Yastığı", price: "₺1.190", img: "/images/product-layers.png", tag: "Boyun Fıtığı Özel", isProduct: true },
    ],
  },

  ergo: {
    id: "ergo",
    name: "ErgoPro Medikal Fıtık Yastığı",
    shortName: "ErgoPro Medikal",
    series: "MEDİKAL & ERGONOMİ SERİSİ",
    badge1: "BOYUN FITIĞI ÖZEL",
    badge2: "%98 UYUM",
    basePrice: 1190,
    rating: 4.95,
    reviewCount: 1540,
    images: [
      { src: "/images/product-layers.png", label: "Kapak", desc: "ErgoPro Medikal Fıtık Yastığı" },
      { src: "/images/product-model.jpg", label: "Kullanım", desc: "Anatomik Boyun Desteği" },
      { src: "/images/product-dimensions.jpg", label: "Ölçüler", desc: "60 × 40 × 13/10 cm (Çift Kavis)" },
      { src: "/images/product-hero.jpg", label: "Katmanlar", desc: "Çift Yükseklik Profili" },
      { src: "/images/product-gel-detail.jpg", label: "Bambu Kılıf", desc: "Anti-Alerjik Dokuma" },
    ],
    forms: [
      { id: "ciftkavis", label: "Çift Kavisli Form", sub: "60×40×13/10 cm · 1300g", priceDelta: 0 },
      { id: "duzmedikal", label: "Düz Medikal Form", sub: "60×40×11 cm · 1100g", priceDelta: -100 },
    ],
    softnessOpts: [
      { id: "yumusak", label: "Orta Sert Ortopedik", sub: "Ideal omurga desteği", extra: "", priceDelta: 0 },
      { id: "extra", label: "Ekstra Yoğun Medikal", sub: "Tam boyun sabitleme", extra: "+₺150", priceDelta: 150 },
    ],
    formLabel: "Medikal Form Tipi",
    features: [
      { icon: ShieldCheck, title: "Boyun Fıtığı Desteği", desc: "Omurga disklerine binen baskıyı %94 azaltır" },
      { icon: Moon, title: "Anatomik Cervical Oluk", desc: "Baş ve boyun eğrisini milimetrik destekler" },
      { icon: Cloud, title: "Nefes Alan Bambu Kılıf", desc: "Alerjen barındırmayan %100 doğal lif doku" },
      { icon: Box, title: "Çift Yükseklik Profili", desc: "13 cm & 10 cm çift taraflı kullanım ergonomisi" },
      { icon: Shield, title: "Ortopedik Onaylı", desc: "Fizyoterapist ve ortopedi uzmanları önerisi" },
      { icon: Recycle, title: "10 Yıl Şekil Garantisi", desc: "Çökme yapmayan yüksek yoğunluklu visco" },
    ],
    stats: [
      { val: "%98", label: "BOYUN AĞRISINDA AZALMA" },
      { val: "13/10", label: "ÇİFT KAVİSLİ YÜKSEKLİK" },
      { val: "10 Yıl", label: "ŞEKİL GARANTİSİ" },
      { val: "OEKO-TEX", label: "MEDİKAL SERTİFİKALI" },
    ],
    statBandTitle: "Fizyoterapist Onaylı Medikal Konfor",
    statBandDesc: "Boyun fıtığı, servikal lordoz düzleşmesi ve kronik tutulma yaşayanlar için özel anatomik oluk ve çift kavisli profil.",
    showcaseTitle: "ErgoPro'nun Anatomi Teknolojisi",
    showcaseSubtitle: "MEDİKAL & ERGONOMİK ÇÖZÜM",
    showcaseDesc: "Omurgaya binen yükü gece boyunca sıfırlayan özel servikal oluk mimarisi. Gece boyunca ideal hizada bir uyku duruşu.",
    showcaseRows: [
      {
        num: "01", label: "SERVİKAL ANATOMİK OLUK", title: "Omurga Disklerini Rahatlatan Form",
        desc: "Özel eğimli merkez oluğu sayesinde başınız doğru derinliğe oturur, boyun omurları doğal kavisini korur.",
        img: "/images/product-layers.png", imgLabel: "01 / ANATOMİK DOKU", imgAlt: "ErgoPro Oluk Şeması", imgSide: "left",
        bullets: [
          { title: "Çift Yükseklik Eğim Katmanı", sub: "Hem yüksek hem alçak yastık sevenler için 2 farklı taraf" },
          { title: "Basınç Dağıtıcı Visco", sub: "Omuz ve boyun kaslarındaki gerginliği 15 dakikada çözer" },
          { title: "Medikal Bambu Kılıf", sub: "Hassas ciltler için yıkanabilir anti-bakteriyel kumaş" },
        ],
        highlight: null, specs: null,
      },
      {
        num: "02", label: "FITIK & AĞRI UYUMU", title: "%98 Kullanıcı Memnuniyeti",
        desc: "Klinik değerlendirmelerde boyun ağrısı ve fıtık kaynaklı uykusuzluk şikayetlerinde ilk 7 günde belirgin azalma tespit edilmiştir.",
        img: "/images/product-model.jpg", imgLabel: "02 / ANATOMİK DESTEK", imgAlt: "Boyun Fıtığı Destek", imgSide: "right",
        bullets: null,
        highlight: { val: "%98", title: "Klinik Ağrı Azalma Oranı", sub: "Fizyoterapi hastalarında test edilmiştir" },
        specs: null,
      },
      {
        num: "03", label: "ÇİFT KAVİSLİ ÖLÇÜ", title: "60 × 40 × 13/10 cm Çift Profil",
        desc: "Yastığın bir tarafı 13 cm yüksekliğinde yan yatanlar için, diğer tarafı 10 cm yüksekliğinde sırt üstü yatanlar için tasarlanmıştır.",
        img: "/images/product-dimensions.jpg", imgLabel: "03 / ÇİFT PROFİL", imgAlt: "ErgoPro Ölçüler", imgSide: "left",
        bullets: null, highlight: null,
        specs: [{ val: "60 cm", label: "En" }, { val: "40 cm", label: "Boy" }, { val: "13/10 cm", label: "Yükseklik" }],
      },
    ],
    techCards: [
      { icon: ShieldCheck, title: "CervicalContour™", desc: "Boyun omurlarını sıfır basınç ile kavrayan özel oluk tasarımı." },
      { icon: Sparkles, title: "HighDense™ Visco", desc: "75 kg/m³ yoğunluğunda medikal visco foam. Çökme yapmaz." },
      { icon: Wind, title: "BambooTouch™ Kılıf", desc: "Doğal bambu lifli anti-alerjik yıkanabilir kılıf." },
      { icon: Shield, title: "SilverShield™", desc: "Bakteri ve akar üremesine karşı %99.9 hijyenik koruma." },
      { icon: Box, title: "DualHeight™", desc: "İki farklı yükseklik opsiyonu tek yastıkta." },
      { icon: Recycle, title: "10 Yıl Garanti", desc: "Sarkma ve çökme garantili medikal köpük kalitesi." },
    ],
    comparisonName: "ErgoPro Medikal",
    comparisonRows: [
      { f: "Boyun Fıtığı Desteği", v: "CervicalContour™", s: "Yetersiz", g: "Yok" },
      { f: "Çift Yükseklik Profili", v: "13 / 10 cm", s: "Tek Yükseklik", g: "Değişken" },
      { f: "Anti-Alerjik", v: "SilverShield™ Bambu", s: "Kısmi", g: "Yok" },
      { f: "Hava Sirkülasyonu", v: "AirFlow™ 3D", s: "Köpük", g: "Orta" },
      { f: "Şekil Garantisi", v: "10 yıl Medikal", s: "2 yıl", g: "6 ay" },
      { f: "OEKO-TEX®", v: "Var (Medikal Class)", s: "Yok", g: "Yok" },
    ],
    crossSell: [
      { id: "jelli", name: "Jelli Serinletici Visco Yastık", price: "₺1.290", img: "/images/product-hero.jpg", tag: "Serinletici Jel", isProduct: true },
      { id: "softy", name: "Softy Visco Yastık", price: "₺990", img: "/images/softy-1.png", tag: "Bulut Yumuşaklığı", isProduct: true },
    ],
  },
}

function PillowAssistant({
  onSelectProduct,
  onOpenConfig,
  isModal = false,
  onCloseModal,
}: {
  onSelectProduct: (id: ProductId) => void
  onOpenConfig: () => void
  isModal?: boolean
  onCloseModal?: () => void
}) {
  const [step, setStep] = useState(0) // 0: Presets/Intro, 1: Neck, 2: Sweat, 3: Position, 4: Firmness, 5: Result
  const [answers, setAnswers] = useState({
    neck: "",
    sweat: "",
    position: "",
    firmness: "",
  })
  const [recommendedId, setRecommendedId] = useState<ProductId>("ergo")
  const [matchScore, setMatchScore] = useState(98)
  const [matchReasons, setMatchReasons] = useState<string[]>([])

  const calculateResult = (finalAnswers: typeof answers) => {
    let scores = { ergo: 0, jelli: 0, softy: 0 }

    if (finalAnswers.neck === "fitik") scores.ergo += 5
    else if (finalAnswers.neck === "tutulma") { scores.ergo += 3; scores.jelli += 2 }
    else { scores.softy += 2; scores.jelli += 2 }

    if (finalAnswers.sweat === "cok") scores.jelli += 5
    else if (finalAnswers.sweat === "orta") { scores.jelli += 3; scores.ergo += 1 }
    else { scores.softy += 2; scores.ergo += 2 }

    if (finalAnswers.position === "sirt") scores.ergo += 3
    else if (finalAnswers.position === "yan") { scores.jelli += 2; scores.softy += 2 }
    else { scores.softy += 4 }

    if (finalAnswers.firmness === "medikal") scores.ergo += 4
    else if (finalAnswers.firmness === "jel") scores.jelli += 4
    else scores.softy += 4

    let bestId: ProductId = "ergo"
    let max = -1
    for (const [key, val] of Object.entries(scores)) {
      if (val > max) {
        max = val
        bestId = key as ProductId
      }
    }

    const reasons: string[] = []
    if (finalAnswers.neck === "fitik") {
      reasons.push("Boyun fıtığı ve omurga disk yükünü %94 azaltan anatomik oluk desteği")
    } else if (finalAnswers.neck === "tutulma") {
      reasons.push("Sabah boyun tutulmalarını önleyen ergonomik bellek köpüğü dokusu")
    }

    if (finalAnswers.sweat === "cok") {
      reasons.push("Gece terlemelerini önleyen 4–5°C serinletici termosensitif jel teknolojisi")
    } else if (finalAnswers.sweat === "orta") {
      reasons.push("Nem birikimini önleyen AirChannel™ 3D nefes alan kılıf yapısı")
    }

    if (finalAnswers.position === "sirt") {
      reasons.push("Sırt üstü yatışlarda omurga hiza açısını 180° koruyan dual-height kavis")
    } else if (finalAnswers.position === "yan") {
      reasons.push("Yan yatışlarda omuz çökmesini engelleyen ideal profil yüksekliği")
    } else if (finalAnswers.position === "donerek") {
      reasons.push("Dönerek yatanlar için basıyı sıfırlayan bulut yumuşaklığında visco çekirdek")
    }

    if (reasons.length < 2) {
      if (bestId === "ergo") reasons.push("Fizyoterapist onaylı medikal cervical oluk teknolojisi")
      if (bestId === "jelli") reasons.push("ArcticTouch™ serinletici yüzey ve hava dolaşımlı doku")
      if (bestId === "softy") reasons.push("UltraSoft™ özel bulut hisli visco çekirdek")
    }

    setRecommendedId(bestId)
    setMatchReasons(reasons)
    setMatchScore(97 + Math.floor(Math.random() * 3))
    setStep(5)
  }

  const handleSelectAnswer = (key: keyof typeof answers, val: string, nextStep: number) => {
    const updated = { ...answers, [key]: val }
    setAnswers(updated)
    if (nextStep <= 4) {
      setStep(nextStep)
    } else {
      calculateResult(updated)
    }
  }

  const applyPreset = (presetId: ProductId, presetAnswers: typeof answers) => {
    setAnswers(presetAnswers)
    calculateResult(presetAnswers)
  }

  const resetQuiz = () => {
    setAnswers({ neck: "", sweat: "", position: "", firmness: "" })
    setStep(0)
  }

  const recProduct = PRODUCTS[recommendedId]

  return (
    <div className={`w-full ${isModal ? "bg-white rounded-2xl p-6 md:p-8 max-w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl border border-navy/15 relative" : "bg-[#FAF8F5] rounded-3xl p-6 md:p-10 border border-gold/30 shadow-sm relative overflow-hidden"}`}>
      {isModal && onCloseModal && (
        <button onClick={onCloseModal} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-navy/5 hover:bg-navy/10 text-navy flex items-center justify-center transition-colors cursor-pointer z-10">
          <X size={18} />
        </button>
      )}

      {/* HEADER */}
      <div className="text-center max-w-[620px] mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold font-bold text-[11px] uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-gold" />
          <span>AKILLI YASTIK REHBERİ</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-2">
          Hangi Yastık Sana Uygun?
        </h3>
        <p className="text-xs md:text-sm text-navy/70 leading-relaxed">
          Boyun fıtığı, gece terlemesi ve uyku alışkanlıklarınıza göre 3 soruda kişiselleştirilmiş yastığınızı bulun.
        </p>
      </div>

      {/* STEP 0: START QUIZ */}
      {step === 0 && (
        <div className="space-y-6 animate-image-fade max-w-[640px] mx-auto text-center">
          <div className="bg-white border border-navy/10 rounded-2xl p-8 space-y-5 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
              <Sparkles size={28} />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-navy mb-2">4 Adımda Size Özel İdeal Yastığı Bulalım</h4>
              <p className="text-xs md:text-sm text-navy/65 max-w-[480px] mx-auto leading-relaxed">
                Boyun sağlığınız, gece terlemesi şikayetiniz, yatış pozisyonunuz ve sertlik tercihinizi değerlendirip %100 uyumlu yastık modelinizi eşleştirelim.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="bg-navy hover:bg-navy/90 text-white text-xs md:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Testi Başlat (30 Saniye)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: BOYUN & OMUZ SAĞLIĞI */}
      {step === 1 && (
        <div className="space-y-6 animate-image-fade max-w-[640px] mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-navy/60 border-b border-navy/8 pb-3">
            <span>SORU 1 / 4</span>
            <span className="text-gold font-mono">ADIM %25</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-navy mb-1">Boyun ve Omurga Şikayetiniz Var mı?</h4>
            <p className="text-xs text-navy/65">Boyun sağlığınız için en ideal eğim ve sertlik seviyesini belirliyoruz.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: "fitik", icon: Stethoscope, title: "Evet, boyun fıtığı / düzleşme veya fıtık başlangıcı var", sub: "Omurga disklerini rahatlatacak ortopedik oluklu destek gereklidir." },
              { id: "tutulma", icon: Activity, title: "Sık sık sabah tutulması ve omuz ağrısı yaşıyorum", sub: "Kas gerginliğini azaltan orta sertlikte ergonomik bellek köpüğü." },
              { id: "yok", icon: Heart, title: "Belirgin bir ağrım yok, genel konfor ve rahatlık arıyorum", sub: "Dengeli destek ve yumuşak sarım hissiyatı." },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectAnswer("neck", opt.id, 2)}
                className="w-full text-left p-4 rounded-xl border-2 border-navy/10 hover:border-gold bg-white hover:bg-[#FAF6F0]/40 transition-all flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <opt.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{opt.title}</p>
                  <p className="text-xs text-navy/60 mt-0.5">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: GECE TERLEMESİ & SICAKLIK */}
      {step === 2 && (
        <div className="space-y-6 animate-image-fade max-w-[640px] mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-navy/60 border-b border-navy/8 pb-3">
            <span>SORU 2 / 4</span>
            <span className="text-gold font-mono">ADIM %50</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-navy mb-1">Gece Terlemesi ve Sıcaklık Durumunuz Nasıl?</h4>
            <p className="text-xs text-navy/65">Uykunuzu bölen hararet durumunu ortadan kaldırmak için doğru katmanı seçelim.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: "cok", icon: ThermometerSnowflake, title: "Çok terliyorum, gece uyanıyorum, serinlik hissi şart", sub: "4–5°C serinlik hissi sağlayan soğuk jel teknolojisi önerilir." },
              { id: "orta", icon: Wind, title: "Bazen hararet yapabiliyor, hava sirkülasyonu yüksek olsun", sub: "Nem birikimini önleyen 3D mikro hava kanallı kumaş yapısı." },
              { id: "yok", icon: Cloud, title: "Terleme problemim yok, standart pamuklu ferahlık yeterli", sub: "Nefes alan anti-alerjik yıkanabilir kumaş." },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectAnswer("sweat", opt.id, 3)}
                className="w-full text-left p-4 rounded-xl border-2 border-navy/10 hover:border-gold bg-white hover:bg-[#FAF6F0]/40 transition-all flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <opt.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{opt.title}</p>
                  <p className="text-xs text-navy/60 mt-0.5">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: UYKU POZİSYONU */}
      {step === 3 && (
        <div className="space-y-6 animate-image-fade max-w-[640px] mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-navy/60 border-b border-navy/8 pb-3">
            <span>SORU 3 / 4</span>
            <span className="text-gold font-mono">ADIM %75</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-navy mb-1">Ağırlıklı Uyku Pozisyonunuz Nedir?</h4>
            <p className="text-xs text-navy/65">Omurganızın doğal çizgisini bozmayacak profil yüksekliğini belirliyoruz.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: "yan", icon: Moon, title: "Genellikle Yan Yatıyorum", sub: "Omuz genişliğinize göre boynu askıda bırakmayan yüksek profil." },
              { id: "sirt", icon: Shield, title: "Genellikle Sırt Üstü Yatıyorum", sub: "Boyun kavisini dolduran özel oluklu ortopedik form." },
              { id: "donerek", icon: RotateCcw, title: "Yüz Üstü veya Sürekli Dönerek Yatıyorum", sub: "Soluk almayı kolaylaştıran alçak ve ekstra yumuşak visco." },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectAnswer("position", opt.id, 4)}
                className="w-full text-left p-4 rounded-xl border-2 border-navy/10 hover:border-gold bg-white hover:bg-[#FAF6F0]/40 transition-all flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <opt.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{opt.title}</p>
                  <p className="text-xs text-navy/60 mt-0.5">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: SERTLİK / HİSSİYAT */}
      {step === 4 && (
        <div className="space-y-6 animate-image-fade max-w-[640px] mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-navy/60 border-b border-navy/8 pb-3">
            <span>SORU 4 / 4</span>
            <span className="text-gold font-mono">ADIM %100</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-navy mb-1">Aradığınız Hissiyat ve Sertlik Seviyesi?</h4>
            <p className="text-xs text-navy/65">Yastığa ilk dokunduğunuzda ve gece boyu hissetmek istediğiniz dokuyu seçin.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: "medikal", icon: ShieldCheck, title: "Medikal & Ortopedik Destek (Orta-Sert)", sub: "Başın gömülmediği, sabit ve anatomik omurga desteği." },
              { id: "jel", icon: ThermometerSnowflake, title: "Serin Jel ve Dengeli Esneklik (Orta)", sub: "Serinletici his ile visco konforunun dengeli birleşimi." },
              { id: "yumusak", icon: Cloud, title: "Bulut Gibi Yumuşak ve Saran His (Yumuşak)", sub: "Derin batma hissi ve omurgayı hafifçe saran yapı." },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectAnswer("firmness", opt.id, 5)}
                className="w-full text-left p-4 rounded-xl border-2 border-navy/10 hover:border-gold bg-white hover:bg-[#FAF6F0]/40 transition-all flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <opt.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{opt.title}</p>
                  <p className="text-xs text-navy/60 mt-0.5">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: RESULT SCREEN */}
      {step === 5 && (
        <div className="space-y-6 animate-image-fade">
          <div className="bg-gradient-to-br from-[#1E2D3D] via-[#173156] to-[#0F1E2E] rounded-2xl p-6 md:p-8 text-white shadow-xl border border-gold/30">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-white/20 p-2 shadow-inner">
                <img src={recProduct.images[0].src} alt={recProduct.name} className="w-full h-full object-contain" />
                <span className="absolute top-2 left-2 bg-gold text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  %{matchScore} SANA ÖZEL UYUMLU
                </span>
              </div>
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span className="bg-gold/20 text-gold text-[10px] font-bold px-2.5 py-1 rounded-md border border-gold/30">
                    {recProduct.series}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
                    {recProduct.badge1}
                  </span>
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-white">{recProduct.name}</h4>
                <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                  Yanıtlarınıza göre yapay zeka destekli rehberimiz size en yüksek uyku konforunu sunan bu modeli eşleştirdi.
                </p>
                <div className="pt-2 flex items-baseline justify-center md:justify-start gap-3">
                  <span className="text-2xl font-extrabold text-gold">{formatPrice(recProduct.basePrice)}</span>
                  <span className="text-sm text-white/40 line-through">{formatPrice(recProduct.basePrice + 300)}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase">Kargo Bedava</span>
                </div>
              </div>
            </div>

            {/* REASONS BULLETS */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3">NEDEN BU YASTIK SİZİN İÇİN İDEAL?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {matchReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/90 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onSelectProduct(recommendedId)
                  if (isModal && onCloseModal) onCloseModal()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="flex-1 bg-gold hover:bg-gold/90 text-navy text-xs font-bold uppercase tracking-wider py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Bu Yastığı Seç & Sayfayı Güncelle</span>
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => {
                  onSelectProduct(recommendedId)
                  if (isModal && onCloseModal) onCloseModal()
                  onOpenConfig()
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Doğrudan Sepete Ekle</span>
              </button>
            </div>
            <div className="text-center mt-4">
              <button onClick={resetQuiz} className="text-xs text-white/60 hover:text-white underline cursor-pointer">
                Testi Yeniden Başlat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [currentProductId, setCurrentProductId] = useState<ProductId>("jelli")
  const product = PRODUCTS[currentProductId]

  const [showAssistantModal, setShowAssistantModal] = useState(false)
  const [showCertModal, setShowCertModal] = useState(false)
  const [showLightboxModal, setShowLightboxModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [form, setForm] = useState<string>(product.forms[0].id)
  const [softness, setSoftness] = useState<Softness>("yumusak")
  const [isTwoPack, setIsTwoPack] = useState(false)
  const [hasPillowcase, setHasPillowcase] = useState(false)
  const [shipping, setShipping] = useState<Shipping>("rollpack")
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [pillowConfigs, setPillowConfigs] = useState<{ packaging: string; hasPillowcase: boolean }[]>([])
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 4, minutes: 28, seconds: 45 })
  const [showStickyAdd, setShowStickyAdd] = useState(false)
  const mainAddBtnRef = useRef<HTMLButtonElement>(null)

  const switchProduct = (id: ProductId) => {
    const p = PRODUCTS[id]
    setCurrentProductId(id)
    setSelectedImage(0)
    setForm(p.forms[0].id)
    setSoftness("yumusak")
    setIsTwoPack(false)
    setHasPillowcase(false)
    setShipping("rollpack")
    setQuantity(1)
    setAdded(false)
    setShowConfigModal(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!mainAddBtnRef.current) return
      const rect = mainAddBtnRef.current.getBoundingClientRect()
      setShowStickyAdd(rect.bottom < 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const pillowcasePrice = 320
  const shippingPrice = SHIPPING_OPTIONS.find((s) => s.id === shipping)!.price
  const formDelta = product.forms.find((f: any) => f.id === form)?.priceDelta ?? 0
  const softnessDelta = product.softnessOpts.find((s: any) => s.id === softness)?.priceDelta ?? 0
  const unitPrice = product.basePrice + formDelta + softnessDelta
  const twoPack = unitPrice * 2 * 0.9
  const packQty = isTwoPack ? 2 : 1
  const total = ((isTwoPack ? twoPack : unitPrice) + (hasPillowcase ? pillowcasePrice * packQty : 0)) * quantity + shippingPrice
  const pillowCount = quantity * (isTwoPack ? 2 : 1)

  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2200) }

  const handleOpenConfig = () => {
    setPillowConfigs(Array.from({ length: pillowCount }, () => ({ packaging: shipping, hasPillowcase })))
    setShowConfigModal(true)
  }

  const handleConfirmConfig = () => { setShowConfigModal(false); handleAdd() }

  const getConfigTotal = () => {
    const du = isTwoPack ? unitPrice * 0.9 : unitPrice
    return pillowConfigs.reduce((sum, config) => {
      const pkg = SHIPPING_OPTIONS.find((s) => s.id === config.packaging)
      return sum + du + (pkg?.price ?? 0) + (config.hasPillowcase ? pillowcasePrice : 0)
    }, 0)
  }

  const handleUpdateConfig = (index: number, key: "packaging" | "hasPillowcase", value: any) => {
    setPillowConfigs((prev) => { const c = [...prev]; c[index] = { ...c[index], [key]: value }; return c })
  }

  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const touchEndY = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }

  const handleTouchEnd = (onTap?: () => void) => {
    const diffX = touchStartX.current - touchEndX.current
    const diffY = touchStartY.current - touchEndY.current

    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNextImage()
      } else {
        handlePrevImage()
      }
    } else if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
      if (onTap) onTap()
    }

    touchStartX.current = 0
    touchEndX.current = 0
    touchStartY.current = 0
    touchEndY.current = 0
  }

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }
  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }
  const currentImg = product.images[selectedImage]

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-navy font-sans">
      {/* TOP BAR */}
      <div className="bg-[#1E2D3D] text-[#F6F3ED] text-[11px] font-bold py-2.5 px-4 text-center tracking-wider flex items-center justify-center gap-2 flex-wrap">
        <span>TÜM SİTEDE TÜM ÜRÜNLERDE KARGO ÜCRETSİZ!</span>
        <span className="text-gold">·</span>
        <span>30 GÜN HİJYENİK İADE GARANTİSİ</span>
        <span className="text-gold">·</span>
        <button
          onClick={() => setShowAssistantModal(true)}
          className="text-gold hover:text-white transition-colors cursor-pointer flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full"
        >
          <Sparkles size={12} />
          <span>✨ Yastık Seçim Asistanı</span>
        </button>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-navy/10 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 h-[64px] md:h-[96px] flex items-center justify-between">
          <nav className="hidden xl:flex gap-7 items-center flex-1 justify-end pr-10">
            {["Ergonomik Uyku Konforu", "Jel Teknolojileri", "Seyahat Yastıkları"].map((n) => (
              <a key={n} href="#" className="text-[12px] font-semibold text-navy/80 hover:text-gold transition-colors tracking-tight whitespace-nowrap">{n}</a>
            ))}
          </nav>
          <div className="flex items-center justify-center shrink-0 px-2">
            <a href="#" className="group flex items-center justify-center p-1">
              <img src="/images/logo.png" alt="Pillow Market" className="h-14 w-14 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain transition-transform group-hover:scale-105 drop-shadow-sm py-1" />
            </a>
          </div>
          <div className="flex items-center justify-between flex-1 pl-10">
            <nav className="hidden xl:flex gap-7 items-center">
              {["Akıllı Uyku Teknolojileri", "Ergonomik Uyku Konforu", "Seyahat Yastıkları"].map((n) => (
                <a key={n} href="#" className="text-[12px] font-semibold text-navy/80 hover:text-gold transition-colors tracking-tight whitespace-nowrap">{n}</a>
              ))}
            </nav>
            <button className="relative px-3.5 py-2 rounded-full bg-navy/4 hover:bg-navy/8 transition-colors shrink-0 flex items-center gap-1 ml-auto cursor-pointer">
              <span className="text-xs font-bold text-navy uppercase tracking-wider">Sepet</span>
              <span className="w-4 h-4 rounded-full bg-gold text-[9px] font-bold text-white flex items-center justify-center">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 pt-6 md:pt-12 pb-16 md:pb-32">
        <div className="grid grid-cols-12 gap-4 md:gap-10 items-start">
          {/* GALLERY */}
          <div className="col-span-12 lg:col-span-6 lg:sticky lg:top-28 flex gap-4 h-auto items-start">
            <div className="hidden lg:flex flex-col gap-2.5 w-[76px] shrink-0 overflow-y-auto pr-1 max-h-[calc(100vh-180px)]">
              {product.images.map((img: any, i: number) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-full aspect-[2/3] rounded-[14px] overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === i ? "border-gold shadow-md scale-[1.02]" : "border-navy/10 hover:border-navy/30 opacity-70 hover:opacity-100"}`}>
                  <img src={img.src} className="w-full h-full object-cover" alt={img.desc} />
                </button>
              ))}
            </div>
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(() => setShowLightboxModal(true))}
              onClick={() => setShowLightboxModal(true)}
              className="relative flex-1 rounded-xl md:rounded-[24px] overflow-hidden bg-slate-100/80 border border-navy/8 flex items-center justify-center group aspect-[2/3] max-h-[calc(100vh-180px)] cursor-zoom-in select-none touch-pan-y"
            >
              <img key={`${currentProductId}-${selectedImage}`} src={currentImg.src} className="w-full h-full object-contain animate-image-fade group-hover:scale-105 transition-transform duration-500" alt={currentImg.desc} />
              
              {/* HOVER BÜYÜT BİLGİ OVERLAY */}
              <div className="absolute inset-0 bg-navy/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 text-navy font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-navy/10">
                  🔍 Görseli Büyüt & Detaylı İncele
                </span>
              </div>

              <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1.5 md:gap-2 z-10 pointer-events-none">
                <span className="bg-navy text-white text-[9px] md:text-[10px] font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full tracking-[0.08em] w-fit shadow-sm">{product.badge1}</span>
                <span className="bg-gold text-white text-[9px] md:text-[10px] font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full tracking-[0.08em] w-fit shadow-sm">{product.badge2}</span>
              </div>
              <button onClick={handlePrevImage} className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white text-navy border border-navy/15 shadow-md flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 opacity-90 group-hover:opacity-100 cursor-pointer">
                <ChevronLeft size={18} />
              </button>
              <button onClick={handleNextImage} className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white text-navy border border-navy/15 shadow-md flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 opacity-90 group-hover:opacity-100 cursor-pointer">
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 bg-white/90 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border border-navy/10 shadow-sm flex items-center justify-between z-10">
                <span className="text-[11px] md:text-[12px] font-semibold text-navy truncate pr-2">{currentImg.desc}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowLightboxModal(true); }}
                  className="text-[9px] md:text-[10px] font-bold text-gold bg-gold/10 hover:bg-gold hover:text-white transition-colors px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  🔍 Büyüt ({selectedImage + 1}/{product.images.length})
                </button>
              </div>
              <div className="flex lg:hidden absolute bottom-14 left-1/2 -translate-x-1/2 gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                {product.images.map((_: any, i: number) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-2 h-2 rounded-full transition-all ${selectedImage === i ? "bg-gold scale-125" : "bg-navy/25"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="col-span-12 lg:col-span-6 pt-2">
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 mb-4">
              {["Ana Sayfa", "Yastıklar", product.shortName].map((c: string, i: number, a: string[]) => (
                <div key={c} className="flex items-center gap-2">
                  <a href="#" className={`text-[11px] tracking-[0.06em] uppercase ${i === a.length - 1 ? "text-navy font-semibold" : "text-navy/45 hover:text-navy/70 transition-colors"}`}>{c}</a>
                  {i < a.length - 1 && <ChevronRight size={11} className="text-navy/30" />}
                </div>
              ))}
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</div>
              <span className="text-[12px] font-semibold text-navy/70">{product.rating} · {product.reviewCount.toLocaleString("tr-TR")} değerlendirme</span>
            </div>

            {/* TITLE */}
            <p className="text-[11px] tracking-[0.12em] uppercase text-gold font-bold mb-2">{product.series}</p>
            <h1 className="font-bold text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[1.08] tracking-tight text-[#1E2D3D] mb-3 md:mb-4">{product.name}</h1>

            {/* DISCOUNT BADGE (SHOPIFY PREMIUM DESIGN) */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="bg-[#1E2D3D] text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-[0.1em] shadow-2xs">
                %30 İNDİRİM
              </span>
              <span className="text-[11px] font-semibold text-navy/60 uppercase tracking-wider">
                Süre Sınırlı Fırsat
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-baseline gap-3 md:gap-4 mb-4 md:mb-6 flex-wrap">
              <span className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold text-navy tracking-tight">{formatPrice(unitPrice)}</span>
              <span className="text-[15px] md:text-[18px] text-navy/35 line-through">{formatPrice(unitPrice + 300)}</span>
              <span className="text-[10px] md:text-[11px] font-bold text-emerald-700 bg-emerald-600/10 px-2 md:px-2.5 py-1 rounded-full uppercase tracking-wider">Kargo Bedava</span>
            </div>

            {/* COUNTDOWN */}
            <div className="bg-white/80 border border-navy/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5 mb-6 md:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-5 shadow-[0_4px_20px_rgba(23,49,86,0.02)]">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#C79C6C] bg-[#C79C6C]/10 px-2 py-0.5 rounded uppercase">%30 İNDİRİM</span>
                  <span className="text-[9px] font-bold text-navy/50 uppercase tracking-wider">Kampanya bitiyor</span>
                </div>
                <p className="text-[13px] font-semibold text-navy/90">
                  <span className="font-extrabold text-navy">{formatPrice(unitPrice + 300)}</span>
                  <span className="text-navy/40 mx-1.5">→</span>
                  <span className="text-[#C79C6C] font-extrabold">{formatPrice(unitPrice)}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[{ val: timeLeft.days, label: "Gün" }, { val: timeLeft.hours, label: "Sa" }, { val: timeLeft.minutes, label: "Dk" }, { val: timeLeft.seconds, label: "Sn" }].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-lg font-light text-navy/30">:</span>}
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-12 bg-gold/5 border border-gold/30 rounded-xl flex items-center justify-center relative overflow-hidden shadow-2xs">
                        <span className="text-lg font-bold font-mono text-gold tracking-tight">{String(t.val).padStart(2, "0")}</span>
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gold" />
                      </div>
                      <span className="text-[9px] font-bold text-gold/80 uppercase tracking-widest mt-1.5">{t.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div className="bg-white/80 border border-navy/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 mb-6 md:mb-8 shadow-[0_4px_24px_rgba(23,49,86,0.02)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-5 border-b border-navy/6 pb-3">
                <p className="text-[11px] tracking-[0.14em] uppercase text-gold font-extrabold flex items-center gap-2">
                  <Sparkles size={15} className="text-gold" /> {product.series}
                </p>
                <button onClick={() => setShowCertModal(true)} className="linen-label px-3 py-1 text-[#8E7E65] text-[10px] font-bold rounded-md transition-all shadow-2xs hover:shadow-xs cursor-pointer">
                  OEKO-TEX® SERTİFİKALI
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {product.features.map((h: any) => (
                  <div key={h.title} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-navy/6 hover:border-gold/45 hover:shadow-2xs transition-all duration-300 group/item cursor-default">
                    <div className="p-2.5 rounded-xl bg-white border border-[#C79C6C]/25 text-gold shadow-3xs shrink-0 mt-0.5">
                      <h.icon size={17} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-navy group-hover/item:text-gold transition-colors mb-0.5">{h.title}</p>
                      <p className="text-[11px] text-navy/65 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ASSISTANT QUICK PROMPT BANNER */}
            <div
              onClick={() => setShowAssistantModal(true)}
              className="bg-gradient-to-r from-gold/15 via-amber-500/10 to-gold/5 border border-gold/35 rounded-2xl p-4 mb-8 flex items-center justify-between cursor-pointer group hover:border-gold transition-all shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-gold text-white shadow-3xs group-hover:scale-110 transition-transform shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-navy group-hover:text-gold transition-colors">Hangi Yastık Sana Uygun?</p>
                  <p className="text-[11px] text-navy/65">Boyun fıtığı, terleme ve yatış şekline göre 3 soruda ideal yastığını bul.</p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-gold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0 ml-2 bg-white/80 px-3 py-1.5 rounded-lg border border-gold/30">
                Testi Başlat <ChevronRight size={14} />
              </span>
            </div>

            <hr className="border-0 border-t border-navy/8 mb-8" />

            {/* FORM */}
            <div className="mb-10">
              <p className="text-[11px] uppercase tracking-[0.12em] text-gold font-semibold mb-4">{product.formLabel}</p>
              <div className="grid grid-cols-2 gap-3">
                {product.forms.map((opt: any) => (
                  <button key={opt.id} onClick={() => setForm(opt.id)}
                    className={`p-4 text-left rounded-[16px] border-[1.5px] transition-all duration-300 ${form === opt.id ? "border-gold bg-[#FAF6F0] shadow-sm" : "border-navy/8 hover:border-navy/20 bg-white shadow-2xs"}`}>
                    <p className={`text-[14px] font-bold mb-1 ${form === opt.id ? "text-navy" : "text-navy/80"}`}>{opt.label}</p>
                    <p className={`text-[12px] ${form === opt.id ? "text-navy/80" : "text-navy/50"}`}>{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* SOFTNESS */}
            <div className="mb-10">
              <p className="text-[11px] uppercase tracking-[0.12em] text-gold font-semibold mb-4">Yumuşaklık</p>
              <div className="grid grid-cols-2 gap-3">
                {product.softnessOpts.map((opt: any) => (
                  <button key={opt.id} onClick={() => setSoftness(opt.id)}
                    className={`relative p-4 text-left rounded-[16px] border-[1.5px] transition-all duration-300 ${softness === opt.id ? "border-gold bg-[#FAF6F0] shadow-sm" : "border-navy/8 hover:border-navy/20 bg-white shadow-2xs"}`}>
                    {opt.extra && <span className="absolute top-3 right-3 text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">{opt.extra}</span>}
                    <p className={`text-[14px] font-bold mb-1 ${softness === opt.id ? "text-navy" : "text-navy/80"}`}>{opt.label}</p>
                    <p className={`text-[12px] ${softness === opt.id ? "text-navy/80" : "text-navy/50"}`}>{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2'Lİ PAKET */}
            <div className="bg-[#1E2D3D] rounded-[16px] p-5 flex items-center justify-between mb-8 shadow-sm">
              <div>
                <p className="text-[14px] font-bold text-white mb-1">2'li Paket Al — %10 Tasarruf Et</p>
                <p className="text-[13px] text-white/70">
                  {isTwoPack ? `${formatPrice(twoPack)} · Adet başı ${formatPrice(Math.round(twoPack / 2))}` : `Normalde ${formatPrice(unitPrice * 2)} · Paketle ${formatPrice(Math.round(unitPrice * 2 * 0.9))}`}
                </p>
              </div>
              <button onClick={() => setIsTwoPack(!isTwoPack)} className={`w-12 h-6 rounded-full transition-colors relative ${isTwoPack ? "bg-gold" : "bg-white/20"}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isTwoPack ? "left-7" : "left-1"}`} />
              </button>
            </div>

            {/* KILIF & GÖNDERİM */}
            <div className="space-y-3 mb-10">
              <button onClick={() => setHasPillowcase(!hasPillowcase)} className="w-full flex items-center gap-4 p-4 rounded-[16px] border border-navy/8 hover:bg-[#FAF6F0]/50 transition-colors text-left">
                <div className={`w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${hasPillowcase ? "bg-gold border-gold" : "border-navy/20"}`}>
                  {hasPillowcase && <Check size={12} strokeWidth={3} className="text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[14px] font-semibold text-navy">Yedek Kılıf</span>
                    <span className="text-[13px] font-semibold text-gold">+{formatPrice(pillowcasePrice)}</span>
                  </div>
                  <p className="text-[12px] text-navy/60">Anti-alerjik dokuma, 60°C yıkanabilir</p>
                </div>
              </button>
              <div className="border border-navy/8 rounded-[16px] overflow-hidden bg-white">
                {SHIPPING_OPTIONS.map((opt, i) => (
                  <button key={opt.id} onClick={() => setShipping(opt.id)}
                    className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${i !== 0 ? "border-t border-navy/8" : ""} ${shipping === opt.id ? "bg-[#FAF6F0]/40" : "hover:bg-[#FAF6F0]/20"}`}>
                    <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${shipping === opt.id ? "border-gold" : "border-navy/20"}`}>
                      {shipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                    </div>
                    <GoldIcon Icon={opt.icon} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[14px] font-semibold text-navy">{opt.label}</span>
                        <span className={`text-[13px] font-semibold ${opt.price === 0 ? "text-navy/50" : "text-navy"}`}>{opt.price === 0 ? "Ücretsiz" : `+${formatPrice(opt.price)}`}</span>
                      </div>
                      <p className="text-[12px] text-navy/60">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAS */}
            <div className="space-y-3 mb-10 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-navy/12 rounded-xl h-14 px-2 shadow-2xs shrink-0 select-none">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg hover:bg-navy/5 flex items-center justify-center font-bold text-[#1E2D3D] transition-colors cursor-pointer text-[16px]">-</button>
                  <span className="w-8 text-center text-sm font-extrabold text-[#1E2D3D] font-mono">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="w-8 h-8 rounded-lg hover:bg-navy/5 flex items-center justify-center font-bold text-[#1E2D3D] transition-colors cursor-pointer text-[16px]">+</button>
                </div>
                <button ref={mainAddBtnRef} onClick={handleOpenConfig}
                  className={`flex-1 h-14 rounded-[12px] text-[15px] font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${added ? "bg-emerald-700 text-white" : "bg-[#1E2D3D] hover:bg-[#2C3E50] text-white active:scale-98"}`}>
                  {added ? <><CheckCircle2 size={18} /> Sepete Eklendi</> : `Sepete Ekle — ${formatPrice(total)}`}
                </button>
              </div>
              <button className="w-full h-14 rounded-[12px] text-[15px] font-bold text-[#C79C6C] border border-[#C79C6C] bg-white hover:bg-[#C79C6C]/5 active:scale-98 transition-all duration-300 cursor-pointer">
                Hemen Satın Al
              </button>
            </div>

            {/* TRUST BADGES GRID */}
            <div className="space-y-3 mb-10">
              <div className="grid grid-cols-2 gap-2.5">
                {/* BADGE 1: 99 GECE DENEME */}
                <div className="p-3 rounded-xl bg-white border border-gold/40 shadow-3xs flex items-start gap-2.5 hover:border-gold hover:shadow-2xs transition-all">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    <Moon size={16} />
                  </div>
                  <div>
                    <p className="text-[12px] font-extrabold text-navy leading-snug">99 Gece Deneme Garantisi</p>
                    <p className="text-[10px] text-navy/60 leading-relaxed mt-0.5">Evinde 99 gece dene, koşulsuz iade & değişim hakkı.</p>
                  </div>
                </div>

                {/* BADGE 2: OEKO-TEX */}
                <div
                  onClick={() => setShowCertModal(true)}
                  className="p-3 rounded-xl bg-white border border-emerald-600/30 shadow-3xs flex items-start gap-2.5 hover:border-emerald-600 hover:shadow-2xs transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 group-hover:scale-105 transition-transform">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-[12px] font-extrabold text-navy group-hover:text-emerald-700 transition-colors leading-snug">OEKO-TEX® Sertifikalı</p>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">İncele 🔍</span>
                    </div>
                    <p className="text-[10px] text-navy/60 leading-relaxed mt-0.5">Zararlı madde içermeyen %100 hijyenik tekstil.</p>
                  </div>
                </div>

                {/* BADGE 3: ÜCRETSİZ KARGO */}
                <div className="p-3 rounded-xl bg-white border border-navy/10 shadow-3xs flex items-start gap-2.5 hover:border-navy/20 hover:shadow-2xs transition-all">
                  <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="text-[12px] font-extrabold text-navy leading-snug">Ücretsiz & Hızlı Kargo</p>
                    <p className="text-[10px] text-navy/60 leading-relaxed mt-0.5">Tüm siparişlerde ücretsiz sigortalı gönderim.</p>
                  </div>
                </div>

                {/* BADGE 4: 10 YIL GARANTİ */}
                <div className="p-3 rounded-xl bg-white border border-navy/10 shadow-3xs flex items-start gap-2.5 hover:border-navy/20 hover:shadow-2xs transition-all">
                  <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-[12px] font-extrabold text-navy leading-snug">10 Yıl Şekil Garantisi</p>
                    <p className="text-[10px] text-navy/60 leading-relaxed mt-0.5">Çökme ve sarkma yapmayan visco köpük.</p>
                  </div>
                </div>
              </div>

              {/* FOOTER SUMMARY LINE */}
              <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-navy/60 pt-1">
                <span className="flex items-center gap-1 text-emerald-700 font-bold"><CheckCircle2 size={13} /> %100 Güvenli Ödeme</span>
                <span>·</span>
                <span>3D Secure</span>
                <span>·</span>
                <span>Anında Değişim</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* STICKY BAR */}
      {showStickyAdd && (
        <div className="fixed bottom-0 left-0 right-0 z-40 animate-image-fade">
          <div className="bg-white/95 backdrop-blur-md border-t border-navy/10 shadow-[0_-4px_24px_rgba(23,49,86,0.1)] px-4 py-3">
            <div className="max-w-[1280px] mx-auto flex items-center gap-3 md:gap-4">
              <img src={currentImg.src} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-navy/8 shrink-0 hidden sm:block" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-navy truncate">{product.name}</p>
                <p className="text-[11px] text-navy/60">{formatPrice(unitPrice)} · {product.badge2}</p>
              </div>
              <button onClick={handleOpenConfig}
                className={`h-12 px-6 md:px-8 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm shrink-0 ${added ? "bg-emerald-700 text-white" : "bg-[#1E2D3D] hover:bg-[#2C3E50] text-white"}`}>
                {added ? <><CheckCircle2 size={16} /> Eklendi</> : `Sepete Ekle — ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAT BAND */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1] mb-4 md:mb-6">{product.statBandTitle}</h2>
            <p className="text-[16px] text-white/70 leading-[1.7] max-w-[480px]">{product.statBandDesc}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-12">
            {product.stats.map((s: any) => (
              <div key={s.label} className="border-t border-gold/40 pt-4 md:pt-6">
                <p className="font-serif text-[32px] md:text-[48px] text-gold leading-none mb-2 md:mb-3">{s.val}</p>
                <p className="text-[11px] tracking-[0.1em] text-white/60 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-28 border-b border-navy/8 overflow-hidden">
        <div className="text-center max-w-[680px] mx-auto mb-12 md:mb-20">
          <p className="text-[11px] tracking-[0.16em] uppercase text-gold font-bold mb-3">{product.showcaseSubtitle}</p>
          <h3 className="font-bold text-[26px] sm:text-[32px] md:text-[38px] text-navy leading-tight">{product.showcaseTitle}</h3>
          <p className="text-[14px] md:text-[15px] text-navy/60 mt-3 leading-relaxed">{product.showcaseDesc}</p>
        </div>
        <div className="space-y-16 md:space-y-24 mb-16 md:mb-24">
          {product.showcaseRows.map((row: any, idx: number) => {
            const isLeft = row.imgSide === "left"
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center group">
                <div className={`lg:col-span-6 relative ${isLeft ? "" : "order-1 lg:order-2"}`}>
                  <div className={`absolute -inset-4 rounded-[36px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${isLeft ? "bg-gradient-to-r from-gold/15 via-navy/5 to-transparent" : "bg-gradient-to-l from-navy/15 via-gold/10 to-transparent"}`} />
                  <div className="relative rounded-[28px] overflow-hidden bg-slate-50 border border-navy/10 shadow-md group-hover:shadow-xl transition-all duration-500 p-4">
                    <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-white flex items-center justify-center p-2">
                      <img src={row.img} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" alt={row.imgAlt} />
                    </div>
                    <span className={`absolute top-7 ${isLeft ? "left-7" : "right-7"} bg-navy/90 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full tracking-wider shadow-sm`}>{row.imgLabel}</span>
                  </div>
                </div>
                <div className={`lg:col-span-6 space-y-5 ${isLeft ? "lg:pl-6" : "lg:pr-6 order-2 lg:order-1"}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-gold/15 text-gold font-bold text-sm flex items-center justify-center border border-gold/30">{row.num}</span>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold">{row.label}</span>
                  </div>
                  <h4 className="text-[22px] md:text-[28px] font-bold text-navy leading-snug">{row.title}</h4>
                  <p className="text-[15px] text-navy/70 leading-relaxed">{row.desc}</p>
                  {row.bullets && (
                    <div className="pt-2 space-y-3">
                      {row.bullets.map((item: any, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-navy/6">
                          <div className="w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                          <div>
                            <p className="text-[13px] font-bold text-navy">{item.title}</p>
                            <p className="text-[11px] text-navy/60">{item.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {row.highlight && (
                    <div className="bg-gradient-to-r from-gold/10 via-amber-500/10 to-transparent p-5 rounded-2xl border border-gold/30 flex items-center gap-4 mt-4">
                      <div className="p-3 rounded-xl bg-gold text-white font-bold text-xl shrink-0">{row.highlight.val}</div>
                      <div>
                        <p className="text-[14px] font-bold text-navy">{row.highlight.title}</p>
                        <p className="text-[12px] text-navy/70">{row.highlight.sub}</p>
                      </div>
                    </div>
                  )}
                  {row.specs && (
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {row.specs.map((spec: any, i: number) => (
                        <div key={i} className="p-3 text-center rounded-xl bg-slate-50 border border-navy/8">
                          <p className="text-[16px] font-extrabold text-gold">{spec.val}</p>
                          <p className="text-[10px] font-semibold text-navy/60 uppercase">{spec.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-navy/8">
          {product.techCards.map((t: any, i: number) => (
            <div key={i} className="p-8 border-r border-b border-navy/8">
              <div className="mb-6"><GoldIcon Icon={t.icon} /></div>
              <h4 className="text-[16px] font-semibold text-navy mb-3">{t.title}</h4>
              <p className="text-[14px] text-navy/70 leading-[1.6]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 pb-16 md:pb-32 overflow-x-auto">
        <h3 className="font-serif text-[28px] md:text-[36px] text-navy mb-10 md:mb-16">Rakiplerle Karşılaştırma</h3>
        <div className="border-[1.5px] border-navy/6 rounded-[16px] overflow-hidden min-w-[600px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy text-white text-[13px] font-semibold tracking-wide">
                <th className="py-5 px-6 font-medium text-white/60 w-1/4">Özellik</th>
                <th className="py-5 px-6 w-1/4 text-gold">{product.comparisonName}</th>
                <th className="py-5 px-6 w-1/4">Standart Bellek Köpüğü</th>
                <th className="py-5 px-6 w-1/4">Geleneksel Elyaf</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-navy">
              {product.comparisonRows.map((row: any, i: number) => (
                <tr key={i} className="border-b border-navy/6 last:border-b-0">
                  <td className="py-4 px-6 text-navy/70 font-medium">{row.f}</td>
                  <td className="py-4 px-6 bg-gold/10 font-semibold">
                    <div className="flex items-center gap-2"><Check size={16} strokeWidth={2.5} className="text-gold" /> {row.v}</div>
                  </td>
                  <td className="py-4 px-6 text-navy/80">
                    <div className="flex items-center gap-2">{(row.s === "Yok" || row.s === "Yoğun köpük") && <X size={16} className="text-navy/40" />} {row.s}</div>
                  </td>
                  <td className="py-4 px-6 text-navy/80">
                    <div className="flex items-center gap-2">{(row.g === "Yok" || row.g === "Yetersiz") && <X size={16} className="text-navy/40" />} {row.g}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CROSS-SELL */}
      <section className="bg-navy/4 py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <p className="text-[11px] tracking-[0.12em] uppercase text-gold font-bold mb-3">BUNU ALANLAR BUNLARI DA ALDI</p>
              <h2 className="font-serif text-[28px] md:text-[36px] text-navy">Seti Tamamla</h2>
            </div>
            <a href="#" className="text-[13px] font-semibold text-navy flex items-center gap-1 border-b border-navy pb-0.5 hover:text-gold hover:border-gold transition-colors">Tümünü Gör <ChevronRight size={14} /></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.crossSell.map((item: any) => (
              <div key={item.name}
                onClick={() => item.isProduct && item.id ? switchProduct(item.id as ProductId) : undefined}
                className={`bg-white rounded-[16px] overflow-hidden border border-navy/8 group transition-all ${item.isProduct ? "cursor-pointer hover:shadow-[0_8px_24px_rgba(23,49,86,0.1)] hover:-translate-y-1" : "cursor-default hover:shadow-[0_8px_24px_rgba(23,49,86,0.06)]"}`}>
                <div className="aspect-[4/3] overflow-hidden bg-navy/4 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.08em]">{item.tag}</span>
                  {item.isProduct && (
                    <span className="absolute bottom-4 right-4 bg-gold text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.08em] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ürünü Gör <ChevronRight size={11} />
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[16px] font-semibold text-navy mb-3">{item.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] font-semibold text-gold">{item.price}</span>
                    {item.isProduct ? (
                      <button onClick={(e) => { e.stopPropagation(); item.id && switchProduct(item.id as ProductId) }}
                        className="text-[12px] font-semibold px-4 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-white transition-colors flex items-center gap-1">
                        Ürünü Gör <ChevronRight size={11} />
                      </button>
                    ) : (
                      <button className="text-[12px] font-semibold px-4 py-2 border border-navy text-navy rounded-full hover:bg-navy hover:text-white transition-colors">Sepete Ekle</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEKO-TEX */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-24 border-t border-navy/8">
        <div className="bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/20 rounded-[28px] p-8 md:p-12 border border-emerald-500/20 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">RESMİ SERTİFİKA</span>
              <span className="text-emerald-700 font-bold text-xs">STANDARD 100 by OEKO-TEX®</span>
            </div>
            <h3 className="text-3xl font-bold text-navy leading-tight">Uluslararası Tekstil Hijyen ve Güvenlik Sertifikası</h3>
            <p className="text-[14px] text-navy/70 leading-relaxed">
              Pillow Market ürünleri, bağımsız Alman tekstil enstitüsü <strong>Hohenstein Textile Testing Institute</strong> tarafından test edilerek <strong>OEKO-TEX® STANDARD 100 (Product Class II)</strong> sertifikası ile tescillenmiştir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { Icon: ShieldCheck, title: "Zararlı Madde İçermez", desc: "Toksik, fitalat ve kanserojen boya içermeyen temiz üretim" },
                { Icon: CheckCircle2, title: "Hassas Ciltlere Tam Uyum", desc: "Ciltle doğrudan temasa uygun güvenlik tescili" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-emerald-500/15 shadow-2xs">
                  <item.Icon size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-navy">{item.title}</p>
                    <p className="text-[11px] text-navy/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowCertModal(true)} className="bg-navy hover:bg-navy/90 text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
              <span>Sertifika Belgesini İncele</span><ChevronRight size={16} />
            </button>
          </div>
          <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => setShowCertModal(true)}>
            <div className="absolute -inset-3 bg-emerald-500/10 rounded-[28px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white rounded-2xl p-4 border border-navy/12 shadow-md hover:shadow-xl transition-all group-hover:scale-[1.02] overflow-hidden">
              <img src="/images/oeko-tex-certificate.png" alt="OEKO-TEX Standard 100 Certificate" className="w-full h-auto object-contain rounded-lg max-h-[380px]" />
              <div className="absolute inset-0 bg-navy/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-navy font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">🔍 Belgeyi Büyüt & İncele</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-navy/8 py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <a href="#" className="flex items-center"><img src="/images/logo.png" alt="Pillow Market Logo" className="h-16 w-16 object-contain" /></a>
          <p className="text-[13px] text-navy/50">© 2026 Pillow Market</p>
          <div className="flex gap-4">
            {["Visa", "Mastercard", "iyzico"].map((p) => (
              <span key={p} className="text-[11px] text-navy/50 font-medium px-3 py-1.5 border border-navy/10 rounded-[6px]">{p}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* CONFIG MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4 animate-image-fade" onClick={() => setShowConfigModal(false)}>
          <div className="relative bg-white rounded-lg max-w-[480px] w-full max-h-[85vh] overflow-hidden shadow-2xl border border-navy/12 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-navy/8 flex items-center justify-between shrink-0">
              <div>
                <h4 className="font-bold text-navy text-[15px] tracking-wider uppercase">Ürün Tercihlerini Seçin</h4>
                <p className="text-[12px] text-navy/60 mt-0.5">Sepete eklenecek {pillowCount} adet yastık için seçenekleri belirleyin</p>
              </div>
              <button onClick={() => setShowConfigModal(false)} className="w-8 h-8 rounded-full hover:bg-navy/5 text-navy flex items-center justify-center transition-colors cursor-pointer"><X size={16} /></button>
            </div>
            <div className="px-6 py-5 overflow-y-auto space-y-5 flex-1 divide-y divide-navy/8">
              {pillowConfigs.map((config, index) => (
                <div key={index} className={`space-y-4 ${index !== 0 ? "pt-5" : ""}`}>
                  <span className="text-[12px] font-extrabold text-navy uppercase tracking-wider">{index + 1}. YASTIK SEÇENEĞİ</span>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-navy/65 uppercase tracking-wider block">Paketleme Tipi</label>
                    <select value={config.packaging} onChange={(e) => handleUpdateConfig(index, "packaging", e.target.value)}
                      className="w-full bg-white border border-navy/15 rounded-md px-3 py-2.5 text-[13px] text-navy focus:outline-none focus:border-navy cursor-pointer">
                      {SHIPPING_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label} {opt.price === 0 ? "(Ücretsiz)" : `(+${formatPrice(opt.price)})`}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center justify-between cursor-pointer py-1.5 select-none">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={config.hasPillowcase} onChange={(e) => handleUpdateConfig(index, "hasPillowcase", e.target.checked)} className="w-4.5 h-4.5 accent-[#1E2D3D] border-navy/20 rounded cursor-pointer" />
                        <span className="text-[13px] font-semibold text-[#1E2D3D]">Yedek Kılıf İstiyorum</span>
                      </div>
                      <span className="text-[12px] font-bold text-gold">+{formatPrice(pillowcasePrice)}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-navy/8 bg-[#FAF8F5] flex flex-col gap-4 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-navy/60 uppercase tracking-wider">TOPLAM TUTAR:</span>
                <span className="text-[18px] font-extrabold text-[#1E2D3D] tracking-tight">{formatPrice(getConfigTotal())}</span>
              </div>
              <button onClick={handleConfirmConfig} className="w-full bg-[#1E2D3D] hover:opacity-90 text-white text-[12px] uppercase tracking-widest font-bold py-3.5 rounded-md transition-opacity cursor-pointer">
                Seçenekleri Onayla ve Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERT MODAL */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 animate-image-fade" onClick={() => setShowCertModal(false)}>
          <div className="relative bg-white rounded-2xl max-w-[720px] w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-navy/15" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-navy/10 pb-4 mb-4">
              <div>
                <h4 className="font-bold text-navy text-lg">OEKO-TEX® STANDARD 100 Sertifikası</h4>
                <p className="text-xs text-navy/60">Hohenstein Textile Testing Institute · Tescilli Ürün Sertifikası</p>
              </div>
              <button onClick={() => setShowCertModal(false)} className="w-8 h-8 rounded-full bg-navy/5 hover:bg-navy/10 text-navy flex items-center justify-center transition-colors cursor-pointer"><X size={18} /></button>
            </div>
            <div className="w-full flex justify-center bg-slate-50 p-2 rounded-xl border border-navy/6">
              <img src="/images/oeko-tex-certificate.png" alt="OEKO-TEX Certificate" className="max-w-full h-auto object-contain rounded-lg shadow-sm" />
            </div>
            <div className="mt-4 pt-3 border-t border-navy/8 flex justify-end">
              <button onClick={() => setShowCertModal(false)} className="px-5 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy/90 transition-colors cursor-pointer">Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* ASSISTANT MODAL */}
      {showAssistantModal && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 animate-image-fade" onClick={() => setShowAssistantModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[840px]">
            <PillowAssistant
              isModal
              onCloseModal={() => setShowAssistantModal(false)}
              onSelectProduct={switchProduct}
              onOpenConfig={handleOpenConfig}
            />
          </div>
        </div>
      )}

      {/* LIGHTBOX / FULLSCREEN IMAGE DETAIL MODAL */}
      {showLightboxModal && (
        <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6 animate-image-fade" onClick={() => setShowLightboxModal(false)}>
          {/* HEADER */}
          <div className="w-full max-w-[1280px] flex items-center justify-between z-10 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold tracking-widest text-gold uppercase bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                {product.series}
              </span>
              <h4 className="text-white font-bold text-sm md:text-base hidden sm:block">{product.images[selectedImage].desc}</h4>
            </div>
            <button
              onClick={() => setShowLightboxModal(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* MAIN IMAGE & NAVIGATION ARROWS */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd()}
            className="relative flex-1 w-full max-w-[1000px] flex items-center justify-center my-4 overflow-hidden select-none touch-pan-y"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePrevImage}
              className="absolute left-2 md:left-4 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-xs shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative max-w-full max-h-[72vh] flex items-center justify-center">
              <img
                key={`lightbox-${currentProductId}-${selectedImage}`}
                src={product.images[selectedImage].src}
                alt={product.images[selectedImage].desc}
                className="max-w-full max-h-[72vh] object-contain animate-image-fade rounded-2xl shadow-2xl"
              />
            </div>

            <button
              onClick={handleNextImage}
              className="absolute right-2 md:right-4 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-xs shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* THUMBNAILS BAR & MOBILE DESCRIPTION */}
          <div className="w-full max-w-[800px] flex flex-col items-center gap-3 z-10 shrink-0" onClick={(e) => e.stopPropagation()}>
            <p className="text-white/80 text-xs font-medium text-center sm:hidden">{product.images[selectedImage].desc}</p>
            <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1 max-w-full">
              {product.images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${selectedImage === i ? "border-gold scale-105 shadow-md opacity-100 ring-2 ring-gold/50" : "border-white/20 opacity-50 hover:opacity-100"}`}
                >
                  <img src={img.src} alt={img.desc} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
