"use client";
import { useState, useEffect, useRef } from "react";
import { Share2, Home, Shuffle, ArrowRight, Sun, Moon, Copy } from "lucide-react";

const DATA_A = [
  { id: "apbn_bgn", label: "Anggaran BGN APBN 2026", value: 268_000_000_000_000, detail: "Terbesar dari seluruh K/L", source: "UU No.17/2025 APBN 2026" },
  { id: "kendaraan", label: "Total Kendaraan", value: 1_390_000_000_000, detail: "Termasuk motor listrik + sewa mobil", source: "Project Multatuli" },
  { id: "it_project", label: "Proyek IT (Penunjukan Langsung)", value: 1_265_000_000_000, detail: "SIPGN Rp600M + IoT Rp665M. Vendor kosong, realisasi Rp0", source: "Kompas.id / SPSE Inaproc" },
  { id: "dapur", label: "Pembangunan Dapur SPPG", value: 1_260_000_000_000, detail: "315 SPPG dibiayai APBN", source: "Project Multatuli / BGN" },
  { id: "dana_harian_mbg", label: "Dana Harian Nasional MBG", value: 1_200_000_000_000, detail: "Rp1,2 triliun per hari untuk 82,9 juta penerima", source: "Kompas / detikHealth / BGN", prefix: "1 hari dana pelaksanaan MBG (Rp1,2 triliun)" },
  { id: "motor", label: "Motor Listrik", value: 1_200_000_000_000, detail: "21.801 unit Emmo Mobility @ Rp49 juta", source: "Project Multatuli / LKPP Inaproc" },
  { id: "komputer", label: "Perangkat Keras & Komputer", value: 830_000_000_000, detail: "Termasuk tablet Rp508M (markup ~100%)", source: "Project Multatuli" },
  { id: "pakaian", label: "Pakaian & Atribut", value: 622_300_000_000, detail: "Seragam, sepatu, topi, baret, ikat pinggang", source: "Project Multatuli" },
  { id: "tablet", label: "Tablet Samsung Galaxy Tab", value: 508_400_000_000, detail: "~28.359 unit @ Rp17,9 juta (pasar Rp9 juta)", source: "Project Multatuli" },
  { id: "pelatihan", label: "Pelatihan & Sosialisasi", value: 464_600_000_000, detail: "Kapasitas SDM program SPPI", source: "Periskop.id" },
  { id: "alat_dapur", label: "Alat Dapur (315 SPPG)", value: 245_810_000_000, detail: "Pagu Rp252M, realisasi Rp245M", source: "BGN (bgn.go.id)" },
  { id: "operasional", label: "Biaya Operasional", value: 241_100_000_000, detail: "Operasional kantor BGN", source: "Periskop.id" },
  { id: "fasilitas", label: "Fasilitas Kantor", value: 149_200_000_000, detail: "Fasilitas kantor BGN", source: "Periskop.id" },
  { id: "sertifikasi", label: "Sertifikasi Halal", value: 144_100_000_000, detail: "Sertifikasi halal SPPG", source: "Periskop.id" },
  { id: "laptop", label: "Laptop (~5.000 unit)", value: 132_000_000_000, detail: "@ Rp24,5 juta per unit", source: "Project Multatuli" },
  { id: "eo", label: "Jasa Event Organizer", value: 113_900_000_000, detail: "Termasuk Fun Run Antikorupsi Rp1,3M", source: "Tempo" },
  { id: "alat_makan", label: "Alat Makan (315 SPPG)", value: 68_940_000_000, detail: "Pagu Rp89M, realisasi Rp69M", source: "BGN (bgn.go.id)" },
  { id: "kaoskaki", label: "Kaos Kaki", value: 6_900_000_000, detail: "~17.000 pasang @ Rp100rb, tanpa merek/SNI", source: "Project Multatuli / fin.co.id" },
  { id: "zoom", label: "Sewa Zoom (9 bulan)", value: 5_700_000_000, detail: "Apr–Des 2026. ~Rp633 juta/bulan", source: "Kompas.id" },
  { id: "semir", label: "Semir & Sikat Sepatu", value: 1_570_000_000, detail: "12 paket. Markup vs harga pasar ~3x", source: "Tempo / Inaproc" },
];

