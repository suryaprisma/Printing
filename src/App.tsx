/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import WarningsCard from './components/WarningsCard';
import Calculator from './components/Calculator';
import PriceList from './components/PriceList';
import LocationMap from './components/LocationMap';
import { 
  FileCheck, 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight,
  Info
} from 'lucide-react';
import { CONTACT_INFO } from './data';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-800 font-sans antialiased selection:bg-indigo-600 selection:text-white" id="app-root">
      
      {/* 1. Header & Live Shop Operations */}
      <Header />

      {/* Main Single-screen Dashboard Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Quick welcome / instruction callouts */}
        <div className="bg-linear-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-850 rounded-full -mr-20 -mt-20 opacity-20 pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase bg-indigo-950/60 px-2.5 py-1 rounded-md">
                Selamat Datang di Barokah Printing
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mt-2 tracking-tight">
                Cetak Praktis & Cepat Langsung Dari Rumah!
              </h2>
              <p className="text-xs sm:text-sm text-slate-350 mt-1 max-w-2xl leading-relaxed">
                Kalkulasikan sendiri harga cetak spanduk, buku nota NCR, stiker, ID card grosir, atau selebaran A3+ Anda di bawah. Kirimkan berkas digital siap cetak langsung ke WhatsApp untuk proses pengerjaan instan.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/62${CONTACT_INFO.admin1.phone.substring(1)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all"
              >
                <MessageCircle className="h-4 w-4 text-white" />
                Tanya Admin 1
              </a>
              <a
                href={`https://wa.me/62${CONTACT_INFO.admin2.phone.substring(1)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all"
              >
                <PhoneCall className="h-4 w-4 text-white" />
                Hubungi Admin 2
              </a>
            </div>
          </div>
        </div>

        {/* 2. Policies Warning Box (Image requirements constraint) */}
        <WarningsCard />

        {/* 3. Printing interactive calculator & prefilled order WhatsApp dispatcher */}
        <div className="grid grid-cols-1 gap-6">
          <Calculator />
        </div>

        {/* 4. Complete Catalog & Search pricing panels */}
        <PriceList />

        {/* 5. Physical Map direction guides */}
        <LocationMap />

      </main>

      {/* Premium minimal footer */}
      <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-850" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-md tracking-wider">BAROKAH PRINTING</span>
                <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded-full font-mono font-bold">RELIABLE PRINTING SINCE 2026</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                Jasa cetak murah berkualitas tinggi di Klakahrejo. Kami mendahulukan kebersihan pengerjaan, kecepatan respon, dan hasil cetak tajam menggunakan printer modern digital laser.
              </p>
            </div>
            
            <div className="text-left md:text-right">
              <p className="text-xs text-slate-350">📍 Alamat Outlet Resmi:</p>
              <p className="text-xs text-white mt-0.5">Klakahrejo No. 96, Surabaya (GOR FUTSAL BARKLA)</p>
              <p className="text-[10px] text-slate-500 mt-1">© 2026 Barokah Printing Surabaya. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
