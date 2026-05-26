/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PaperPriceItem {
  id: string;
  name: string;
  price: number;
}

export interface OutdoorPriceItem {
  id: string;
  name: string;
  pricePerM2: number;
}

export interface NcrPriceItem {
  rangkap: number;
  label: string;
  basePrice1to4: number; // For 1, 1/2, 1/3, 1/4 layout
  basePrice1_6to1_8: number; // For 1/6, 1/8 layout
}

export interface IdCardTierPrice {
  minQty: number;
  maxQty: number;
  pricePerPcs: number;
}

export type OrderCategory = 'A3' | 'OUTDOOR' | 'NCR' | 'IDCARD' | 'OTHERS';

export interface OrderState {
  category: OrderCategory;
  // A3 inputs
  a3PaperId: string;
  a3Quantity: number;
  a3Laminasi: 'none' | 'doff' | 'glossy';
  
  // Outdoor inputs
  outdoorId: string;
  outdoorWidth: number; // in meters
  outdoorHeight: number; // in meters
  outdoorQuantity: number;
  
  // NCR inputs
  ncrRangkap: number; // 1, 2, 3
  ncrSize: '1' | '1/2' | '1/3' | '1/4' | '1/6' | '1/8';
  ncrQuantity: number; // in bundles of 50 sheets
  ncrNominator: boolean;

  // ID Card inputs
  idCardQuantity: number;

  // Others inputs
  otherId: string;
  otherQuantity: number;

  // General inputs
  customerName: string;
  fileName: string;
  notes: string;
}