const DATA_B = [
  { id: "gaji_guru", label: "Gaji guru honorer 1 bulan", value: 500_000, unit: "orang", emoji: "👩‍🏫", category: "Manusia", note: "2,6 juta guru nasional @ Rp500rb/bln", maxPopulation: 2_600_000, perUnitValue: 500_000, cmp: (n) => `menggaji ${n} guru honorer @ Rp500 ribu`, cmpDuration: (d) => `menggaji seluruh 2,6 juta guru honorer @ Rp500 ribu selama ${d}` },
  { id: "gaji_guru_layak", label: "Gaji layak guru honorer 1 bulan", value: 5_000_000, unit: "orang", emoji: "👩‍🏫", category: "Manusia", note: "Setara UMR menengah", maxPopulation: 2_600_000, perUnitValue: 5_000_000, cmp: (n) => `menggaji ${n} guru honorer @ Rp5 juta`, cmpDuration: (d) => `menggaji seluruh 2,6 juta guru honorer @ Rp5 juta selama ${d}` },
  { id: "seluruh_guru_1bln", label: "Gaji seluruh guru honorer 1 bulan @ Rp500rb", value: 1_300_000_000_000, unit: "bulan", emoji: "👩‍🏫", category: "Manusia", note: "2,6 juta × Rp500rb", population: 2_600_000, perUnit: 500_000, unitLabel: "guru honorer", cmp: (n) => `membiayai gaji seluruh 2,6 juta guru honorer @ Rp500 ribu selama ${n}`, cmpPartial: (n) => `menggaji ${n} guru honorer @ Rp500 ribu` },
  { id: "seluruh_guru_layak_1bln", label: "Gaji seluruh guru honorer 1 bulan @ Rp5 juta", value: 13_000_000_000_000, unit: "bulan", emoji: "👩‍🏫", category: "Manusia", note: "2,6 juta × Rp5 juta", population: 2_600_000, perUnit: 5_000_000, unitLabel: "guru honorer", cmp: (n) => `membiayai gaji seluruh 2,6 juta guru honorer @ Rp5 juta selama ${n}`, cmpPartial: (n) => `menggaji ${n} guru honorer @ Rp5 juta` },
  { id: "bantuan_100rb_kk", label: "Bantuan Rp100rb ke seluruh 91 juta KK", value: 9_100_000_000_000, unit: "kali bayar", emoji: "👨‍👩‍👧‍👦", category: "Manusia", note: "91 juta KK × Rp100rb", perPerson: 100_000, population: 91_000_000, populationLabel: "KK", cmp: (n) => `memberi bantuan Rp100 ribu ke seluruh 91 juta KK sebanyak ${n} kali`, cmpPartial: (pct) => `membiayai ${pct} dari bantuan Rp100 ribu ke seluruh 91 juta KK`, cmpCount: (n) => `memberi bantuan Rp100 ribu kepada ${n} KK` },
  { id: "bantuan_500rb_kk", label: "Bantuan Rp500rb ke seluruh 91 juta KK", value: 45_500_000_000_000, unit: "kali bayar", emoji: "👨‍👩‍👧‍👦", category: "Manusia", note: "91 juta KK × Rp500rb", perPerson: 500_000, population: 91_000_000, populationLabel: "KK", cmp: (n) => `memberi bantuan Rp500 ribu ke seluruh 91 juta KK sebanyak ${n} kali`, cmpPartial: (pct) => `membiayai ${pct} dari bantuan Rp500 ribu ke seluruh 91 juta KK`, cmpCount: (n) => `memberi bantuan Rp500 ribu kepada ${n} KK` },
  { id: "bantuan_1jt_miskin", label: "Bantuan Rp1 juta ke 25,2 juta orang miskin", value: 25_220_000_000_000, unit: "kali bayar", emoji: "🤲", category: "Manusia", note: "Seluruh penduduk miskin (BPS 2025)", perPerson: 1_000_000, population: 25_220_000, populationLabel: "orang miskin", cmp: (n) => `memberi bantuan Rp1 juta ke seluruh 25,2 juta penduduk miskin sebanyak ${n} kali`, cmpPartial: (pct) => `membiayai ${pct} dari bantuan Rp1 juta ke seluruh penduduk miskin`, cmpCount: (n) => `memberi bantuan Rp1 juta kepada ${n} orang miskin` },
  { id: "umr_1orang", label: "UMR 1 orang 1 bulan", value: 3_500_000, unit: "orang", emoji: "💼", category: "Manusia", note: "Rata-rata nasional", cmp: (n) => `membayar UMR ${n} pekerja selama 1 bulan` },
  { id: "kuliah_ptn_murah", label: "Kuliah S1 PTN penuh (UKT rendah)", value: 20_000_000, unit: "mahasiswa", emoji: "🎓", category: "Pendidikan", note: "8 semester, UKT kelompok bawah", cmp: (n) => `membiayai ${n} mahasiswa kuliah S1 di PTN hingga lulus (UKT rendah)` },
  { id: "kuliah_ptn", label: "Kuliah S1 PTN penuh (UKT menengah)", value: 50_000_000, unit: "mahasiswa", emoji: "🎓", category: "Pendidikan", note: "8 semester, UGM/UI/ITB range", cmp: (n) => `membiayai ${n} mahasiswa kuliah S1 di PTN hingga lulus (UKT menengah)` },
  { id: "beasiswa_penuh", label: "Beasiswa S1 penuh (kuliah + hidup)", value: 100_000_000, unit: "mahasiswa", emoji: "🎓", category: "Pendidikan", note: "4 tahun termasuk biaya hidup", cmp: (n) => `memberikan beasiswa S1 penuh (kuliah + kebutuhan hidup) untuk ${n} mahasiswa` },
  { id: "sekolah_baru", label: "Bangun 1 sekolah dasar baru", value: 1_500_000_000, unit: "sekolah", emoji: "🏫", category: "Pendidikan", note: "6 ruang kelas, estimasi DAK", cmp: (n) => `membangun ${n} sekolah dasar baru` },
  { id: "renovasi_sekolah", label: "Renovasi 1 sekolah rusak", value: 800_000_000, unit: "sekolah", emoji: "🏫", category: "Pendidikan", note: "Rehab sedang-berat", cmp: (n) => `merenovasi ${n} sekolah rusak` },
  { id: "huntara_banjir", label: "Hunian sementara korban banjir Sumatera", value: 30_000_000, unit: "unit", emoji: "🏚️", category: "Kebutuhan Pokok", note: "Rp30 juta/unit huntara standar BNPB", cmp: (n) => `membangun ${n} unit hunian sementara untuk korban banjir Sumatera` },
  { id: "pltn_1000mw", label: "Pembangkit Listrik Tenaga Nuklir 1.000 MW", value: 100_000_000_000_000, unit: "unit", emoji: "⚛️", category: "Infrastruktur", note: "Estimasi biaya pembangunan PLTN 1.000 MW", minAValue: 100_000_000_000_000, cmp: (n) => `membangun ${n} PLTN berkapasitas 1.000 MW` },
  { id: "jalan_desa", label: "Jalan desa 1 km", value: 700_000_000, unit: "km", emoji: "🛤️", category: "Infrastruktur", note: "Hotmix 3cm, standar desa", cmp: (n) => `membangun ${n} km jalan desa` },
  { id: "jembatan", label: "Jembatan beton sederhana", value: 2_000_000_000, unit: "unit", emoji: "🌉", category: "Infrastruktur", note: "Bentang pendek", cmp: (n) => `membangun ${n} jembatan beton` },
  { id: "puskesmas", label: "Puskesmas baru", value: 4_000_000_000, unit: "unit", emoji: "🏥", category: "Infrastruktur", note: "Fasilitas kesehatan lengkap", cmp: (n) => `membangun ${n} Puskesmas baru` },
  { id: "rumah_subsidi", label: "Rumah subsidi (FLPP)", value: 165_000_000, unit: "unit", emoji: "🏠", category: "Infrastruktur", note: "Harga batas 2025", cmp: (n) => `membangun ${n} rumah subsidi` },
  { id: "beras_ton", label: "Beras 1 ton", value: 14_000_000, unit: "ton", emoji: "🍚", category: "Kebutuhan Pokok", note: "Harga pasar Rp14.000/kg", cmp: (n) => `membeli ${n} ton beras` },
  { id: "sembako_kk", label: "Paket sembako 1 KK senilai Rp500 ribu", value: 500_000, unit: "paket", emoji: "🧺", category: "Kebutuhan Pokok", note: "Beras, minyak, gula, telur", cmp: (n) => `memberi paket sembako senilai Rp500 ribu untuk ${n} keluarga` },
  { id: "pertalite_liter", label: "Bensin Pertalite 1 liter", value: 10_000, unit: "liter", emoji: "⛽", category: "Kebutuhan Pokok", note: "Harga resmi Rp10.000/liter", cmp: (n) => `membeli ${n} liter bensin Pertalite` },
  { id: "minyak_goreng_liter", label: "Minyak goreng sawit 1 liter", value: 20_000, unit: "liter", emoji: "🫗", category: "Kebutuhan Pokok", note: "Rata-rata kemasan & curah, April 2026", cmp: (n) => `membeli ${n} liter minyak goreng sawit` },
  { id: "ambulans", label: "Ambulans standar", value: 450_000_000, unit: "unit", emoji: "🚑", category: "Kesehatan", note: "Pengadaan pemerintah", cmp: (n) => `membeli ${n} ambulans` },
  { id: "bpjs_miskin_1bln", label: "BPJS Kelas 3 seluruh penduduk miskin 1 bulan", value: 882_700_000_000, unit: "bulan", emoji: "🏥", category: "Kesehatan", note: "25,2 juta orang × Rp35.000", population: 25_220_000, perUnit: 35_000, unitLabel: "orang miskin", cmp: (n) => `membayar BPJS Kelas 3 seluruh 25,2 juta penduduk miskin selama ${n}`, cmpPartial: (n) => `membayar BPJS Kelas 3 untuk ${n} orang miskin selama 1 bulan` },
  { id: "bpjs_1orang", label: "BPJS Kelas 3 per orang 1 bulan", value: 35_000, unit: "orang", emoji: "🏥", category: "Kesehatan", note: "Tarif resmi", cmp: (n) => `membayar BPJS Kelas 3 untuk ${n} orang selama 1 bulan` },
];

