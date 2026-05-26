import React from 'react';
import { AlertOctagon, ShieldX, CheckSquare, FileText, Ban } from 'lucide-react';

export default function WarningsCard() {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-8 overflow-hidden relative" id="warnings-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100/40 rounded-full -mr-10 -mt-10 opacity-60 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="p-3.5 bg-gradient-to-br from-cyan-400 to-magenta-500 text-white rounded-2xl flex-shrink-0 shadow-md">
          <AlertOctagon className="h-7 w-7 text-white animate-bounce" />
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-7 bg-magenta-500 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Kebijakan & Komitmen Pelayanan
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Mohon baca terlebih dahulu sebelum melakukan pengerjaan atau pengiriman file.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Rule 1: No forgery */}
            <div className="p-5 rounded-3xl bg-slate-950 text-white border-2 border-slate-900 shadow-md relative overflow-hidden group">
              <div className="absolute right-3 bottom-3 text-rose-500/10 pointer-events-none">
                <ShieldX className="h-24 w-24 transform translate-x-3 translate-y-3 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex gap-3 relative z-10">
                <Ban className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-rose-450">
                    ANTI-PEMALSUAN DOKUMEN
                  </h3>
                  <p className="text-xs text-slate-350 mt-2 leading-relaxed">
                    Kami <strong className="text-rose-400 font-black">MUTLAK TIDAK MENERIMA</strong> pemalsuan dokumen legal atau non-legal dalam bentuk apapun (KTP, Ijazah, Nota Fiktif, Stempel Resmi Negara, dll). Tindakan pemalsuan akan langsung kami tolak keras.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 2: No typing, ready to print only */}
            <div className="p-5 rounded-3xl bg-yellow-50/50 text-slate-900 border-2 border-yellow-250/60 relative overflow-hidden group">
              <div className="absolute right-3 bottom-3 text-yellow-500/10 pointer-events-none">
                <FileText className="h-24 w-24 transform translate-x-3 translate-y-3 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex gap-3 relative z-10">
                <ShieldX className="h-5 w-5 text-yellow-650 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-yellow-805">
                    TIDAK MENERIMA PENGETIKAN
                  </h3>
                  <p className="text-xs text-slate-650 mt-2 leading-relaxed font-semibold">
                    Kami fokus pada kecepatan & kualitas cetak tinggi. Kami <strong className="text-yellow-905 font-black">tidak membuka jasa pengetikan dokumen</strong>. Pastikan file Anda sudah diketik rapi & siap cetak demi kelancaran antrean pengerjaan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-cyan-50/60 border-2 border-cyan-155 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
            <CheckSquare className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-cyan-950 uppercase tracking-wider">
                PENTING: Mohon Teliti File Anda Sebelum Dikirim!
              </p>
              <p className="text-[11px] text-cyan-805/90 mt-1 leading-relaxed font-semibold">
                Pastikan ukuran gambar, posisi tulisan/margin, dan resolusi file sudah disesuaikan agar hasil cetak memuaskan tanpa pecah. Kami mendahulukan file-file siap cetak!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
