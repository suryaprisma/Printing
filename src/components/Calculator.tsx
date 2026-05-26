import React, { useState, useMemo } from 'react';
import { 
  Calculator as CalcIcon, 
  MessageSquare, 
  User, 
  FileCode, 
  FileText, 
  Send, 
  BadgeCheck, 
  Layers, 
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  A3_PAPER_LIST, 
  OUTDOOR_LIST, 
  NCR_LIST, 
  NCR_SIZES, 
  IDCARD_TIERS, 
  OTHERS_LIST, 
  CONTACT_INFO 
} from '../data';
import { OrderCategory, OrderState } from '../types';

export default function Calculator() {
  // Main form states
  const [category, setCategory] = useState<OrderCategory>('A3');
  const [customerName, setCustomerName] = useState('');
  const [fileName, setFileName] = useState('');
  const [notes, setNotes] = useState('');
  const [activeAdmin, setActiveAdmin] = useState<'admin1' | 'admin2'>('admin1');

  // Interactive configurations
  const [a3PaperId, setA3PaperId] = useState(A3_PAPER_LIST[0].id);
  const [a3Quantity, setA3Quantity] = useState<number>(10);
  const [a3Laminasi, setA3Laminasi] = useState<'none' | 'doff' | 'glossy'>('none');

  const [outdoorId, setOutdoorId] = useState(OUTDOOR_LIST[0].id);
  const [outdoorWidth, setOutdoorWidth] = useState<number>(3);
  const [outdoorHeight, setOutdoorHeight] = useState<number>(1);
  const [outdoorQuantity, setOutdoorQuantity] = useState<number>(1);

  const [ncrRangkap, setNcrRangkap] = useState<number>(1);
  const [ncrSize, setNcrSize] = useState<'1' | '1/2' | '1/3' | '1/4' | '1/6' | '1/8'>('1/4');
  const [ncrQuantity, setNcrQuantity] = useState<number>(1);
  const [ncrNominator, setNcrNominator] = useState(false);

  const [idCardQuantity, setIdCardQuantity] = useState<number>(10);

  const [otherId, setOtherId] = useState(OTHERS_LIST[0].id);
  const [otherQuantity, setOtherQuantity] = useState<number>(1);

  // Currency Formatter
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Live total calculating engine
  const orderDetails = useMemo(() => {
    let summaryText = '';
    let totalCost = 0;
    let descriptionDetail = '';

    if (category === 'A3') {
      const selectedPaper = A3_PAPER_LIST.find(p => p.id === a3PaperId) || A3_PAPER_LIST[0];
      const basePrice = selectedPaper.price;
      const laminationPrice = a3Laminasi !== 'none' ? 2000 : 0;
      const perSheetPrice = basePrice + laminationPrice;
      totalCost = perSheetPrice * a3Quantity;
      
      const laminasiLabel = a3Laminasi === 'none' ? 'Tanpa Laminasi' : a3Laminasi === 'doff' ? 'Laminasi Doff' : 'Laminasi Glossy';
      descriptionDetail = `${selectedPaper.name} (${formatRupiah(basePrice)}) + ${laminasiLabel} (+${formatRupiah(laminationPrice)})`;
      summaryText = `Cetak A3+ \n- Kertas: ${selectedPaper.name}\n- Laminasi: ${laminasiLabel}\n- Jumlah: ${a3Quantity} lembar`;
    } 
    
    else if (category === 'OUTDOOR') {
      const selectedOutdoor = OUTDOOR_LIST.find(o => o.id === outdoorId) || OUTDOOR_LIST[0];
      if (selectedOutdoor.id === 'xbanner') {
        totalCost = selectedOutdoor.pricePerM2 * outdoorQuantity;
        descriptionDetail = `X-Banner 440gr Set (60x160 cm) includes stand/ring`;
        summaryText = `Cetak Outdoor \n- Jenis: X-Banner Set (Stand Lengkap)\n- Kuantitas: ${outdoorQuantity} Unit`;
      } else {
        // Normal banner with M2 calculation
        const m2 = Math.max(1, outdoorWidth * outdoorHeight);
        totalCost = selectedOutdoor.pricePerM2 * m2 * outdoorQuantity;
        descriptionDetail = `Bahan: ${selectedOutdoor.name} (${formatRupiah(selectedOutdoor.pricePerM2)}/m²)\nDimensi: ${outdoorWidth}m x ${outdoorHeight}m (Dihitung: ${m2.toFixed(2)} m² per banner)`;
        summaryText = `Cetak Outdoor \n- Jenis: ${selectedOutdoor.name}\n- Ukuran: ${outdoorWidth} x ${outdoorHeight} meter\n- Qty: ${outdoorQuantity} lembar`;
      }
    } 
    
    else if (category === 'NCR') {
      const selectedNcr = NCR_LIST.find(n => n.rangkap === ncrRangkap) || NCR_LIST[0];
      const isSmallSize = ncrSize === '1/6' || ncrSize === '1/8';
      const basePackagePrice = isSmallSize ? selectedNcr.basePrice1_6to1_8 : selectedNcr.basePrice1to4;
      const nominatorPrice = ncrNominator ? 10000 : 0;
      
      totalCost = (basePackagePrice + nominatorPrice) * ncrQuantity;
      
      const matchedSizeObj = NCR_SIZES.find(s => s.size === ncrSize);
      const outputBooksNum = matchedSizeObj ? matchedSizeObj.books * ncrQuantity : 0;

      descriptionDetail = `Paket NCR ${selectedNcr.label} (${formatRupiah(basePackagePrice)}/rim)\nUkuran: ${ncrSize} F4\nNomerator (Penomoran Halaman): ${ncrNominator ? 'Ya (+Rp 10k/rim)' : 'Tidak'}`;
      summaryText = `Cetak Nota NCR \n- Ply: ${selectedNcr.label}\n- Ukuran: ${ncrSize} F4\n- Total Buku Jadi: ${outputBooksNum} Buku Nota\n- Nomerator: ${ncrNominator ? 'Ya' : 'Tidak'}\n- Qty: ${ncrQuantity} Paket/Rim NCR`;
    } 
    
    else if (category === 'IDCARD') {
      // Find tier
      const matchingTier = IDCARD_TIERS.find(t => idCardQuantity >= t.minQty && idCardQuantity <= t.maxQty) || IDCARD_TIERS[0];
      totalCost = matchingTier.pricePerPcs * idCardQuantity;
      descriptionDetail = `Harga Grosir Tier: ${formatRupiah(matchingTier.pricePerPcs)} per unit`;
      summaryText = `ID Card Premium \n- Qty: ${idCardQuantity} pcs\n- Rate Grosir: ${formatRupiah(matchingTier.pricePerPcs)}/pcs`;
    } 
    
    else if (category === 'OTHERS') {
      // Manage standard list
      let itemPrice = 0;
      let itemName = '';
      
      if (otherId === 'yasin') {
        itemPrice = otherQuantity >= 100 ? 7500 : 8500;
        itemName = `Buku Yasin Custom ${otherQuantity >= 100 ? '(>=100 Qty)' : '(<100 Qty)'}`;
      } else {
        const itemObj = OTHERS_LIST.find(o => o.id === otherId);
        itemPrice = itemObj ? itemObj.price : 0;
        itemName = itemObj ? itemObj.name : '';
      }

      totalCost = itemPrice * otherQuantity;
      descriptionDetail = `Cetak ${itemName} - Satuan: ${formatRupiah(itemPrice)}`;
      summaryText = `Layanan Cetak Lainnya \n- Jenis: ${itemName}\n- Kuantitas: ${otherQuantity}`;
    }

    return { totalCost, descriptionDetail, summaryText };
  }, [category, a3PaperId, a3Quantity, a3Laminasi, outdoorId, outdoorWidth, outdoorHeight, outdoorQuantity, ncrRangkap, ncrSize, ncrQuantity, ncrNominator, idCardQuantity, otherId, otherQuantity]);

  // Construct target WhatsApp link
  const orderViaWhatsApp = () => {
    // Generate beautiful clean Indonesian templates
    const selectedAdmin = activeAdmin === 'admin1' ? CONTACT_INFO.admin1 : CONTACT_INFO.admin2;
    
    const openingHarta = `*Halo, Admin Barokah Printing! Saya ingin memesan/bertanya mengenai cetakan.*\n\n`;
    const customerInfo = `*👤 DETAIL PEMESAN:*\n- Nama Pemesan: ${customerName || '-'}\n- Judul File/Dokumen: ${fileName || 'Belum siap/bertanya'}\n\n`;
    const calculationInfo = `*🖨️ DETAIL DETAIL SPESIFIKASI:*\n${orderDetails.summaryText}\n- Spesifikasi Harga: ${orderDetails.descriptionDetail}\n\n`;
    const notesInfo = notes ? `*📝 CATATAN KHUSUS:*\n"${notes}"\n\n` : '';
    const footerEst = `*💰 ESTIMASI TOTAL HARGA:* ${formatRupiah(orderDetails.totalCost)}\n\n_*) Note: Estimasi harga belum termasuk ongkir atau nego jumlah besar. File siap cetak sudah saya teliti._`;

    const fullMessage = encodeURIComponent(`${openingHarta}${customerInfo}${calculationInfo}${notesInfo}${footerEst}`);
    const whatsappUrl = `https://wa.me/62${selectedAdmin.phone.substring(1)}?text=${fullMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 p-5 sm:p-8" id="calculator-section">
      <div className="flex items-center space-x-2 pb-4 mb-6 border-b border-slate-100">
        <div className="w-2 h-8 bg-magenta-500 rounded-full" />
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Kalkulator Order Cetak</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Pilih tipe, masukkan ukuran/qty, dan langsung order via chat admin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Input selectors */}
        <div className="lg:col-span-7 space-y-5">
          {/* Category Selector Cards */}
          <div>
            <label className="text-xs font-black uppercase text-slate-400 ml-1 block mb-2.5">Tipe Layanan Cetak</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('A3')}
                className={`py-3 px-3 rounded-2xl text-xs font-black border-2 text-center transition-all cursor-pointer ${
                  category === 'A3' 
                    ? 'border-cyan-400 bg-cyan-50/70 text-cyan-900 shadow-md shadow-cyan-100/30' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
              >
                📝 A3+ Digital
              </button>
              <button
                type="button"
                onClick={() => setCategory('OUTDOOR')}
                className={`py-3 px-3 rounded-2xl text-xs font-black border-2 text-center transition-all cursor-pointer ${
                  category === 'OUTDOOR' 
                    ? 'border-cyan-400 bg-cyan-50/70 text-cyan-900 shadow-md shadow-cyan-100/30' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
              >
                🚩 Banner Outdoor
              </button>
              <button
                type="button"
                onClick={() => setCategory('NCR')}
                className={`py-3 px-3 rounded-2xl text-xs font-black border-2 text-center transition-all cursor-pointer ${
                  category === 'NCR' 
                    ? 'border-cyan-400 bg-cyan-50/70 text-cyan-900 shadow-md shadow-cyan-100/30' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
              >
                📑 Nota NCR
              </button>
              <button
                type="button"
                onClick={() => setCategory('IDCARD')}
                className={`py-3 px-3 rounded-2xl text-xs font-black border-2 text-center transition-all cursor-pointer ${
                  category === 'IDCARD' 
                    ? 'border-cyan-400 bg-cyan-50/70 text-cyan-900 shadow-md shadow-cyan-100/30' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
              >
                💳 ID Card
              </button>
              <button
                type="button"
                onClick={() => setCategory('OTHERS')}
                className={`py-3 px-3 rounded-2xl text-xs font-black border-2 text-center transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                  category === 'OTHERS' 
                    ? 'border-cyan-400 bg-cyan-50/70 text-cyan-900 shadow-md shadow-cyan-100/30' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
              >
                ✨ Cetakan Lain
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Dynamic input fields based on category */}
          <div className="space-y-4">
            {/* Category 1: A3 */}
            {category === 'A3' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="a3PaperSelect" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Jenis Bahan Kertas A3+</label>
                  <select
                    id="a3PaperSelect"
                    value={a3PaperId}
                    onChange={(e) => setA3PaperId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                  >
                    {A3_PAPER_LIST.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {formatRupiah(p.price)}/lbr</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="a3LaminasiSelect" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Laminasi Tambahan (+Rp2.000)</label>
                    <select
                      id="a3LaminasiSelect"
                      value={a3Laminasi}
                      onChange={(e) => setA3Laminasi(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                    >
                      <option value="none">Tanpa Laminasi (Polos)</option>
                      <option value="doff">Laminasi Kilap / Doff</option>
                      <option value="glossy">Laminasi Mengkilat / Glossy</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="a3QuantityInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Jumlah Lembar Cetak</label>
                    <input
                      id="a3QuantityInput"
                      type="number"
                      min="1"
                      value={a3Quantity}
                      onChange={(e) => setA3Quantity(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Category 2: Outdoor */}
            {category === 'OUTDOOR' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="outdoorSelect" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Jenis Bahan Spanduk / Banner</label>
                  <select
                    id="outdoorSelect"
                    value={outdoorId}
                    onChange={(e) => setOutdoorId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                  >
                    {OUTDOOR_LIST.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.name} - {o.id === 'xbanner' ? `${formatRupiah(o.pricePerM2)}/Set` : `${formatRupiah(o.pricePerM2)}/m²`}
                      </option>
                    ))}
                  </select>
                </div>

                {outdoorId !== 'xbanner' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="outdoorWidthInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Lebar Banner (Meter)</label>
                        <input
                          id="outdoorWidthInput"
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={outdoorWidth}
                          onChange={(e) => setOutdoorWidth(Math.max(0.1, parseFloat(e.target.value) || 0))}
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="outdoorHeightInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Tinggi Banner (Meter)</label>
                        <input
                          id="outdoorHeightInput"
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={outdoorHeight}
                          onChange={(e) => setOutdoorHeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 text-slate-800 border-2 border-yellow-250/50 rounded-2xl text-xs space-y-1 shadow-xs">
                      <p className="font-bold flex items-center gap-1">
                        <AlertCircle className="h-4 w-4 text-yellow-650" /> Aturan Cetak Banner:
                      </p>
                      <p className="font-semibold text-slate-600">Kuantitas m² di bawah 1,0 m² tetap dihitung bulat minimal 1,0 m² per banner.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-cyan-50/60 text-slate-800 border-2 border-cyan-155 rounded-2xl text-xs">
                    <p className="font-bold">Informasi X-Banner:</p>
                    <p className="mt-1 font-semibold text-slate-600">X-Banner 1 Set memiliki ukuran standar 60 x 160 cm, sudah termasuk penyangga kaki dan mata ayam sudut.</p>
                  </div>
                )}

                <div>
                  <label htmlFor="outdoorQtyInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Kuantitas Pemesanan</label>
                  <input
                    id="outdoorQtyInput"
                    type="number"
                    min="1"
                    value={outdoorQuantity}
                    onChange={(e) => setOutdoorQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            )}

            {/* Category 3: NCR */}
            {category === 'NCR' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ncrRangkapSelect" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Tingkat Rangkap (Ply)</label>
                    <select
                      id="ncrRangkapSelect"
                      value={ncrRangkap}
                      onChange={(e) => setNcrRangkap(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                    >
                      {NCR_LIST.map(n => (
                        <option key={n.rangkap} value={n.rangkap}>{n.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ncrSizeSelect" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Potongan Ukuran Buku</label>
                    <select
                      id="ncrSizeSelect"
                      value={ncrSize}
                      onChange={(e) => setNcrSize(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                    >
                      {NCR_SIZES.map(s => (
                        <option key={s.size} value={s.size}>{s.size} F4 ({s.label}) - Menghasilkan {s.books} Buku</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label htmlFor="ncrQtyInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Jumlah Paket/Rim NCR Cetak</label>
                    <input
                      id="ncrQtyInput"
                      type="number"
                      min="1"
                      value={ncrQuantity}
                      onChange={(e) => setNcrQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                    />
                  </div>

                  {/* Nomerator */}
                  <div className="pt-4">
                    <label className="relative flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ncrNominator}
                        onChange={(e) => setNcrNominator(e.target.checked)}
                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-2 border-slate-200 rounded-md"
                      />
                      <span className="text-xs text-slate-700 font-black uppercase select-none">
                        Gunakan Nomerator (+Rp10K /paket)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="p-3 bg-green-50 text-slate-800 border bg-green-150/50 rounded-2xl text-xs">
                  <span className="font-bold text-green-800 block">📦 Hasil Jadi Buku Nota:</span>
                  <span className="block mt-0.5 font-semibold text-slate-600">
                    Pemesanan {ncrQuantity} Paket/Rim NCR ukuran <strong>{ncrSize} F4</strong> akan menghasilkan total sebanyak <strong>{ncrQuantity * (NCR_SIZES.find(s => s.size === ncrSize)?.books || 0)} Buku Nota</strong> jadi.
                  </span>
                </div>
              </div>
            )}

            {/* Category 4: ID Card */}
            {category === 'IDCARD' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="idCardQtyInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Jumlah ID Card (Pcs)</label>
                  <input
                    id="idCardQtyInput"
                    type="number"
                    min="1"
                    value={idCardQuantity}
                    onChange={(e) => setIdCardQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                  />
                </div>

                <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl">
                  <span className="text-xs font-black text-slate-450 uppercase tracking-widest block mb-2 ml-1">Tabel Grosir Terpilih:</span>
                  <div className="space-y-1">
                    {IDCARD_TIERS.map((tier, index) => {
                      const isActive = idCardQuantity >= tier.minQty && idCardQuantity <= tier.maxQty;
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between text-xs px-3 py-2 rounded-xl font-mono ${
                            isActive ? 'bg-cyan-500 text-white font-extrabold shadow-sm' : 'text-slate-500 font-semibold'
                          }`}
                        >
                          <span>{tier.minQty} - {tier.maxQty === Infinity ? 'dst' : `${tier.maxQty} pcs`}</span>
                          <span>{formatRupiah(tier.pricePerPcs)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Category 5: Others */}
            {category === 'OTHERS' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="otherIdSelect" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Jenis Cetakan / Layanan</label>
                  <select
                    id="otherIdSelect"
                    value={otherId}
                    onChange={(e) => setOtherId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                  >
                    {/* Add Yasin custom placeholder */}
                    <option value="yasin">📚 Buku Yasin Custom (Sampul Hardcover/Softcover)</option>
                    {OTHERS_LIST.map(o => (
                      <option key={o.id} value={o.id}>{o.name} - {formatRupiah(o.price)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="otherQuantityInput" className="text-xs font-black uppercase text-slate-400 ml-1 block mb-1.5">Kuantitas Pemesanan</label>
                  <input
                    id="otherQuantityInput"
                    type="number"
                    min="1"
                    value={otherQuantity}
                    onChange={(e) => setOtherQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                  />
                </div>

                {otherId === 'yasin' && (
                  <div className="p-3 bg-cyan-50 text-cyan-900 border border-cyan-100 rounded-2xl text-xs">
                    <p className="font-bold">Info Harga Buku Yasin:</p>
                    <p className="mt-1 font-semibold leading-relaxed">Pemesanan di bawah 100 pcs dihitung Rp8.500/pcs. Pemesanan isi 100 pcs ke atas diskon otomatis menjadi Rp7.500/pcs.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Customer info form */}
          <div className="space-y-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block ml-1">Kelengkapan Data File</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerNameInput" className="text-xs font-black uppercase text-slate-450 block mb-1.5 ml-1 inline-flex items-center gap-1.5">
                  <User className="h-4 w-4 text-cyan-500" /> Nama Anda / Instansi *
                </label>
                <input
                  id="customerNameInput"
                  type="text"
                  placeholder="Contoh: Adi Saputra"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                />
              </div>

              <div>
                <label htmlFor="fileNameInput" className="text-xs font-black uppercase text-slate-450 block mb-1.5 ml-1 inline-flex items-center gap-1.5">
                  <FileCode className="h-4 w-4 text-cyan-500" /> Nama File PDF/Gambar *
                </label>
                <input
                  id="fileNameInput"
                  type="text"
                  placeholder="Contoh: banner_futsal_rev2.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notesInput" className="text-xs font-black uppercase text-slate-450 block mb-1.5 ml-1 inline-flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-cyan-500" /> Tambah Catatan Cetakan
              </label>
              <textarea
                id="notesInput"
                rows={2}
                placeholder="Spesifikasi tambahan, lipatan, finishing, dll..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-400 focus:outline-none focus:ring-3 focus:ring-cyan-400/10 text-slate-800 text-sm font-semibold transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right column: Interactive real-time receipt card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-950 relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Ink aesthetic glow background */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-magenta-500/25 to-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Tanda Estimasi Kalkulator</span>
                <span className="text-[10px] bg-magenta-600 text-white px-2.5 py-0.5 rounded-full font-bold">2026 BAROKAH</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Kategori Cetak</p>
                  <p className="text-sm font-bold text-white mt-1 text-cyan-400">
                    {category === 'A3' && '📝 PRINT DIGITAL A3+'}
                    {category === 'OUTDOOR' && '🚩 OUTDOOR BANNER / BALIHO'}
                    {category === 'NCR' && '📑 NOTA NCR CARBONLESS'}
                    {category === 'IDCARD' && '💳 ID CARD GROSIR'}
                    {category === 'OTHERS' && '✨ LAYANAN CETAK KHUSUS'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Spesifikasi Detail Teknik</p>
                  <div className="bg-slate-850/65 p-3.5 rounded-2xl border border-slate-800 mt-1">
                    <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-mono">
                      {orderDetails.summaryText}
                    </p>
                    <p className="text-[11px] text-cyan-300 mt-2 font-semibold">
                      {orderDetails.descriptionDetail}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Pemohon</label>
                    <p className="text-xs font-bold text-white mt-0.5 truncate">{customerName || 'Tamu / Umum'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">File Dokumen</label>
                    <p className="text-xs font-bold text-white mt-0.5 truncate text-emerald-400">{fileName || 'Tanya Admin'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-dashed border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Estimasi Pembayaran</span>
              <p className="text-3xl font-mono font-extrabold text-white mt-1">
                {formatRupiah(orderDetails.totalCost)}
              </p>
              <p className="text-[10px] text-slate-450 mt-1 leading-normal">
                Harga dihitung final untuk proses produksi standar cetak. Harga nego bisa diajukan via admin saat penyerahan berkas master.
              </p>
            </div>
          </div>

          {/* Admin choice & launcher panel */}
          <div className="mt-4 bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 space-y-4">
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2.5 ml-1">Pilih Admin WhatsApp Tujuan:</span>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setActiveAdmin('admin1')}
                  className={`py-3 px-4 rounded-2xl border-2 flex items-center gap-2.5 justify-center transition-all text-xs font-black cursor-pointer ${
                    activeAdmin === 'admin1'
                      ? 'border-cyan-400 bg-cyan-50/50 text-cyan-900 shadow-md shadow-cyan-100/30'
                      : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeAdmin === 'admin1' ? 'bg-cyan-500 animate-pulse' : 'bg-slate-300'}`} />
                  <div className="text-left font-mono">
                    <p className="leading-none text-xs font-black">Admin 1</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">{CONTACT_INFO.admin1.formatted}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveAdmin('admin2')}
                  className={`py-3 px-4 rounded-2xl border-2 flex items-center gap-2.5 justify-center transition-all text-xs font-black cursor-pointer ${
                    activeAdmin === 'admin2'
                      ? 'border-cyan-400 bg-cyan-50/50 text-cyan-900 shadow-md shadow-cyan-100/30'
                      : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeAdmin === 'admin2' ? 'bg-cyan-500 animate-pulse' : 'bg-slate-300'}`} />
                  <div className="text-left font-mono">
                    <p className="leading-none text-xs font-black">Admin 2</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">{CONTACT_INFO.admin2.formatted}</p>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={orderViaWhatsApp}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.99] text-white font-black py-4 px-5 rounded-2xl text-xs sm:text-sm tracking-wide uppercase transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Send className="h-4 w-4 text-white" />
              Kirim Ke WhatsApp Admin ({activeAdmin === 'admin1' ? 'Admin 1' : 'Admin 2'})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
