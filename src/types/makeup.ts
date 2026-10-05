export type MakeupCategory =
  | 'Lipstick'
  | 'Foundation'
  | 'Highlighter'
  | 'Blush'
  | 'Mascara'
  | 'Eyeliner'
  | 'Lip Liner'
  | 'Primer'
  | 'Concealer'
  | 'Eyeshadow'
  | 'Setting Spray';

export type ShoppingPlatform =
  | 'Tira'
  | 'Nykaa'
  | 'Amazon'
  | 'Myntra'
  | 'Flipkart'
  | 'Purplle'
  | 'Meesho';

export interface PlatformPrice {
  platform: ShoppingPlatform;
  mrp: number;
  price: number;
  discountPercent: number;
  deliveryFee: number;
  couponDiscount: number;
  effectivePrice: number;
  inStock: boolean;
  seller: string;
  url: string;
  specialOffer?: string;
  deliveryNote?: string;
  lastChecked?: string;
}

export interface ProductShade {
  id: string;
  name: string;
  code?: string;
  hex: string;
  isPopular?: boolean;
  platformPrices: PlatformPrice[];
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  fullName: string;
  category: MakeupCategory;
  size: string;
  finish: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  priceDropNotice?: string;
  shades: ProductShade[];
  defaultShadeId: string;
}

export interface AIAnalysis {
  understoodQuery: string;
  brand: string;
  productName: string;
  shade?: string;
  category?: string;
  budget?: number;
  isBudgetQuery: boolean;
  shadeExactMatch: boolean;
  shadeMismatchNote?: string;
  recommendationReason: string;
  savingsInsight: string;
}

export interface AIComparisonResponse {
  query: string;
  analysis: AIAnalysis;
  matchedProduct: Product | null;
  selectedShade: ProductShade | null;
  bestDeal: {
    platform: ShoppingPlatform;
    price: number;
    mrp: number;
    highestPrice: number;
    savings: number;
    savingsPercent: number;
    url: string;
    offerNote?: string;
  } | null;
  sortedPlatforms: PlatformPrice[];
  isDemoData: boolean;
  disclaimer: string;
  alternativeMatches?: Product[];
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  shadeName: string;
  targetPrice: number;
  currentLowestPrice: number;
  email: string;
  createdAt: string;
  status: 'active' | 'triggered';
}
