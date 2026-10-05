import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { MOCK_PRODUCTS, CATEGORIES_LIST } from './src/data/mockProducts.ts';
import { Product, ProductShade, PlatformPrice, ShoppingPlatform, PriceAlert, AIComparisonResponse } from './src/types/makeup.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// In-memory stores for alerts and wishlist
let priceAlerts: PriceAlert[] = [
  {
    id: 'alert-1',
    productId: 'maybelline-vinyl-ink',
    productName: 'Maybelline New York Super Stay Vinyl Ink',
    shadeName: '35 Cheeky',
    targetPrice: 600,
    currentLowestPrice: 649,
    email: 'makeupfan@example.com',
    createdAt: new Date().toISOString(),
    status: 'active'
  }
];

let wishlistIds: Set<string> = new Set(['maybelline-vinyl-ink', 'maybelline-fit-me-foundation']);

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Helper to find exact product matching
function matchProduct(queryText: string): {
  product: Product | null;
  detectedShadeName: string | null;
  budget: number | null;
  category: string | null;
} {
  const lower = queryText.toLowerCase();

  // Extract budget if present: e.g., "under 500", "under ₹1000", "< 600"
  let budget: number | null = null;
  const budgetMatch = lower.match(/(?:under|below|less than|<|budget of)?\s*(?:rs\.?|inr|₹)?\s*(\d{3,5})/i);
  if (budgetMatch && budgetMatch[1]) {
    const val = parseInt(budgetMatch[1], 10);
    if (!isNaN(val) && val >= 100 && val <= 10000) {
      budget = val;
    }
  }

  // Detect category
  let category: string | null = null;
  for (const cat of CATEGORIES_LIST) {
    if (lower.includes(cat.name.toLowerCase())) {
      category = cat.name;
      break;
    }
  }

  // Score products based on tokens
  let bestMatch: Product | null = null;
  let highestScore = 0;
  let detectedShade: string | null = null;

  for (const prod of MOCK_PRODUCTS) {
    let score = 0;
    const prodLower = (prod.brand + ' ' + prod.name + ' ' + prod.category).toLowerCase();
    
    // Check brand
    if (lower.includes(prod.brand.toLowerCase())) {
      score += 4;
    }

    // Check specific keywords
    const keywords = prod.name.toLowerCase().split(/\s+/);
    for (const kw of keywords) {
      if (kw.length > 2 && lower.includes(kw)) {
        score += 2;
      }
    }

    // Check shades
    for (const s of prod.shades) {
      const shadeLower = s.name.toLowerCase();
      const codeLower = s.code?.toLowerCase();
      if (lower.includes(shadeLower) || (codeLower && lower.includes(codeLower))) {
        score += 6;
        detectedShade = s.name;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = prod;
    }
  }

  // If score is too low and budget/category was asked, find top matching budget item
  if (highestScore < 3) {
    if (budget || category) {
      const candidates = MOCK_PRODUCTS.filter(p => {
        if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
        if (budget) {
          const minP = Math.min(...p.shades.flatMap(s => s.platformPrices.map(pp => pp.effectivePrice)));
          if (minP > budget) return false;
        }
        return true;
      });
      if (candidates.length > 0) {
        bestMatch = candidates[0];
      }
    }
  }

  return {
    product: bestMatch,
    detectedShadeName: detectedShade,
    budget,
    category
  };
}

// Build comparison payload
function buildComparisonResponse(
  query: string,
  matchedProduct: Product | null,
  detectedShadeName: string | null,
  budget: number | null,
  aiReasoning?: { summary: string; savingsText: string }
): AIComparisonResponse {
  if (!matchedProduct) {
    return {
      query,
      analysis: {
        understoodQuery: query,
        brand: '',
        productName: '',
        budget: budget || undefined,
        isBudgetQuery: !!budget,
        shadeExactMatch: false,
        recommendationReason: "We couldn't find an exact match for this makeup product in our verified database.",
        savingsInsight: "Try searching for popular products like 'Maybelline Vinyl Ink 35 Cheeky' or 'Lakme 9 to 5 lipstick'."
      },
      matchedProduct: null,
      selectedShade: null,
      bestDeal: null,
      sortedPlatforms: [],
      isDemoData: true,
      disclaimer: "Demo prices for Indian cosmetics stores (Nykaa, Tira, Amazon, Myntra, Flipkart, Purplle, Meesho). Final checkout price may vary with payment coupons."
    };
  }

  // Pick shade
  let selectedShade: ProductShade = matchedProduct.shades[0];
  let shadeExactMatch = false;
  let shadeMismatchNote: string | undefined = undefined;

  if (detectedShadeName) {
    const found = matchedProduct.shades.find(
      s => s.name.toLowerCase().includes(detectedShadeName.toLowerCase()) ||
           (s.code && detectedShadeName.toLowerCase().includes(s.code.toLowerCase()))
    );
    if (found) {
      selectedShade = found;
      shadeExactMatch = true;
    } else {
      shadeMismatchNote = `Requested shade "${detectedShadeName}" was not found. Comparing default shade "${selectedShade.name}".`;
    }
  } else {
    // Default to the product's primary/popular shade
    selectedShade = matchedProduct.shades.find(s => s.id === matchedProduct.defaultShadeId) || matchedProduct.shades[0];
  }

  // Sort platforms by effectivePrice ascending
  const sortedPlatforms: PlatformPrice[] = [...selectedShade.platformPrices].sort(
    (a, b) => a.effectivePrice - b.effectivePrice
  );

  const cheapest = sortedPlatforms[0];
  const mostExpensive = sortedPlatforms[sortedPlatforms.length - 1];
  const maxSavings = mostExpensive ? mostExpensive.effectivePrice - cheapest.effectivePrice : 0;
  const savingsPercent = mostExpensive ? Math.round((maxSavings / mostExpensive.effectivePrice) * 100) : 0;

  const bestDeal = cheapest
    ? {
        platform: cheapest.platform,
        price: cheapest.effectivePrice,
        mrp: cheapest.mrp,
        highestPrice: mostExpensive ? mostExpensive.effectivePrice : cheapest.effectivePrice,
        savings: maxSavings,
        savingsPercent,
        url: cheapest.url,
        offerNote: cheapest.specialOffer || cheapest.deliveryNote || 'Best verified price'
      }
    : null;

  const recommendationReason = aiReasoning?.summary ||
    `Best price found on ${cheapest.platform} at ₹${cheapest.effectivePrice}. Lowest verified listed price among ${sortedPlatforms.length} available shopping platforms.`;

  const savingsInsight = aiReasoning?.savingsText ||
    (maxSavings > 0
      ? `You can save up to ₹${maxSavings} (${savingsPercent}%) compared with ${mostExpensive.platform} (₹${mostExpensive.effectivePrice}).`
      : `Best available online deal for shade ${selectedShade.name}.`);

  return {
    query,
    analysis: {
      understoodQuery: query,
      brand: matchedProduct.brand,
      productName: matchedProduct.name,
      shade: selectedShade.name,
      category: matchedProduct.category,
      budget: budget || undefined,
      isBudgetQuery: !!budget,
      shadeExactMatch: shadeExactMatch || !detectedShadeName,
      shadeMismatchNote,
      recommendationReason,
      savingsInsight
    },
    matchedProduct,
    selectedShade,
    bestDeal,
    sortedPlatforms,
    isDemoData: true,
    disclaimer: "Demo prices. Effective price = Product Price - Discount - Offer + Delivery. Final price may vary at checkout. Direct platform links simulated for demonstration.",
    alternativeMatches: MOCK_PRODUCTS.filter(p => p.id !== matchedProduct.id && p.category === matchedProduct.category).slice(0, 3)
  };
}

// ---------------- API ROUTES ----------------

// GET /api/categories
app.get('/api/categories', (req, res) => {
  res.json({ categories: CATEGORIES_LIST });
});

// GET /api/products (supports ?q, ?category, ?brand, ?maxPrice, ?inStock)
app.get('/api/products', (req, res) => {
  const { q, category, brand, maxPrice, inStock } = req.query;
  let list = [...MOCK_PRODUCTS];

  if (category && typeof category === 'string') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (brand && typeof brand === 'string') {
    list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) {
      list = list.filter(p => {
        const lowest = Math.min(...p.shades.flatMap(s => s.platformPrices.map(pp => pp.effectivePrice)));
        return lowest <= max;
      });
    }
  }

  if (inStock === 'true') {
    list = list.filter(p => p.shades.some(s => s.platformPrices.some(pp => pp.inStock)));
  }

  if (q && typeof q === 'string') {
    const term = q.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.shades.some(s => s.name.toLowerCase().includes(term))
    );
  }

  res.json({ products: list, count: list.length });
});

