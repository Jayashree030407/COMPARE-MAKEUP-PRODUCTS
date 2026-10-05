import { Product } from '../types/makeup.ts';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'maybelline-vinyl-ink',
    brand: 'Maybelline New York',
    name: 'Super Stay Vinyl Ink Liquid Lipstick',
    fullName: 'Maybelline New York Super Stay Vinyl Ink Longwear Liquid Lipstick',
    category: 'Lipstick',
    size: '4.2 ml',
    finish: 'Instant High-Shine Glossy Finish',
    rating: 4.4,
    reviewCount: 18420,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Transfer-resistant vinyl colour with up to 16HR wear. Colour Lock formula keeps budge-free instant shine.',
    priceDropNotice: '🔥 Price dropped by ₹150 this week on Tira',
    defaultShadeId: 'shade-35-cheeky',
    shades: [
      {
        id: 'shade-35-cheeky',
        name: '35 Cheeky',
        code: '35',
        hex: '#C77D77',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 849,
            price: 649,
            discountPercent: 24,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 649,
            inStock: true,
            seller: 'Reliance Retail Beauty',
            url: 'https://www.tirabeauty.com/product/maybelline-new-york-superstay-vinyl-ink-liquid-lipstick-35-cheeky',
            specialOffer: 'Extra ₹50 off with code TIRA50',
            deliveryNote: 'Free Express Delivery',
            lastChecked: 'Today, 10:15 AM'
          },
          {
            platform: 'Purplle',
            mrp: 849,
            price: 710,
            discountPercent: 16,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 710,
            inStock: true,
            seller: 'Purplle Certified Hub',
            url: 'https://www.purplle.com',
            deliveryNote: 'Standard 2-3 Days',
            lastChecked: 'Today, 09:30 AM'
          },
          {
            platform: 'Myntra',
            mrp: 849,
            price: 720,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 720,
            inStock: true,
            seller: 'Flash Beauty Mart',
            url: 'https://www.myntra.com',
            deliveryNote: 'Free Myntra Insider delivery',
            lastChecked: 'Today, 10:00 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 849,
            price: 749,
            discountPercent: 12,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 749,
            inStock: true,
            seller: 'Nykaa E-Retail Pvt Ltd',
            url: 'https://www.nykaa.com',
            deliveryNote: '2 Days Delivery',
            lastChecked: 'Today, 09:45 AM'
          },
          {
            platform: 'Amazon',
            mrp: 849,
            price: 799,
            discountPercent: 6,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 799,
            inStock: true,
            seller: 'Cloudtail India (Verified)',
            url: 'https://www.amazon.in',
            deliveryNote: 'Prime 1-Day Delivery',
            lastChecked: 'Today, 08:50 AM'
          },
          {
            platform: 'Flipkart',
            mrp: 849,
            price: 819,
            discountPercent: 4,
            deliveryFee: 40,
            couponDiscount: 0,
            effectivePrice: 859,
            inStock: true,
            seller: 'SuperComNet',
            url: 'https://www.flipkart.com',
            deliveryNote: 'Standard Delivery (+₹40)',
            lastChecked: 'Today, 08:30 AM'
          }
        ]
      },
      {
        id: 'shade-50-wicked',
        name: '50 Wicked',
        code: '50',
        hex: '#A31F34',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Nykaa',
            mrp: 849,
            price: 679,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 679,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            specialOffer: 'Special Nykaa Pink Deal',
            lastChecked: 'Today, 10:00 AM'
          },
          {
            platform: 'Tira',
            mrp: 849,
            price: 699,
            discountPercent: 18,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 699,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            lastChecked: 'Today, 09:30 AM'
          },
          {
            platform: 'Amazon',
            mrp: 849,
            price: 765,
            discountPercent: 10,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 765,
            inStock: true,
            seller: 'Appario Mart',
            url: 'https://www.amazon.in',
            lastChecked: 'Today, 08:45 AM'
          }
        ]
      },
      {
        id: 'shade-15-peachy',
        name: '15 Peachy',
        code: '15',
        hex: '#D77F6B',
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 849,
            price: 659,
            discountPercent: 22,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 659,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            lastChecked: 'Today, 09:00 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 849,
            price: 730,
            discountPercent: 14,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 730,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            lastChecked: 'Today, 09:30 AM'
          }
        ]
      },
      {
        id: 'shade-10-lippy',
        name: '10 Lippy',
        code: '10',
        hex: '#96303B',
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 849,
            price: 680,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 680,
            inStock: true,
            seller: 'Purplle Official',
            url: 'https://www.purplle.com',
            lastChecked: 'Today, 09:15 AM'
          },
          {
            platform: 'Amazon',
            mrp: 849,
            price: 749,
            discountPercent: 12,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 749,
            inStock: true,
            seller: 'Amazon Cloud Retail',
            url: 'https://www.amazon.in',
            lastChecked: 'Today, 08:30 AM'
          }
        ]
      }
    ]
  },
  {
    id: 'maybelline-matte-ink',
    brand: 'Maybelline New York',
    name: 'SuperStay Matte Ink Liquid Lipstick',
    fullName: 'Maybelline Super Stay Matte Ink 16HR Liquid Lipstick',
    category: 'Lipstick',
    size: '5 ml',
    finish: 'Flawless Velvet Matte',
    rating: 4.5,
    reviewCount: 29500,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic arrow applicator with intense pigmentation and saturated matte finish that lasts 16 hours.',
    priceDropNotice: '🔥 Best price alert: ₹549 on Purplle',
    defaultShadeId: 'shade-20-pioneer',
    shades: [
      {
        id: 'shade-20-pioneer',
        name: '20 Pioneer',
        code: '20',
        hex: '#A11624',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 699,
            price: 549,
            discountPercent: 21,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 549,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:10 AM'
          },
          {
            platform: 'Purplle',
            mrp: 699,
            price: 569,
            discountPercent: 19,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 569,
            inStock: true,
            seller: 'Purplle Direct',
            url: 'https://www.purplle.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 09:50 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 699,
            price: 599,
            discountPercent: 14,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 599,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            deliveryNote: 'Standard Delivery',
            lastChecked: 'Today, 09:20 AM'
          },
          {
            platform: 'Amazon',
            mrp: 699,
            price: 625,
            discountPercent: 11,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 625,
            inStock: true,
            seller: 'Verified Cosmetics Store',
            url: 'https://www.amazon.in',
            deliveryNote: 'Prime Delivery',
            lastChecked: 'Today, 09:00 AM'
          },
          {
            platform: 'Flipkart',
            mrp: 699,
            price: 649,
            discountPercent: 7,
            deliveryFee: 30,
            couponDiscount: 0,
            effectivePrice: 679,
            inStock: true,
            seller: 'RetailNet',
            url: 'https://www.flipkart.com',
            lastChecked: 'Today, 08:30 AM'
          }
        ]
      },
      {
        id: 'shade-15-lover',
        name: '15 Lover',
        code: '15',
        hex: '#AF5566',
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 699,
            price: 559,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 559,
            inStock: true,
            seller: 'Purplle Official',
            url: 'https://www.purplle.com'
          },
          {
            platform: 'Nykaa',
            mrp: 699,
            price: 610,
            discountPercent: 13,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 610,
            inStock: true,
            seller: 'Nykaa E-Retail',
            url: 'https://www.nykaa.com'
          }
        ]
      },
      {
        id: 'shade-80-ruler',
        name: '80 Ruler',
        code: '80',
        hex: '#8D3643',
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 699,
            price: 555,
            discountPercent: 21,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 555,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com'
          },
          {
            platform: 'Amazon',
            mrp: 699,
            price: 619,
            discountPercent: 11,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 619,
            inStock: true,
            seller: 'Amazon Retail',
            url: 'https://www.amazon.in'
          }
        ]
      }
    ]
  },
  {
    id: 'maybelline-fit-me-foundation',
    brand: 'Maybelline New York',
    name: 'Fit Me Matte + Poreless Liquid Foundation',
    fullName: 'Maybelline Fit Me Matte + Poreless Liquid Foundation with SPF 22',
    category: 'Foundation',
    size: '30 ml',
    finish: 'Natural Matte Finish',
    rating: 4.4,
    reviewCount: 38200,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Blurs pores and controls shine for up to 16 hours. Formulated with Clay and Micro-powders.',
    priceDropNotice: '🔥 Lowest price ₹479 on Purplle',
    defaultShadeId: 'shade-128-warm-nude',
    shades: [
      {
        id: 'shade-128-warm-nude',
        name: '128 Warm Nude',
        code: '128',
        hex: '#D7A780',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 649,
            price: 479,
            discountPercent: 26,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 479,
            inStock: true,
            seller: 'Purplle Certified',
            url: 'https://www.purplle.com',
            deliveryNote: 'Free Express shipping',
            lastChecked: 'Today, 10:20 AM'
          },
          {
            platform: 'Amazon',
            mrp: 649,
            price: 499,
            discountPercent: 23,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 499,
            inStock: true,
            seller: 'Cloudtail Retail',
            url: 'https://www.amazon.in',
            deliveryNote: 'Prime One-Day',
            lastChecked: 'Today, 09:40 AM'
          },
          {
            platform: 'Flipkart',
            mrp: 649,
            price: 510,
            discountPercent: 21,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 510,
            inStock: true,
            seller: 'SuperComNet',
            url: 'https://www.flipkart.com',
            lastChecked: 'Today, 09:10 AM'
          },
          {
            platform: 'Myntra',
            mrp: 649,
            price: 520,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 520,
            inStock: true,
            seller: 'Omni Retail',
            url: 'https://www.myntra.com',
            lastChecked: 'Today, 08:45 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 649,
            price: 549,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 549,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            lastChecked: 'Today, 08:30 AM'
          },
          {
            platform: 'Tira',
            mrp: 649,
            price: 550,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 550,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            lastChecked: 'Today, 08:20 AM'
          }
        ]
      },
      {
        id: 'shade-220-natural-beige',
        name: '220 Natural Beige',
        code: '220',
        hex: '#CE9A72',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 649,
            price: 489,
            discountPercent: 25,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 489,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com'
          },
          {
            platform: 'Purplle',
            mrp: 649,
            price: 515,
            discountPercent: 21,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 515,
            inStock: true,
            seller: 'Purplle Certified',
            url: 'https://www.purplle.com'
          },
          {
            platform: 'Amazon',
            mrp: 649,
            price: 539,
            discountPercent: 17,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 539,
            inStock: true,
            seller: 'Cloudtail',
            url: 'https://www.amazon.in'
          },
          {
            platform: 'Nykaa',
            mrp: 649,
            price: 569,
            discountPercent: 12,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 569,
            inStock: true,
            seller: 'Nykaa',
            url: 'https://www.nykaa.com'
          }
        ]
      },
      {
        id: 'shade-115-ivory',
        name: '115 Ivory',
        code: '115',
        hex: '#E2B895',
        platformPrices: [
          {
            platform: 'Amazon',
            mrp: 649,
            price: 495,
            discountPercent: 24,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 495,
            inStock: true,
            seller: 'Amazon Retail',
            url: 'https://www.amazon.in'
          },
          {
            platform: 'Nykaa',
            mrp: 649,
            price: 550,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 550,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'lakme-9-to-5-lipstick',
    brand: 'Lakme',
    name: '9 to 5 Primer + Matte Lipstick',
    fullName: 'Lakme 9 to 5 Primer + Matte Lipstick with Vitamin E',
    category: 'Lipstick',
    size: '3.6 g',
    finish: 'Comfortable Matte with Built-in Primer',
    rating: 4.3,
    reviewCount: 14200,
    image: 'https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80',
    description: 'Built-in primer smooths lip lines for 12 hours of smooth colour without drying.',
    priceDropNotice: '🔥 Deal: Under ₹400 across 3 stores',
    defaultShadeId: 'shade-mp8-rosy-sunday',
    shades: [
      {
        id: 'shade-mp8-rosy-sunday',
        name: 'MP8 Rosy Sunday',
        code: 'MP8',
        hex: '#B8586A',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 500,
            price: 375,
            discountPercent: 25,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 375,
            inStock: true,
            seller: 'Purplle Retail',
            url: 'https://www.purplle.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:00 AM'
          },
          {
            platform: 'Meesho',
            mrp: 500,
            price: 380,
            discountPercent: 24,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 380,
            inStock: true,
            seller: 'BeautyHub Direct',
            url: 'https://www.meesho.com',
            deliveryNote: 'Standard shipping',
            lastChecked: 'Today, 09:10 AM'
          },
          {
            platform: 'Flipkart',
            mrp: 500,
            price: 399,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 399,
            inStock: true,
            seller: 'RetailNet',
            url: 'https://www.flipkart.com',
            lastChecked: 'Today, 09:30 AM'
          },
          {
            platform: 'Amazon',
            mrp: 500,
            price: 410,
            discountPercent: 18,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 410,
            inStock: true,
            seller: 'Appario',
            url: 'https://www.amazon.in',
            lastChecked: 'Today, 08:40 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 500,
            price: 445,
            discountPercent: 11,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 445,
            inStock: true,
            seller: 'Nykaa E-Retail',
            url: 'https://www.nykaa.com',
            lastChecked: 'Today, 08:15 AM'
          }
        ]
      },
      {
        id: 'shade-mr1-red-letter',
        name: 'MR1 Red Letter',
        code: 'MR1',
        hex: '#B0182E',
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 500,
            price: 385,
            discountPercent: 23,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 385,
            inStock: true,
            seller: 'Purplle',
            url: 'https://www.purplle.com'
          },
          {
            platform: 'Nykaa',
            mrp: 500,
            price: 430,
            discountPercent: 14,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 430,
            inStock: true,
            seller: 'Nykaa',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'lakme-cc-cream',
    brand: 'Lakme',
    name: '9 to 5 Complexion Care CC Cream',
    fullName: 'Lakme 9 to 5 Complexion Care CC Cream with SPF 30 PA++',
    category: 'Foundation',
    size: '30 g',
    finish: 'Radiant Natural Everyday Glow',
    rating: 4.4,
    reviewCount: 22100,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    description: 'Instant glow with sun protection and moisturization for seamless daily radiance.',
    defaultShadeId: 'shade-01-beige',
    shades: [
      {
        id: 'shade-01-beige',
        name: '01 Beige',
        code: '01',
        hex: '#DDB38E',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Amazon',
            mrp: 375,
            price: 289,
            discountPercent: 23,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 289,
            inStock: true,
            seller: 'Cloudtail',
            url: 'https://www.amazon.in',
            lastChecked: 'Today, 10:10 AM'
          },
          {
            platform: 'Purplle',
            mrp: 375,
            price: 299,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 299,
            inStock: true,
            seller: 'Purplle Official',
            url: 'https://www.purplle.com',
            lastChecked: 'Today, 09:20 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 375,
            price: 325,
            discountPercent: 13,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 325,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            lastChecked: 'Today, 09:00 AM'
          },
          {
            platform: 'Flipkart',
            mrp: 375,
            price: 330,
            discountPercent: 12,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 330,
            inStock: true,
            seller: 'RetailNet',
            url: 'https://www.flipkart.com',
            lastChecked: 'Today, 08:30 AM'
          }
        ]
      },
      {
        id: 'shade-02-honey',
        name: '02 Honey',
        code: '02',
        hex: '#CF996E',
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 375,
            price: 295,
            discountPercent: 21,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 295,
            inStock: true,
            seller: 'Purplle Direct',
            url: 'https://www.purplle.com'
          },
          {
            platform: 'Nykaa',
            mrp: 375,
            price: 320,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 320,
            inStock: true,
            seller: 'Nykaa',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'swiss-beauty-concealer',
    brand: 'Swiss Beauty',
    name: 'Liquid Concealer',
    fullName: 'Swiss Beauty High Coverage Liquid Concealer',
    category: 'Concealer',
    size: '5.6 g',
    finish: 'Semi-Matte High Coverage',
    rating: 4.5,
    reviewCount: 31000,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight creamy formula that effortlessly conceals dark circles, blemishes, and pigmentation without creasing.',
    priceDropNotice: '🔥 Steal deal: ₹189 on Purplle',
    defaultShadeId: 'shade-01-warm-sand',
    shades: [
      {
        id: 'shade-01-warm-sand',
        name: '01 Warm Sand',
        code: '01',
        hex: '#DEB288',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 249,
            price: 189,
            discountPercent: 24,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 189,
            inStock: true,
            seller: 'Purplle Hub',
            url: 'https://www.purplle.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:15 AM'
          },
          {
            platform: 'Amazon',
            mrp: 249,
            price: 199,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 199,
            inStock: true,
            seller: 'Swiss Beauty Direct',
            url: 'https://www.amazon.in',
            lastChecked: 'Today, 09:40 AM'
          },
          {
            platform: 'Meesho',
            mrp: 249,
            price: 195,
            discountPercent: 22,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 195,
            inStock: true,
            seller: 'Discount Beauty',
            url: 'https://www.meesho.com',
            lastChecked: 'Today, 09:00 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 249,
            price: 224,
            discountPercent: 10,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 224,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            lastChecked: 'Today, 08:30 AM'
          }
        ]
      }
    ]
  },
  {
    id: 'mac-retro-matte-ruby-woo',
    brand: 'M.A.C',
    name: 'Retro Matte Lipstick',
    fullName: 'M.A.C Retro Matte Lipstick 707 Ruby Woo',
    category: 'Lipstick',
    size: '3 g',
    finish: 'Ultra Matte Saturated Finish',
    rating: 4.8,
    reviewCount: 42100,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    description: 'The world famous vivid blue-red shade with long-wearing 8 hour color and intense matte payoff.',
    priceDropNotice: '🔥 Rare luxury discount: ₹2,050 on Tira',
    defaultShadeId: 'shade-ruby-woo',
    shades: [
      {
        id: 'shade-ruby-woo',
        name: 'Ruby Woo (707)',
        code: '707',
        hex: '#960E18',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 2300,
            price: 2050,
            discountPercent: 11,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 2050,
            inStock: true,
            seller: 'Tira Luxury Authenticated',
            url: 'https://www.tirabeauty.com',
            specialOffer: 'Complimentary luxury sample on Tira',
            deliveryNote: 'Premium 24H Courier',
            lastChecked: 'Today, 10:20 AM'
          },
          {
            platform: 'Myntra',
            mrp: 2300,
            price: 2185,
            discountPercent: 5,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 2185,
            inStock: true,
            seller: 'Myntra Luxe',
            url: 'https://www.myntra.com',
            deliveryNote: 'Free Express Luxe delivery',
            lastChecked: 'Today, 09:30 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 2300,
            price: 2300,
            discountPercent: 0,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 2300,
            inStock: true,
            seller: 'Nykaa Luxe Official',
            url: 'https://www.nykaa.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 09:00 AM'
          }
        ]
      },
      {
        id: 'shade-velvet-teddy',
        name: 'Velvet Teddy',
        code: '617',
        hex: '#B27663',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 2300,
            price: 2070,
            discountPercent: 10,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 2070,
            inStock: true,
            seller: 'Tira Luxury',
            url: 'https://www.tirabeauty.com'
          },
          {
            platform: 'Nykaa',
            mrp: 2300,
            price: 2300,
            discountPercent: 0,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 2300,
            inStock: true,
            seller: 'Nykaa Luxe',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'loreal-infallible-freshwear',
    brand: "L'Oreal Paris",
    name: 'Infallible 24H Fresh Wear Foundation',
    fullName: "L'Oreal Paris Infallible 24H Fresh Wear Liquid Foundation with SPF 25",
    category: 'Foundation',
    size: '30 ml',
    finish: 'Breathable Satin Matte',
    rating: 4.6,
    reviewCount: 16800,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Sweat-proof, water-resistant, transfer-proof foundation with oxygen technology for weightless all-day coverage.',
    defaultShadeId: 'shade-125-natural-rose',
    shades: [
      {
        id: 'shade-125-natural-rose',
        name: '125 Natural Rose',
        code: '125',
        hex: '#E3B997',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 1299,
            price: 949,
            discountPercent: 27,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 949,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:00 AM'
          },
          {
            platform: 'Myntra',
            mrp: 1299,
            price: 999,
            discountPercent: 23,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 999,
            inStock: true,
            seller: 'Flash Beauty Mart',
            url: 'https://www.myntra.com',
            lastChecked: 'Today, 09:15 AM'
          },
          {
            platform: 'Nykaa',
            mrp: 1299,
            price: 1049,
            discountPercent: 19,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 1049,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com',
            lastChecked: 'Today, 08:50 AM'
          },
          {
            platform: 'Amazon',
            mrp: 1299,
            price: 1099,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 1099,
            inStock: true,
            seller: 'Appario',
            url: 'https://www.amazon.in',
            lastChecked: 'Today, 08:30 AM'
          }
        ]
      }
    ]
  },
  {
    id: 'nyx-dewy-setting-spray',
    brand: 'NYX Professional Makeup',
    name: 'Dewy Finish Setting Spray',
    fullName: 'NYX Professional Makeup Long Lasting Dewy Finish Makeup Setting Spray',
    category: 'Setting Spray',
    size: '60 ml',
    finish: 'Glowy Dewy Lock',
    rating: 4.6,
    reviewCount: 25400,
    image: 'https://images.unsplash.com/photo-1608248597359-20f77242be25?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight water-based formula that locks in makeup with a fresh, radiant dewy finish all day.',
    priceDropNotice: '🔥 Lowest price ₹775 on Tira',
    defaultShadeId: 'spray-dewy',
    shades: [
      {
        id: 'spray-dewy',
        name: 'Dewy Glow',
        hex: '#FBEBE3',
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 899,
            price: 775,
            discountPercent: 14,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 775,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:10 AM'
          },
          {
            platform: 'Myntra',
            mrp: 899,
            price: 809,
            discountPercent: 10,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 809,
            inStock: true,
            seller: 'Myntra Fashion',
            url: 'https://www.myntra.com'
          },
          {
            platform: 'Nykaa',
            mrp: 899,
            price: 849,
            discountPercent: 6,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 849,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com'
          },
          {
            platform: 'Amazon',
            mrp: 899,
            price: 855,
            discountPercent: 5,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 855,
            inStock: true,
            seller: 'Amazon Cloud Store',
            url: 'https://www.amazon.in'
          }
        ]
      }
    ]
  },
  {
    id: 'sugar-blush-peach-peak',
    brand: 'SUGAR Cosmetics',
    name: 'Contour De Force Mini Blush',
    fullName: 'SUGAR Cosmetics Contour De Force Mini Blush 01 Peach Peak',
    category: 'Blush',
    size: '4 g',
    finish: 'Silky Soft Matte',
    rating: 4.5,
    reviewCount: 9800,
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-blendable formula infused with spherical powders that melts into skin for a natural flush.',
    defaultShadeId: 'shade-01-peach-peak',
    shades: [
      {
        id: 'shade-01-peach-peak',
        name: '01 Peach Peak (Soft Peach Pink)',
        code: '01',
        hex: '#EE887C',
        isPopular: true,
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 449,
            price: 359,
            discountPercent: 20,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 359,
            inStock: true,
            seller: 'Purplle Hub',
            url: 'https://www.purplle.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:05 AM'
          },
          {
            platform: 'Amazon',
            mrp: 449,
            price: 379,
            discountPercent: 16,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 379,
            inStock: true,
            seller: 'Sugar Cosmetics Direct',
            url: 'https://www.amazon.in'
          },
          {
            platform: 'Nykaa',
            mrp: 449,
            price: 404,
            discountPercent: 10,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 404,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'colorbar-perfect-match-primer',
    brand: 'Colorbar',
    name: 'Flawless Finish Perfect Match Primer',
    fullName: 'Colorbar Flawless Finish Perfect Match Face Primer with Vitamin E',
    category: 'Primer',
    size: '30 ml',
    finish: 'Silky Matte Pore-Blurs',
    rating: 4.4,
    reviewCount: 11200,
    image: 'https://images.unsplash.com/photo-1573575155376-b5010099301b?auto=format&fit=crop&w=800&q=80',
    description: 'Oil-free gel primer formulated with silicone that locks hydration and prevents foundation oxidization.',
    defaultShadeId: 'primer-clear',
    shades: [
      {
        id: 'primer-clear',
        name: 'Translucent Clear Gel',
        hex: '#FAF0E8',
        platformPrices: [
          {
            platform: 'Tira',
            mrp: 850,
            price: 649,
            discountPercent: 24,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 649,
            inStock: true,
            seller: 'Reliance Retail',
            url: 'https://www.tirabeauty.com',
            deliveryNote: 'Free Shipping',
            lastChecked: 'Today, 10:12 AM'
          },
          {
            platform: 'Amazon',
            mrp: 850,
            price: 689,
            discountPercent: 19,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 689,
            inStock: true,
            seller: 'Colorbar India Direct',
            url: 'https://www.amazon.in'
          },
          {
            platform: 'Nykaa',
            mrp: 850,
            price: 722,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 722,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'faces-canada-magneteyes-kajal',
    brand: 'Faces Canada',
    name: 'Magneteyes Kajal',
    fullName: 'Faces Canada Magneteyes 24HR Waterproof Deep Black Kajal',
    category: 'Eyeliner',
    size: '0.35 g',
    finish: 'Intense Jet Black Kohl',
    rating: 4.4,
    reviewCount: 19400,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    description: 'Enriched with Almond Oil and Vitamin E for smudge-proof, fade-proof waterproof deep black eyes.',
    priceDropNotice: '🔥 Steal: ₹139 on Purplle',
    defaultShadeId: 'kajal-black',
    shades: [
      {
        id: 'kajal-black',
        name: 'Intense Black',
        code: 'Black',
        hex: '#111111',
        platformPrices: [
          {
            platform: 'Purplle',
            mrp: 199,
            price: 139,
            discountPercent: 30,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 139,
            inStock: true,
            seller: 'Purplle Direct',
            url: 'https://www.purplle.com',
            deliveryNote: 'Free Delivery',
            lastChecked: 'Today, 10:15 AM'
          },
          {
            platform: 'Amazon',
            mrp: 199,
            price: 149,
            discountPercent: 25,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 149,
            inStock: true,
            seller: 'Cloudtail',
            url: 'https://www.amazon.in'
          },
          {
            platform: 'Nykaa',
            mrp: 199,
            price: 169,
            discountPercent: 15,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 169,
            inStock: true,
            seller: 'Nykaa Official',
            url: 'https://www.nykaa.com'
          }
        ]
      }
    ]
  },
  {
    id: 'insight-non-transfer-lip-ink',
    brand: 'Insight Cosmetics',
    name: 'Non-Transfer Waterproof Lip Ink',
    fullName: 'Insight Cosmetics Matte Long Lasting Lip Ink (Budget Choice)',
    category: 'Lipstick',
    size: '4.5 ml',
    finish: 'Transfer-proof Matte',
    rating: 4.2,
    reviewCount: 8900,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Unbeatable budget lipstick that provides complete non-transfer smudge-proof matte look.',
    defaultShadeId: 'shade-top-notch',
    shades: [
      {
        id: 'shade-top-notch',
        name: '05 Top Notch (Brown Nude)',
        code: '05',
        hex: '#874D42',
        platformPrices: [
          {
            platform: 'Meesho',
            mrp: 160,
            price: 125,
            discountPercent: 22,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 125,
            inStock: true,
            seller: 'Cosmetics Hub',
            url: 'https://www.meesho.com',
            lastChecked: 'Today, 09:30 AM'
          },
          {
            platform: 'Amazon',
            mrp: 160,
            price: 135,
            discountPercent: 16,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 135,
            inStock: true,
            seller: 'Insight Direct',
            url: 'https://www.amazon.in'
          },
          {
            platform: 'Purplle',
            mrp: 160,
            price: 140,
            discountPercent: 12,
            deliveryFee: 0,
            couponDiscount: 0,
            effectivePrice: 140,
            inStock: true,
            seller: 'Purplle Direct',
            url: 'https://www.purplle.com'
          }
        ]
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  { name: 'Lipstick', icon: '💄', label: 'Lipstick', count: 4 },
  { name: 'Foundation', icon: '🎨', label: 'Foundation', count: 3 },
  { name: 'Highlighter', icon: '✨', label: 'Highlighter', count: 1 },
  { name: 'Blush', icon: '🌸', label: 'Blush', count: 1 },
  { name: 'Mascara', icon: '👁️', label: 'Mascara', count: 1 },
  { name: 'Eyeliner', icon: '🖌️', label: 'Eyeliner', count: 1 },
  { name: 'Lip Liner', icon: '💋', label: 'Lip Liner', count: 1 },
  { name: 'Primer', icon: '🧴', label: 'Primer', count: 1 },
  { name: 'Concealer', icon: '✨', label: 'Concealer', count: 1 },
  { name: 'Eyeshadow', icon: '🌷', label: 'Eyeshadow', count: 1 },
  { name: 'Setting Spray', icon: '💦', label: 'Setting Spray', count: 1 },
];

export const POPULAR_PROMPTS = [
  "Find Maybelline Vinyl Ink 35 Cheeky at the cheapest price",
  "Find the cheapest Maybelline SuperStay Matte Ink 20 Pioneer",
  "Where is Lakme 9 to 5 lipstick cheapest?",
  "Best foundation under ₹1000",
  "I want a brown lipstick under ₹500",
  "Maybelline Fit Me Foundation 128 Warm Nude best deal"
];