const categories = ["Manusia", "Pendidikan", "Infrastruktur", "Kebutuhan Pokok", "Kesehatan"];

function formatRupiah(n) {
  if (n >= 1_000_000_000_000) return `Rp${(n / 1_000_000_000_000).toFixed(1).replace('.0', '')} triliun`;
  if (n >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(1).replace('.0', '')} miliar`;
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1).replace('.0', '')} juta`;
  if (n >= 1_000) return `Rp${(n / 1_000).toFixed(0)} ribu`;
  return `Rp${n.toLocaleString('id-ID')}`;
}
function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.0', '')} juta`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(1).replace('.0', '')} ribu`;
  return n.toLocaleString('id-ID');
}
function formatDuration(months) {
  if (months >= 12) { const y = Math.floor(months/12), r = Math.round(months%12); return r === 0 ? `${y} tahun` : `${y} tahun ${r} bulan`; }
  if (months >= 1) return `${months.toFixed(1).replace('.0', '')} bulan`;
  return null;
}
// Returns dynamic label for B item based on selected A value
function getDynamicLabel(b, aValue) {
  if (b.perPerson && aValue < b.value) {
    const count = Math.floor(aValue / b.perPerson);
    return `Bantuan ${formatRupiah(b.perPerson)} ke ${formatNumber(count)} ${b.populationLabel}`;
  }
  return b.label;
}