// GET /api/product/:id
app.get('/api/product/:id', (req, res) => {
  const product = MOCK_PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ product });
});

// GET /api/compare/:id (with optional ?shade=shadeId)
app.get('/api/compare/:id', (req, res) => {
  const product = MOCK_PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const shadeId = req.query.shade as string;
  const shade = shadeId
    ? product.shades.find(s => s.id === shadeId) || product.shades[0]
    : product.shades[0];

  const response = buildComparisonResponse(
    `${product.brand} ${product.name} ${shade.name}`,
    product,
    shade.name,
    null
  );
  res.json(response);
});

// POST /api/ai/compare - AI-Powered natural language comparison
app.post('/api/ai/compare', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  // 1. Initial rule-based extraction
  const { product, detectedShadeName, budget } = matchProduct(query);

  let aiReasoning: { summary: string; savingsText: string } | undefined = undefined;

  // 2. Call Gemini API if available to enhance parsing and recommendation explanation
  if (ai) {
    try {
      const prompt = `You are the AI engine of "MakeupCompare AI", an intelligent makeup price comparison platform for Indian e-commerce (Tira, Nykaa, Amazon, Myntra, Flipkart, Purplle, Meesho).
User Query: "${query}"
Matched Product: ${product ? `${product.brand} - ${product.name}` : 'None'}
Requested/Detected Shade: ${detectedShadeName || 'Default'}

Please analyze this makeup search. Provide a brief 1-2 sentence recommendation summary highlighting why the best price on platforms like Tira, Nykaa, Purplle, or Amazon saves the shopper money, emphasizing exact shade and authenticity. Keep it punchy, warm, and professional.`;

      const genResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = genResponse.text?.trim();
      if (text) {
        aiReasoning = {
          summary: text.split('\n')[0] || `Best verified price found across shopping platforms.`,
          savingsText: text.split('\n')[1] || `Compare effective final prices including discounts and delivery charges.`
        };
      }
    } catch (geminiErr) {
      console.warn('Gemini API call optional fallback:', geminiErr);
    }
  }

  const comparison = buildComparisonResponse(query, product, detectedShadeName, budget, aiReasoning);
  res.json(comparison);
});

