import React, { useState } from 'react';
import { Search, Info, HelpCircle, FileSpreadsheet, Layers, Mail, CheckCircle, Tag } from 'lucide-react';
import { 
  A3_PAPER_LIST, 
  OUTDOOR_LIST, 
  NCR_LIST, 
  NCR_SIZES, 
  IDCARD_TIERS, 
  OTHERS_LIST 
} from '../data';

export default function PriceList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'a3' | 'outdoor' | 'ncr' | 'idcard' | 'others'>('a3');

  // Format currency helpers
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  // Searching filter for each tab
  const filteredA3 = A3_PAPER_LIST.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOutdoor = OUTDOOR_LIST.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOthers = OTHERS_LIST.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 p-4 sm:p-6" id="price-list-component">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="h-5.5 w-5.5 text-magenta-500" />
            Daftar Harga Resmi Barokah
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1">
            Gunakan tab di bawah untuk melihat rincian harga sesuai kriteria cetak Anda.
          </p>
        </div>

        {/* Live pricing database search */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Cari jenis cetakan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-cyan-400 focus:ring-3 focus:ring-cyan-400/10 text-slate-800 transition-all font-semibold"
          />
        </div>
      </div>

      {/* Responsive tabs */}
      <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar border-b border-slate-100 -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => { setActiveTab('a3'); setSearchTerm(''); }}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'a3' 
              ? 'bg-magenta-600 text-white shadow-md shadow-magenta-100/55' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          Print Digital A3+
        </button>
        <button
          onClick={() => { setActiveTab('outdoor'); setSearchTerm(''); }}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'outdoor' 
              ? 'bg-magenta-600 text-white shadow-md shadow-magenta-100/55' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          Printing Outdoor (M2)
        </button>
        <button
          onClick={() => { setActiveTab('ncr'); setSearchTerm(''); }}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'ncr' 
              ? 'bg-magenta-600 text-white shadow-md shadow-magenta-100/55' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          Nota NCR Carbonless
        </button>
        <button
          onClick={() => { setActiveTab('idcard'); setSearchTerm(''); }}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'idcard' 
              ? 'bg-magenta-600 text-white shadow-md shadow-magenta-100/55' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          ID Card Premium
        </button>
        <button
          onClick={() => { setActiveTab('others'); setSearchTerm(''); }}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            activeTab === 'others' 
              ? 'bg-magenta-600 text-white shadow-md shadow-magenta-100/55' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          Lainnya & Brosur
        </button>
      </div>

      <div className="mt-5">
        {/* Tab 1: A3+ Digital Printing */}
        {activeTab === 'a3' && (
          <div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-3.5 mb-4 text-xs text-slate-600">
              <Info className="h-4 w-4 text-cyan-500 flex-shrink-0" />
              <span>Cetak presisi tinggi menggunakan media kertas luas A3+ ultra tajam. Note: pemesanan di atas 1 rim bisa nego via chat WA admin.</span>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    <th className="px-4 py-3 font-black">Jenis Kertas A3+</th>
                    <th className="px-4 py-3 font-black">Harga Per Lembar</th>
                    <th className="px-4 py-3 font-black text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs sm:text-sm text-slate-700">
                  {filteredA3.length > 0 ? (
                    filteredA3.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-950">{item.name}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono font-black text-cyan-600">{formatRupiah(item.price)}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-black text-cyan-700 border border-cyan-100">
                            A3+ Ready
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-slate-450">
                        Tidak ditemukan jenis kertas "{searchTerm}"
                      </td>
                    </tr>
                  )}
                  {/* Extra A3 Options listed in images */}
                  <tr className="bg-amber-50/40">
                    <td className="px-4 py-3 font-semibold text-amber-955">Tambahan Laminasi (Doff / Glossy)</td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-900">+ Rp 2.000</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs text-amber-700 font-extrabold uppercase">Per Lembar</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Printing Outdoor */}
        {activeTab === 'outdoor' && (
          <div>
            <div className="flex items-center gap-2 bg-cyan-50/60 border border-cyan-100 rounded-2xl p-3.5 mb-4 text-xs text-cyan-900">
              <Info className="h-4 w-4 text-cyan-600 flex-shrink-0" />
              <span>Sempurna untuk pembuatan Banner Toko, Spanduk Jembatan, Backdrop GOR, dan Stiker Besar. Harga dihitung berdasarkan Luas (Panjang x Lebar).</span>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    <th className="px-4 py-3 font-black">Jenis Bahan Outdoor</th>
                    <th className="px-4 py-3 font-black">Patokan Tarif</th>
                    <th className="px-4 py-3 font-black text-right">Satuan Hitung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs sm:text-sm text-slate-700">
                  {filteredOutdoor.length > 0 ? (
                    filteredOutdoor.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-950">{item.name}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono font-black text-cyan-600">{formatRupiah(item.pricePerM2)}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 border border-slate-100">
                            {item.id === 'xbanner' ? 'Per Unit' : 'Per Meter Persegi (m²)'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-slate-400">
                        Tidak ditemukan media outdoor "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Nota NCR Carbonless */}
        {activeTab === 'ncr' && (
          <div>
            <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4.5 mb-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5 mb-2.5">
                <Layers className="h-4 w-4 text-cyan-500 animate-bounce" />
                Informasi Cetak Nota NCR Carbonless (Buku Nota):
              </h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5">
                <li>Ukuran cetakan didasarkan pada pembagian kertas <strong>F4 Folio standar</strong>.</li>
                <li>Setiap buku / paket master berisi <strong>50 sheet lembar NCR asli</strong>.</li>
                <li>Waktu pengerjaan rapi berkisar <strong>5-7 Hari Kerja</strong>.</li>
                <li>Harganya dihitung <strong>per Rim/Paket NCR Master</strong> yang menghasilkan kelipatan buku sesuai ukurannya!</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Table of Base Package Prices */}
              <div className="border border-gray-150 rounded-2xl overflow-hidden">
                <div className="bg-gray-50/70 px-4 py-2.5 border-b border-gray-150">
                  <span className="text-[11px] font-bold text-gray-600 uppercase">Tarif Paket Master NCR</span>
                </div>
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-55 border-b border-gray-150 text-[10px] font-mono uppercase text-gray-400">
                    <tr>
                      <th className="px-4 py-2">Tingkat Rangkap / Ply</th>
                      <th className="px-4 py-2 text-right">Potongan 1 s/d 1/4</th>
                      <th className="px-4 py-2 text-right">Potongan 1/6 s/d 1/8</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                    {NCR_LIST.map((item) => (
                      <tr key={item.rangkap} className="hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-sans font-medium text-slate-900">{item.label}</td>
                        <td className="px-4 py-3 text-right text-cyan-600 font-black">{formatRupiah(item.basePrice1to4)}</td>
                        <td className="px-4 py-3 text-right text-magenta-600 font-black">{formatRupiah(item.basePrice1_6to1_8)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table of Output Books yields */}
              <div className="border border-slate-150 rounded-2xl overflow-hidden">
                <div className="bg-slate-50/70 px-4 py-2.5 border-b border-slate-150">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Kelipatan Output Buku Jadi</span>
                </div>
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-55 border-b border-slate-150 text-[10px] font-mono uppercase text-slate-400">
                    <tr>
                      <th className="px-4 py-2">Ukuran Nota</th>
                      <th className="px-4 py-2">Deskripsi Dimensi</th>
                      <th className="px-4 py-2 text-right">Hasil Buku Jadi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {NCR_SIZES.map((item) => (
                      <tr key={item.size} className="hover:bg-slate-50/40">
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-900">{item.size} F4</td>
                        <td className="px-4 py-2.5 text-xs text-slate-500">{item.label}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className="font-mono bg-cyan-50 text-cyan-800 font-black px-2 py-1 rounded-lg border border-cyan-100 text-xs">
                            {item.books} Buku Nota
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 bg-amber-50/60 border border-amber-200/50 rounded-2xl p-3.5 flex items-center justify-between text-xs text-amber-900">
              <span className="font-bold flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-amber-700" />
                Layanan Penomoran Buku Halaman:
              </span>
              <span>
                Tambahan <strong className="font-extrabold text-amber-800 font-mono">+ Rp 10.000 / paket</strong> untuk layanan <strong>NOMERATOR</strong> (Halaman bernomor berurutan).
              </span>
            </div>
          </div>
        )}

        {/* Tab 4: ID Card */}
        {activeTab === 'idcard' && (
          <div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-3.5 mb-4 text-xs text-slate-600">
              <Info className="h-4 w-4 text-cyan-500 flex-shrink-0" />
              <span>Grosir ID Card Berkualitas Tinggi (Kartu Identitas, Member Card, ID Panitia). Harga makin murah seiring penambahan kuantiti! File disiapkan siap cetak.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {IDCARD_TIERS.map((tier, index) => (
                <div key={index} className="border-2 border-slate-100 rounded-2xl p-4 bg-white hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">Kuantitas</span>
                    <span className="text-[10px] bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded-full font-bold">Grosir</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mt-2">
                    {tier.minQty} - {tier.maxQty === Infinity ? 'Seterusnya' : `${tier.maxQty} pcs`}
                  </h4>
                  <p className="text-xl font-mono font-extrabold text-cyan-600 mt-2">
                    {formatRupiah(tier.pricePerPcs)} <span className="text-xs text-slate-400 font-normal">/pcs</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Others & Brosur */}
        {activeTab === 'others' && (
          <div>
            <div className="flex items-center gap-2 bg-cyan-50/60 border border-cyan-100 rounded-2xl p-3.5 mb-4 text-xs text-cyan-900">
              <Info className="h-4 w-4 text-cyan-600 flex-shrink-0" />
              <span>Berikut tarif cetak brosur kilat 3 jam selesai, stempel otomatis, stempel flash, kartu nama reguler, dan cetak buku Yasin Barokah.</span>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-5/70 border-b border-slate-100 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    <th className="px-4 py-3 font-black">Tipe Cetakan</th>
                    <th className="px-4 py-3 font-black">Tarif Tetap / Kelipatan</th>
                    <th className="px-4 py-3 font-black text-right">Informasi Pengerjaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                  {filteredOthers.length > 0 ? (
                    filteredOthers.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-900">{item.name}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono font-black text-cyan-600">{formatRupiah(item.price)}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-100">
                            {item.id.includes('brosur') ? 'Kilat 3 Jam' : 'File Siap Cetak'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-slate-400">
                        Tidak ditemukan jenis cetakan "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