function generateComparison(a, b) {
  const result = a.value / b.value;
  const aName = a.prefix
    ? a.prefix
    : a.id === "apbn_bgn"
      ? `${a.label} (${formatRupiah(a.value)})`
      : `Anggaran ${a.label} (${formatRupiah(a.value)})`;

  // Dynamic "count" mode for bantuan items when A < total cost
  if (b.perPerson && b.cmpCount && a.value < b.value) {
    const count = Math.floor(a.value / b.perPerson);
    return {
      number: formatNumber(count),
      unit: b.populationLabel,
      sentence: `${aName} bisa ${b.cmpCount(formatNumber(count))}.`
    };
  }

  if (b.unit === "bulan") {
    const d = formatDuration(result);
    if (d) return { number: d, unit: "", sentence: `${aName} bisa ${b.cmp(d)}.` };
    if (b.perUnit && b.cmpPartial) { const n = Math.floor(a.value / b.perUnit); return { number: formatNumber(n), unit: b.unitLabel||"orang", sentence: `${aName} bisa ${b.cmpPartial(formatNumber(n))}.` }; }
    const p = (result*100).toFixed(1); return { number: `${p}%`, unit: "", sentence: `${aName} hanya cukup untuk ${p}% dari ${b.label.toLowerCase()}.` };
  }
  if (b.unit === "kali bayar") {
    if (result >= 1) return { number: `${Math.floor(result)}×`, unit: "bayar", sentence: `${aName} bisa ${b.cmp(Math.floor(result))}.` };
    const p = (result*100).toFixed(1); return b.cmpPartial ? { number: `${p}%`, unit: "", sentence: `${aName} hanya bisa ${b.cmpPartial(p+"%")}.` } : { number: `${p}%`, unit: "", sentence: `${aName} hanya cukup untuk ${p}% dari ${b.label.toLowerCase()}.` };
  }
  const c = Math.floor(result);
  // Cap at maxPopulation — if result exceeds real population, show duration instead
  if (b.maxPopulation && c > b.maxPopulation) {
    const totalCost = b.maxPopulation * b.perUnitValue;
    const months = a.value / totalCost;
    const d = formatDuration(months);
    return { number: d, unit: "", sentence: `${aName} bisa ${b.cmpDuration(d)}.` };
  }
  return { number: formatNumber(c), unit: b.unit, sentence: `${aName} bisa ${b.cmp(formatNumber(c))}.` };
}