// POST /api/price-alert
app.post('/api/price-alert', (req, res) => {
  const { productId, productName, shadeName, targetPrice, email } = req.body;
  if (!productId || !email || !targetPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newAlert: PriceAlert = {
    id: `alert-${Date.now()}`,
    productId,
    productName: productName || 'Makeup Product',
    shadeName: shadeName || 'Standard',
    targetPrice: Number(targetPrice),
    currentLowestPrice: req.body.currentLowestPrice || 649,
    email,
    createdAt: new Date().toISOString(),
    status: 'active'
  };

  priceAlerts.unshift(newAlert);
  res.json({ success: true, alert: newAlert, message: `Price alert set! We will notify ${email} when the price drops below ₹${targetPrice}.` });
});

// GET /api/price-alerts
app.get('/api/price-alerts', (req, res) => {
  res.json({ alerts: priceAlerts });
});

// DELETE /api/price-alert/:id
app.delete('/api/price-alert/:id', (req, res) => {
  priceAlerts = priceAlerts.filter(a => a.id !== req.params.id);
  res.json({ success: true, message: 'Alert deleted' });
});

// GET /api/wishlist
app.get('/api/wishlist', (req, res) => {
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlistIds.has(p.id));
  res.json({ items: wishlistProducts, ids: Array.from(wishlistIds) });
});

// POST /api/wishlist
app.post('/api/wishlist', (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }
  let added = false;
  if (wishlistIds.has(productId)) {
    wishlistIds.delete(productId);
    added = false;
  } else {
    wishlistIds.add(productId);
    added = true;
  }
  res.json({ success: true, added, count: wishlistIds.size });
});

// GET /api/trending
app.get('/api/trending', (req, res) => {
  res.json({
    deals: [
      {
        product: MOCK_PRODUCTS[0],
        badge: '🔥 24% OFF',
        highlight: 'Vinyl Ink 35 Cheeky at ₹649 on Tira'
      },
      {
        product: MOCK_PRODUCTS[2],
        badge: 'Lowest Price',
        highlight: 'Fit Me Foundation at ₹479 on Purplle'
      },
      {
        product: MOCK_PRODUCTS[3],
        badge: 'Budget Pick',
        highlight: 'Lakme 9 to 5 Lipstick at ₹375 on Purplle'
      }
    ]
  });
});

// ---------------- VITE MIDDLEWARE / STATIC ASSETS ----------------

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MakeupCompare AI server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
