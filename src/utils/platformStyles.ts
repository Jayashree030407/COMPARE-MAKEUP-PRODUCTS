import { ShoppingPlatform } from '../types/makeup.ts';

export interface PlatformMeta {
  name: ShoppingPlatform;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badgeClass: string;
  tagline: string;
}

export const PLATFORM_METAS: Record<ShoppingPlatform, PlatformMeta> = {
  Tira: {
    name: 'Tira',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    tagline: 'Reliance Luxury & Beauty'
  },
  Nykaa: {
    name: 'Nykaa',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-900',
    borderColor: 'border-pink-200',
    badgeClass: 'bg-pink-100 text-pink-800 border-pink-300',
    tagline: 'India’s Premier Beauty App'
  },
  Amazon: {
    name: 'Amazon',
    bgColor: 'bg-yellow-50',
    textColor: 'text-slate-900',
    borderColor: 'border-yellow-200',
    badgeClass: 'bg-amber-50 text-slate-900 border-amber-300',
    tagline: 'Prime Express Delivery'
  },
  Myntra: {
    name: 'Myntra',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-900',
    borderColor: 'border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    tagline: 'Fashion & Beauty Hub'
  },
  Flipkart: {
    name: 'Flipkart',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    tagline: 'Assured Online Shopping'
  },
  Purplle: {
    name: 'Purplle',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-900',
    borderColor: 'border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
    tagline: 'Budget & Trending Cosmetics'
  },
  Meesho: {
    name: 'Meesho',
    bgColor: 'bg-fuchsia-50',
    textColor: 'text-fuchsia-900',
    borderColor: 'border-fuchsia-200',
    badgeClass: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300',
    tagline: 'Direct Wholesale Prices'
  }
};
