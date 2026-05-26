import React from 'react';
import { Map, Navigation, Phone, ExternalLink, Calendar, Copy, Check } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function LocationMap() {
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTACT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden" id="location-map-component">
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Navigation className="h-5.5 w-5.5 text-magenta-500 animate-pulse" />
          Alamat & Panduan Lokasi Fisik
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase mt-1">
          Kunjungi kami di GOR Futsal Barkla untuk mengambil hasil cetakan Anda secara offline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Detail & Controls */}
        <div className="p-5 sm:p-6 lg:col-span-12 xl:col-span-5 flex flex-col justify-between bg-slate-50/50">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full uppercase border border-cyan-100">
                Lokasi Pusat
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2.5">
                GOR FUTSAL BARKLA
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 mt-1.5 leading-relaxed font-semibold">
                {CONTACT_INFO.address}
              </p>
              <p className="text-xs text-cyan-700 font-extrabold mt-1.5">
                📌 Catatan Jalan: {CONTACT_INFO.addressNotes}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-cyan-600 transition-colors cursor-pointer"
                title="Salin alamat lengkap"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-slate-400" />
                    <span>Salin Alamat Lengkap</span>
                  </>
                )}
              </button>
            </div>

            <hr className="border-slate-200" />

            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Jam Kerja Toko</h4>
              <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="font-semibold">Senin - Jum'at:</span>
                  <span className="font-mono bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-lg text-cyan-800 font-black">09:00 - 21:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sabtu:</span>
                  <span className="font-mono bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-lg text-cyan-800 font-black">09:00 - 17:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-rose-600">Minggu / Merah:</span>
                  <span className="font-sans bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-lg text-rose-800 font-black">LIBUR / TUTUP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-4 space-y-3">
            <a
              href={CONTACT_INFO.googleMapsLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-magenta-600 to-magenta-700 text-white hover:from-magenta-700 hover:to-magenta-850 transition-all py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-md shadow-magenta-100 cursor-pointer"
            >
              <Map className="h-4 w-4" />
              Buka Google Maps Resmi
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            
            <a
              href="https://waze.com/ul?q=GOR+Futsal+Barkla+Klakahrejo+Surabaya"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-white transition-colors py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer"
            >
              Navigasi via Waze GPS
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right Side: Maps Frame and details */}
        <div className="lg:col-span-12 xl:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[320px] relative bg-slate-200">
          <iframe
            src="https://maps.google.com/maps?q=GOR%20Futsal%20Barkla%20Klakahrejo%20Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            title="Google Maps - Barokah Printing"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