function PageHome({ onStart, onRandom, dark, onToggleTheme }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const phrases = [
    "Gaji Guru Honorer",
    "Bangun Jalan Aspal",
    "Biaya Kuliah",
    "Bangun Ulang Sekolah Rusak",
    "Iuran BPJS Warga Miskin",
    "Rumah Subsidi",
    "Bantuan Tunai Rakyat",
    "Puskesmas Baru",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % phrases.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "Rp1,2 T", label: "per hari" },
    { value: "Rp268 T", label: "anggaran 2026" },
  ];

  return (
    <div className="page home-page">

      {/* Centered hero block */}
      <div className="home-hero">
        <div className="home-eyebrow">MBG Versus</div>
        <div className="home-headline">
          <div className="home-mbg">MBG</div>
          <div className="home-vs-row">
            <span className="home-vs-word">vs</span>
            <div
              className="home-phrase"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
              }}
            >
              {phrases[idx]}
            </div>
          </div>
        </div>
      </div>

      <p className="home-body">
        Dengan dana Rp1,2 triliun per hari, MBG menjadi program pemerintah dengan anggaran terbesar dalam sejarah Indonesia. Tapi uang sebesar itu sebenarnya bisa untuk apa?
      </p>

      <p className="home-body">
        App ini memberi gambaran nyata: seberapa besar anggaran MBG jika dibandingkan dengan kebutuhan hidup rakyat Indonesia sehari-hari.
      </p>

      <div className="home-stats">
        {stats.map((s, i) => (
          <div key={i} className="home-stat">
            <div className="home-stat-value">{s.value}</div>
            <div className="home-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="home-divider" />
      <div className="home-cta-label">Mulai dari mana?</div>

      <div className="home-ctas">
        <button className="home-btn-primary" onClick={onStart}>
          <span className="home-btn-icon">⚖️</span>
          <div className="home-btn-text">
            <div className="home-btn-title">Mulai Bandingkan</div>
            <div className="home-btn-sub">Pilih sendiri belanja BGN & pembandingnya</div>
          </div>
          <span className="home-btn-arrow">→</span>
        </button>

        <button className="home-btn-secondary" onClick={onRandom}>
          <span className="home-btn-icon">🎲</span>
          <div className="home-btn-text">
            <div className="home-btn-title">Kejutkan Saya</div>
            <div className="home-btn-sub">Tampilkan perbandingan acak</div>
          </div>
          <span className="home-btn-arrow">→</span>
        </button>
      </div>

      <div className="home-footer">
        <span className="home-footer-text">Data bersumber dari Project Multatuli, LKPP/Inaproc, Kompas.id, Tempo, KPK, BPS, dan Kemendikbud. Dibuat untuk transparansi dan edukasi publik.</span>
        <button className="theme-toggle" onClick={onToggleTheme}>{dark ? <Sun size={13}/> : <Moon size={13}/>} {dark ? "Terang" : "Gelap"}</button>
      </div>
    </div>
  );
}

function PageA({ selectedA, setSelectedA, onNext, onHome }) {
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-link" onClick={onHome}>← Beranda</button>
        <div className="step-label red">Langkah 1 dari 3</div>
        <h1 className="title">Pilih belanja BGN</h1>
        <p className="subtitle">Mana yang ingin kamu bandingkan?</p>
      </div>
      <div className="card-list">
        {DATA_A.map(item => (
          <div key={item.id} className={`card card-a ${selectedA?.id === item.id ? "active" : ""}`} onClick={() => setSelectedA(item)}>
            <div className="card-inner">
              <div className="card-left">
                <div className="card-name">{item.label}</div>
                <div className="card-detail">{item.detail}</div>
              </div>
              <div className="card-price red">{formatRupiah(item.value)}</div>
            </div>
            {selectedA?.id === item.id && (
              <button className="inline-next-btn red" onClick={e => { e.stopPropagation(); onNext(); }}>
                Lanjut <ArrowRight size={15} strokeWidth={2.5} style={{display:"inline",verticalAlign:"middle"}}/>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PageB({ selectedA, selectedB, setSelectedB, activeCat, setActiveCat, onNext, onBack }) {
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-link" onClick={onBack}>← Kembali</button>
        <div className="step-label green">Langkah 2 dari 3</div>
        <h1 className="title">Bandingkan dengan apa?</h1>
        <div className="selected-chip">{selectedA.label} — {formatRupiah(selectedA.value)}</div>
      </div>
      <div className="tabs">
        {categories.map(c => (
          <button key={c} className={`tab ${activeCat === c ? "active" : ""}`} onClick={() => setActiveCat(c)}>{c}</button>
        ))}
      </div>
      <div className="card-list">
        {DATA_B.filter(b => b.category === activeCat && (!b.minAValue || selectedA.value >= b.minAValue)).map(item => {
          const dynamicLabel = getDynamicLabel(item, selectedA.value);
          const isSelected = selectedB?.id === item.id;
          return (
            <div key={item.id} className={`card card-b ${isSelected ? "active" : ""}`} onClick={() => setSelectedB(item)}>
              <div className="card-inner">
                <div className="card-emoji">{item.emoji}</div>
                <div className="card-left">
                  <div className="card-name">{dynamicLabel}</div>
                  <div className="card-detail">{item.note} — <span className="green">{formatRupiah(item.value)}/{item.unit === "kali bayar" || item.unit === "bulan" ? "total" : item.unit}</span></div>
                </div>
              </div>
              {isSelected && (
                <button className="inline-next-btn green" onClick={e => { e.stopPropagation(); onNext(); }}>
                  Lihat Hasil <ArrowRight size={15} strokeWidth={2.5} style={{display:"inline",verticalAlign:"middle"}}/>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PageResult({ selectedA, selectedB, comparison, onBack, onReset, onHome, isRandom, onRandom, dark, onToggleTheme }) {
  const [copied, setCopied] = useState(false);
  const shareText = `${comparison.sentence}\n\nCek sendiri: https://mbg-versus.vercel.app`;

  const share = () => {
    if (navigator.share) {
      navigator.share({ text: shareText });
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="page result-page">
      {copied && (
        <div className="toast">Teks berhasil disalin!</div>
      )}
      <div className="result-card">
        <div className="result-overline">Hasil Perbandingan</div>
        <div className="result-big">{comparison.number}</div>
        {comparison.unit && <div className="result-unit">{comparison.unit}</div>}
        <div className="result-sentence">{comparison.sentence}</div>
        <div className="result-meta">
          <div className="meta-line"><span className="dot red"/> {selectedA.label} — {formatRupiah(selectedA.value)}</div>
          <div className="meta-line"><span className="dot green"/> {selectedB.label} — {formatRupiah(selectedB.value)}/{selectedB.unit === "kali bayar" || selectedB.unit === "bulan" ? "total" : selectedB.unit}</div>
          <div className="meta-src">Sumber: {selectedA.source} · Data publik (BPS, Kemenkeu, Kemendikbud)</div>
        </div>
        <div className="result-btns">
          {isRandom ? (
            <>
              <button className="btn primary share" onClick={share}><Share2 size={15} strokeWidth={2.5}/> Bagikan</button>
              <button className="btn secondary" onClick={handleCopy}><Copy size={14} strokeWidth={2}/> Salin Teks</button>
              <button className="btn secondary" onClick={onRandom}><Shuffle size={14} strokeWidth={2}/> Acak Lagi</button>
              <button className="btn secondary" onClick={onHome}><Home size={14} strokeWidth={2}/> Beranda</button>
            </>
          ) : (
            <>
              <button className="btn primary share" onClick={share}><Share2 size={15} strokeWidth={2.5}/> Bagikan</button>
              <button className="btn secondary" onClick={handleCopy}><Copy size={14} strokeWidth={2}/> Salin Teks</button>
              <button className="btn secondary" onClick={onBack}>Ganti Pembanding</button>
              <button className="btn secondary" onClick={onReset}>Bandingkan Lagi</button>
              <button className="btn secondary" onClick={onHome}><Home size={14} strokeWidth={2}/> Beranda</button>
            </>
          )}
        </div>
      </div>
      <div className="footer">
        <span className="footer-text"><strong>Tentang data:</strong> Data belanja BGN bersumber dari analisis Project Multatuli atas data LKPP/Inaproc TA 2025, dikonfirmasi Tempo, Kompas.id, dan Laporan Tahunan KPK 2025. Data pembanding dari BPS, Kemendikbud, dan sumber publik lainnya.</span>
        <button className="theme-toggle" onClick={onToggleTheme}>{dark ? <Sun size={13}/> : <Moon size={13}/>} {dark ? "Terang" : "Gelap"}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [activeCat, setActiveCat] = useState("Manusia");
  const [isRandom, setIsRandom] = useState(false);
  const [dark, setDark] = useState(false);
  const comparison = selectedA && selectedB ? generateComparison(selectedA, selectedB) : null;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [step]);

  const RANDOM_A_IDS = ["apbn_bgn", "it_project", "motor", "dana_harian_mbg", "tablet", "komputer"];
  const handleRandom = () => {
    const pool = DATA_A.filter(d => RANDOM_A_IDS.includes(d.id));
    const a = pool[Math.floor(Math.random() * pool.length)];
    const b = DATA_B[Math.floor(Math.random() * DATA_B.length)];
    setSelectedA(a);
    setSelectedB(b);
    setIsRandom(true);
    setStep(3);
  };

  const handleReset = () => { setSelectedA(null); setSelectedB(null); setActiveCat("Manusia"); setIsRandom(false); setStep(1); };
  const handleHome = () => { setSelectedA(null); setSelectedB(null); setActiveCat("Manusia"); setIsRandom(false); setStep(0); };

  return (
    <div className={`app-root ${dark ? "dark" : "light"}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,600;6..72,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .app-root {
          min-height: 100vh;
          font-family: 'Newsreader', Georgia, serif;
          transition: background 0.3s, color 0.3s;
        }
        .app-root.dark {
          --bg: #0a0a0a; --bg2: #111; --bg3: #1a1510; --bg4: #0a0a0a;
          --text: #e8e4df; --text2: #c8c2b8; --text3: #7a756e; --text4: #5a554e; --text5: #3a3530;
          --border: #1e1c18; --border2: #2a2520; --border3: #1a1815;
          --card-hover-a: #171110; --card-hover-b: #101a15;
          --result-bg: linear-gradient(145deg, #141210, #1a1510);
          --meta-bg: #0a0a0a;
        }
        .app-root.light {
          --bg: #f5f2ee; --bg2: #fff; --bg3: #fdf8f4; --bg4: #fff;
          --text: #1a1410; --text2: #3a3025; --text3: #7a6e60; --text4: #9a8e80; --text5: #bab0a0;
          --border: #e0d8d0; --border2: #d0c8be; --border3: #e8e0d8;
          --card-hover-a: #fff5f0; --card-hover-b: #f0faf5;
          --result-bg: linear-gradient(145deg, #fff, #fdf8f4);
          --meta-bg: #f0ece8;
        }
        .app-root { background: var(--bg); color: var(--text); }

        .page { max-width: 720px; margin: 0 auto; padding: 0 20px 140px; animation: fadeUp .3s ease-out; }
        .result-page { padding-bottom: 40px; padding-top: 16px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Home ── */
        .home-page { padding: 0 20px 60px; max-width: 720px; margin: 0 auto; animation: fadeUp .4s ease-out; }
        .home-hero { text-align: center; padding: 56px 0 36px; border-bottom: 1px solid var(--border3); margin-bottom: 28px; }
        .home-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #c9553a; margin-bottom: 24px; }
        .home-headline { display: inline-block; }
        .home-mbg { font-size: clamp(52px, 12vw, 80px); font-weight: 700; color: #c9553a; line-height: 1; letter-spacing: -2px; font-family: 'DM Sans', sans-serif; }
        .home-vs-row { display: flex; align-items: baseline; justify-content: center; gap: 10px; margin-top: 4px; }
        .home-vs-word { font-family: 'Newsreader', Georgia, serif; font-size: clamp(18px, 4vw, 26px); color: var(--text); font-style: italic; font-weight: 300; flex-shrink: 0; }
        .home-phrase { font-family: 'DM Sans', sans-serif; font-size: clamp(20px, 4.5vw, 28px); font-weight: 700; color: var(--text); line-height: 1.2; transition: opacity 0.35s ease, transform 0.35s ease; text-align: left; }
        .home-body { font-size: 15px; line-height: 1.75; color: var(--text3); font-family: 'DM Sans', sans-serif; margin-bottom: 18px; }
        .home-stats { display: flex; gap: 0; margin: 32px 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .home-stat { flex: 1; padding: 20px 16px; text-align: center; border-right: 1px solid var(--border); }
        .home-stat:last-child { border-right: none; }
        .home-stat-value { font-family: 'DM Sans', sans-serif; font-size: clamp(18px, 4vw, 24px); font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .home-stat-label { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--text4); }
        .home-divider { border: none; border-top: 1px solid var(--border3); margin: 32px 0 24px; }
        .home-cta-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text4); margin-bottom: 12px; }
        .home-ctas { display: flex; flex-direction: column; gap: 10px; margin-bottom: 36px; }
        .home-btn-primary, .home-btn-secondary { display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: 10px; border: none; cursor: pointer; transition: all .2s; text-align: left; width: 100%; }
        .home-btn-primary { background: #c9553a; color: #fff; }
        .home-btn-primary:hover { background: #d4664d; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,85,58,0.2); }
        .home-btn-secondary { background: var(--bg2); border: 1px solid var(--border); color: var(--text2); }
        .home-btn-secondary:hover { border-color: var(--border2); transform: translateY(-1px); }
        .home-btn-icon { font-size: 22px; flex-shrink: 0; }
        .home-btn-text { flex: 1; }
        .home-btn-title { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 2px; }
        .home-btn-sub { font-family: 'DM Sans', sans-serif; font-size: 12px; opacity: 0.65; }
        .home-btn-arrow { font-size: 18px; flex-shrink: 0; opacity: 0.5; }
        .home-footer { font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--text5); line-height: 1.7; border-top: 1px solid var(--border3); padding-top: 16px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .home-footer-text { flex: 1; min-width: 180px; }

        /* ── Theme toggle ── */
        .theme-toggle { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; cursor: pointer; background: none; border: 1px solid var(--border2); border-radius: 20px; padding: 5px 12px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; color: var(--text4); transition: all .2s; }
        .theme-toggle:hover { border-color: var(--text3); color: var(--text2); }

        /* ── Stepper pages ── */
        .page-header { padding: 40px 0 20px; border-bottom: 1px solid var(--border3); margin-bottom: 16px; }
        .step-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
        .step-label.red { color: #c9553a; }
        .step-label.green { color: #3a9a6a; }
        .title { font-size: clamp(24px, 5vw, 34px); font-weight: 700; line-height: 1.2; color: var(--text); margin-bottom: 6px; }
        .subtitle { font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text3); }
        .back-link { font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text3); background: none; border: none; cursor: pointer; margin-bottom: 12px; display: block; padding: 0; }
        .back-link:hover { color: var(--text2); }
        .selected-chip { display: inline-block; margin-top: 10px; padding: 5px 14px; border-radius: 6px; background: #1f1410; border: 1px solid rgba(201,85,58,0.25); color: #c9553a; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; }

        .card-list { display: flex; flex-direction: column; gap: 6px; }
        .card { padding: 12px 16px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; transition: all .15s; background: var(--bg2); }
        .card:active { transform: scale(0.985); }
        .card-a:hover, .card-a.active { border-color: #c9553a; background: var(--card-hover-a); }
        .card-a.active { box-shadow: 0 0 0 1px #c9553a; }
        .card-b:hover, .card-b.active { border-color: #3a9a6a; background: var(--card-hover-b); }
        .card-b.active { box-shadow: 0 0 0 1px #3a9a6a; }
        .card-inner { display: flex; align-items: flex-start; gap: 10px; }
        .card-left { flex: 1; min-width: 0; }
        .card-name { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: var(--text2); margin-bottom: 2px; }
        .card.active .card-name { color: var(--text); }
        .card-detail { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--text4); line-height: 1.4; }
        .card-price { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; white-space: nowrap; flex-shrink: 0; }
        .card-price.red { color: #c9553a; }
        .card-emoji { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .green { color: #3a9a6a; }

        .tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 14px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .tabs::-webkit-scrollbar { display: none; }
        .tab { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text4); cursor: pointer; white-space: nowrap; transition: all .15s; }
        .tab:hover { border-color: #3a9a6a; color: var(--text2); }
        .tab.active { border-color: #3a9a6a; background: var(--card-hover-b); color: #3a9a6a; }

        .inline-next-btn { display: block; width: 100%; margin-top: 10px; padding: 10px 16px; border-radius: 6px; border: none; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: all .15s; text-align: center; }
        .inline-next-btn.red { background: #c9553a; color: #fff; }
        .inline-next-btn.red:hover { background: #d4664d; }
        .inline-next-btn.green { background: #3a9a6a; color: #fff; }
        .inline-next-btn.green:hover { background: #4aaa7a; }

        .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
        .dot.red { background: #c9553a; }
        .dot.green { background: #3a9a6a; }

        .btn { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; padding: 12px 20px; border-radius: 8px; cursor: pointer; transition: all .15s; border: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
        .btn.primary { color: #fff; flex-shrink: 0; }
        .btn.primary.red { background: #c9553a; }
        .btn.primary.red:hover { background: #d4664d; }
        .btn.primary.green { background: #3a9a6a; }
        .btn.primary.green:hover { background: #4aaa7a; }
        .btn.primary.share { background: #3a9a6a; border: none; color: #fff; flex: 1; }
        .btn.primary.share:hover { background: #4aaa7a; }
        .btn.secondary { background: transparent; border: 1px solid var(--border2); color: var(--text3); }
        .btn.secondary:hover { border-color: var(--text3); color: var(--text2); }

        .result-card { margin-top: 20px; padding: 40px 24px; background: var(--result-bg); border: 1px solid var(--border2); border-radius: 16px; animation: scaleIn .4s ease-out; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .result-overline { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--text4); text-align: center; margin-bottom: 28px; }
        .result-big { font-family: 'DM Sans', sans-serif; font-size: clamp(48px, 12vw, 76px); font-weight: 700; color: var(--text); line-height: 1; letter-spacing: -2px; text-align: center; }
        .result-unit { font-family: 'DM Sans', sans-serif; font-size: 18px; color: var(--text3); text-align: center; margin-top: 6px; }
        .result-sentence { font-size: 18px; line-height: 1.65; color: var(--text2); text-align: center; max-width: 540px; margin: 24px auto 28px; }
        .result-meta { padding: 14px 16px; background: var(--meta-bg); border-radius: 8px; margin-bottom: 24px; }
        .meta-line { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--text4); display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .meta-src { font-family: 'DM Sans', sans-serif; font-size: 10px; color: var(--text5); margin-top: 6px; }
        .result-btns { display: flex; gap: 8px; flex-wrap: wrap; }

        .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border3); font-family: 'DM Sans', sans-serif; font-size: 11px; line-height: 1.7; color: var(--text5); display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .footer strong { color: var(--text4); }
        .footer-text { flex: 1; min-width: 180px; }
        .toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: #1a1a1a; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 20px; z-index: 100; animation: toastIn .25s ease-out; white-space: nowrap; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>

      {step === 0 && <PageHome onStart={() => setStep(1)} onRandom={handleRandom} dark={dark} onToggleTheme={() => setDark(d => !d)} />}
      {step === 1 && <PageA selectedA={selectedA} setSelectedA={setSelectedA} onNext={() => setStep(2)} onHome={handleHome} />}
      {step === 2 && selectedA && <PageB selectedA={selectedA} selectedB={selectedB} setSelectedB={setSelectedB} activeCat={activeCat} setActiveCat={setActiveCat} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && comparison && <PageResult selectedA={selectedA} selectedB={selectedB} comparison={comparison} onBack={() => setStep(2)} onReset={handleReset} onHome={handleHome} isRandom={isRandom} onRandom={handleRandom} dark={dark} onToggleTheme={() => setDark(d => !d)} />}
    </div>
  );
}
