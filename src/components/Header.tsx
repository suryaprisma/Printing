import React, { useState, useEffect } from 'react';
import { Printer, Clock, MapPin, Eye, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function Header() {
  const [wibTimeStr, setWibTimeStr] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const updateStatus = () => {
      // Direct UTC calculation to WIB (GMT +7)
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const wibDate = new Date(utc + (3600000 * 7));
      
      const hours = wibDate.getHours();
      const minutes = wibDate.getMinutes();
      const day = wibDate.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Saturday

      const currentMinutes = hours * 60 + minutes;
      const startMinutes = 9 * 60; // 09:00 WIB
      
      let shopOpen = false;
      let msg = '';

      if (day >= 1 && day <= 5) {
        // Senin - Jum'at: 09.00 - 21.00 WIB
        const endMinutes = 21 * 60;
        shopOpen = currentMinutes >= startMinutes && currentMinutes < endMinutes;
        msg = 'Senin - Jum\'at (09:00 - 21:00 WIB)';
      } else if (day === 6) {
        // Sabtu: 09.00 - 17.00 WIB
        const endMinutes = 17 * 60;
        shopOpen = currentMinutes >= startMinutes && currentMinutes < endMinutes;
        msg = 'Sabtu (09:00 - 17:00 WIB)';
      } else {
        // Minggu: Tutup
        shopOpen = false;
        msg = 'Minggu / Tanggal Merah (TUTUP)';
      }

      setIsOpen(shopOpen);
      setStatusMessage(msg);
      
      // Format current time in WIB
      const pad = (num: number) => String(num).padStart(2, '0');
      const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      setWibTimeStr(`${daysIndo[day]}, ${pad(hours)}:${pad(minutes)} WIB`);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative bg-white border-b-4 border-yellow-400 shadow-sm overflow-hidden" id="main-header">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-magenta-500 to-yellow-400 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md flex-shrink-0">
              <Printer className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-black tracking-widest bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-sm uppercase">
                  EST. 2026
                </span>
                {isOpen ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-3 py-0.5 rounded-full border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    Buka Sekarang
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-100 text-rose-700 px-3 py-0.5 rounded-full border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Tutup Sementara
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-slate-900 mt-1">
                BAROKAH PRINTING
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5 flex-wrap">
                <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <span>Klakahrejo No. 96, Surabaya <span className="text-slate-300">•</span> <span className="font-extrabold text-cyan-500">GOR FUTSAL BARKLA</span></span>
              </p>
            </div>
          </div>

          {/* Time & Quick Stats Dashboard */}
          <div className="bg-slate-50 border-2 border-slate-100/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 self-start md:self-auto w-full md:w-auto shadow-sm">
            <div className="flex items-center gap-2.5">
              <Clock className="h-4.5 w-4.5 text-magenta-500 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Waktu Surabaya (WIB)</p>
                <p className="text-xs font-black text-slate-800 mt-1">{wibTimeStr || 'Mengambil waktu...'}</p>
                <p className="text-[10px] text-slate-450 mt-0.5 leading-none font-semibold">{statusMessage}</p>
              </div>
            </div>

            <div className="h-px sm:h-8 w-full sm:w-px bg-slate-200" />

            <div className="flex items-center gap-3 justify-between sm:justify-start">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none font-semibold">Status Pelayanan</span>
                <span className="text-xs font-black text-slate-700 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> File Siap Cetak
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
