/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaperPriceItem, OutdoorPriceItem, NcrPriceItem, IdCardTierPrice } from './types';

export const A3_PAPER_LIST: PaperPriceItem[] = [
  { id: 'ap120', name: 'Art Paper (AP) 120 gr', price: 2500 },
  { id: 'ap150', name: 'Art Paper (AP) 150 gr', price: 2500 },
  { id: 'ap210', name: 'Art Paper (AP) 210 gr', price: 3000 },
  { id: 'ap230', name: 'Art Paper (AP) 230 gr', price: 3000 },
  { id: 'ap260', name: 'Art Paper (AP) 260 gr', price: 3500 },
  { id: 'ap310', name: 'Art Paper (AP) 310 gr', price: 4000 },
  { id: 'bontak', name: 'Sticker Bontak', price: 5000 },
  { id: 'vinyl_matte', name: 'Sticker Vinyl Matte', price: 10000 },
  { id: 'vinyl_white', name: 'Sticker White Vinyl', price: 10000 },
  { id: 'transparan', name: 'Sticker Transparan', price: 10000 },
  { id: 'bc', name: 'Kertas BC', price: 3500 },
  { id: 'linen', name: 'Kertas LINEN', price: 4000 },
  { id: 'hvs', name: 'Kertas HVS', price: 2000 },
  { id: 'kalkir_a3', name: 'KALKIR A3+', price: 6000 },
  { id: 'kalkir_f4', name: 'KALKIR F4', price: 3000 }
];

export const OUTDOOR_LIST: OutdoorPriceItem[] = [
  { id: 'frontlite280', name: 'Fronlite 280 gr', pricePerM2: 17000 },
  { id: 'frontlite440', name: 'Fronlite 440 gr', pricePerM2: 35000 },
  { id: 'xbanner', name: 'X-Banner (440 gr) 1 Set (60x160 cm)', pricePerM2: 85000 }, // Managed as block price or custom
  { id: 'oneway', name: 'STIKER / One Way Vision', pricePerM2: 65000 }
];

export const NCR_LIST: NcrPriceItem[] = [
  { rangkap: 1, label: '1 Rangkap / Ply', basePrice1to4: 175000, basePrice1_6to1_8: 185000 },
  { rangkap: 2, label: '2 Rangkap / Ply', basePrice1to4: 350000, basePrice1_6to1_8: 370000 },
  { rangkap: 3, label: '3 Rangkap / Ply', basePrice1to4: 500000, basePrice1_6to1_8: 520000 }
];

export const NCR_SIZES = [
  { size: '1', label: '1 F4 (Full)', books: 10 },
  { size: '1/2', label: '1/2 F4', books: 20 },
  { size: '1/3', label: '1/3 F4', books: 30 },
  { size: '1/4', label: '1/4 F4', books: 40 },
  { size: '1/6', label: '1/6 F4', books: 60 },
  { size: '1/8', label: '1/8 F4', books: 80 }
];

export const IDCARD_TIERS: IdCardTierPrice[] = [
  { minQty: 1, maxQty: 5, pricePerPcs: 15000 },
  { minQty: 6, maxQty: 25, pricePerPcs: 12500 },
  { minQty: 26, maxQty: 50, pricePerPcs: 10000 },
  { minQty: 51, maxQty: 100, pricePerPcs: 8000 },
  { minQty: 101, maxQty: 200, pricePerPcs: 5000 },
  { minQty: 201, maxQty: 500, pricePerPcs: 4000 },
  { minQty: 501, maxQty: 1000, pricePerPcs: 3000 },
  { minQty: 1001, maxQty: Infinity, pricePerPcs: 2750 }
];

export const OTHERS_LIST = [
  { id: 'kartu_nama', name: 'Kartu Nama / Box (Isi 100)', price: 25000 },
  { id: 'stempel_flash', name: 'Stempel Flash Otomatis', price: 75000 },
  { id: 'yasin_100', name: 'Buku Yasin (Pesanan >= 100)', price: 7500 },
  { id: 'yasin_under100', name: 'Buku Yasin (Pesanan < 100)', price: 8500 },
  { id: 'brosur_a5', name: 'Brosur Kilat A5 (Bahan AP 120gr, 1 Sisi, 3 Jam Selesai)', price: 350000 },
  { id: 'brosur_a4', name: 'Brosur Kilat A4 (Bahan AP 120gr, 1 Sisi, 3 Jam Selesai)', price: 650000 }
];

export const CONTACT_INFO = {
  name: 'Barokah Printing',
  address: 'Klakahrejo No. 96, Kandangan, Kec. Benowo, Surabaya, Jawa Timur 60199',
  addressNotes: 'Di area GOR FUTSAL BARKLA',
  googleMapsLink: 'https://maps.google.com/?q=GOR+Futsal+Barkla+Klakahrejo+Surabaya',
  admin1: {
    phone: '089685049325',
    formatted: '0896-8504-9325',
    name: 'Admin Barokah 1'
  },
  admin2: {
    phone: '085883009647',
    formatted: '0858-8300-9647',
    name: 'Admin Barokah 2'
  },
  hours: {
    weekday: 'Senin - Jum\'at: 09:00 - 21:00 WIB',
    saturday: 'Sabtu: 09:00 - 17:00 WIB',
    sunday: 'Minggu & Tanggal Merah: LIBUR'
  }
};
