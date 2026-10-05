/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ComparisonView } from './components/ComparisonView.tsx';
import { CategoryBrowser } from './components/CategoryBrowser.tsx';
import { ProductExplorer } from './components/ProductExplorer.tsx';
import { PriceAlertModal } from './components/PriceAlertModal.tsx';
import { PriceAlertsDrawer } from './components/PriceAlertsDrawer.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AIComparisonResponse, Product, PriceAlert, MakeupCategory } from './types/makeup.ts';
import { MOCK_PRODUCTS } from './data/mockProducts.ts';
import { Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'compare' | 'categories' | 'explore' | 'alerts' | 'wishlist' | 'about'>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [comparisonResult, setComparisonResult] = useState<AIComparisonResponse | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Alerts and Wishlist state
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set(['maybelline-vinyl-ink']));
  
  // Modal state
  const [alertModalConfig, setAlertModalConfig] = useState<{
    isOpen: boolean;
    productName: string;
    shadeName: string;
    currentLowestPrice: number;
    productId: string;
  }>({
    isOpen: false,
    productName: '',
    shadeName: '',
    currentLowestPrice: 0,
    productId: ''
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial alerts and products from API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(err => console.log('Loaded bundled fallback products'));

    fetch('/api/price-alerts')
      .then(res => res.json())
      .then(data => {
        if (data.alerts) setAlerts(data.alerts);
      })
      .catch(() => {});

    fetch('/api/wishlist')
      .then(res => res.json())
      .then(data => {
        if (data.ids) setWishlistIds(new Set(data.ids));
      })
      .catch(() => {});
  }, []);

  // Handle Search & AI Comparison
  const handleAISearch = async (query: string) => {
    setIsComparing(true);
    setSearchError(null);

    try {
      const res = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error('Search failed');
      }

      const result: AIComparisonResponse = await res.json();
      setComparisonResult(result);
      setActiveTab('compare');
      
      // Smooth scroll to comparison section
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (err) {
      console.error('Error during AI comparison:', err);
      setSearchError("We couldn't connect to the AI engine right now. Please try searching another shade or product.");
    } finally {
      setIsComparing(false);
    }
  };

  // Handle direct product selection for comparison
  const handleSelectProduct = async (product: Product, shadeId?: string) => {
    setIsComparing(true);
    setSearchError(null);

    try {
      const url = shadeId 
        ? `/api/compare/${product.id}?shade=${shadeId}`
        : `/api/compare/${product.id}`;
      const res = await fetch(url);
      const data: AIComparisonResponse = await res.json();
      setComparisonResult(data);
      setActiveTab('compare');
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsComparing(false);
    }
  };

  // Handle shade change in the comparison view
  const handleSelectShade = async (shadeId: string) => {
    if (!comparisonResult?.matchedProduct) return;
    handleSelectProduct(comparisonResult.matchedProduct, shadeId);
  };

  // Toggle wishlist item
  const handleToggleWishlist = async (productId: string) => {
    const next = new Set(wishlistIds);
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    setWishlistIds(next);

    try {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
    } catch (err) {
      console.log('Wishlist saved locally');
    }
  };

  // Open price alert modal
  const handleOpenAlertModal = (
    productName: string,
    shadeName: string,
    currentLowestPrice: number,
    productId: string
  ) => {
    setAlertModalConfig({
      isOpen: true,
      productName,
      shadeName,
      currentLowestPrice,
      productId,
    });
  };

  // Delete alert
  const handleDeleteAlert = async (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    try {
      await fetch(`/api/price-alert/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.log('Alert removed locally');
    }
  };

  const handleSelectCategory = (category: MakeupCategory) => {
    setActiveTab('explore');
    // Pre-filter on explore page
  };

  const handleFocusSearch = () => {
    setActiveTab('home');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertsCount={alerts.length}
        wishlistCount={wishlistIds.size}
        onOpenSearchFocus={handleFocusSearch}
      />

      <main className="flex-1">
        {/* Search error toast if any */}
        {searchError && (
          <div className="max-w-2xl mx-auto px-4 mt-4">
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{searchError}</span>
            </div>
          </div>
        )}

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            <HeroSection
              onSearch={handleAISearch}
              isLoading={isComparing}
              searchRef={searchInputRef}
            />

            {/* If there was a recent comparison, show quick preview */}
            {comparisonResult && (
              <div className="max-w-5xl mx-auto px-4 mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Latest AI Comparison Result</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('compare')}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    View Full Comparison →
                  </button>
                </div>
                <ComparisonView
                  data={comparisonResult}
                  onSelectShade={handleSelectShade}
                  onOpenAlertModal={handleOpenAlertModal}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={comparisonResult.matchedProduct ? wishlistIds.has(comparisonResult.matchedProduct.id) : false}
                />
              </div>
            )}

            {/* Makeup Categories Grid */}
            <CategoryBrowser onSelectCategory={handleSelectCategory} />

            {/* Trending & Best Deals */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-rose-600" />
                    <span>Top Price Drops & Deals Today</span>
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    AI monitored price cuts on Maybelline, Lakme, MAC, L'Oreal, and Swiss Beauty
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map((prod) => {
                  const lowestPrice = Math.min(...prod.shades.flatMap(s => s.platformPrices.map(pp => pp.effectivePrice)));
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-2xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="flex gap-4">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-24 h-24 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                            {prod.brand}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-rose-900">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {prod.finish}
                          </p>
                          <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                            Best: ₹{lowestPrice}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">
                          {prod.shades.length} shades available
                        </span>
                        <span className="font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Compare Prices</span>
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Catalog preview */}
            <ProductExplorer
              products={products}
              onSelectProduct={handleSelectProduct}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
          </>
        )}

        {/* COMPARE TAB */}
        {activeTab === 'compare' && (
          <div className="py-6">
            {/* Search bar inside compare tab */}
            <div className="max-w-3xl mx-auto px-4 mb-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget.elements.namedItem('compareQuery') as HTMLInputElement;
                  if (target?.value.trim()) {
                    handleAISearch(target.value.trim());
                  }
                }}
                className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-rose-200 shadow-xs"
              >
                <input
                  name="compareQuery"
                  type="text"
                  placeholder="Ask AI: e.g. Find Maybelline Vinyl Ink 35 Cheeky"
                  defaultValue={comparisonResult?.query || ''}
                  className="flex-1 px-4 py-2 text-sm text-slate-900 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isComparing}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Compare</span>
                </button>
              </form>
            </div>

            {isComparing ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 border-3 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">
                  AI is scanning Indian beauty platforms...
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Matching exact shade, checking Tira, Nykaa, Amazon, Myntra, Flipkart, Purplle, and calculating effective checkout prices.
                </p>
              </div>
            ) : comparisonResult ? (
              <ComparisonView
                data={comparisonResult}
                onSelectShade={handleSelectShade}
                onOpenAlertModal={handleOpenAlertModal}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={comparisonResult.matchedProduct ? wishlistIds.has(comparisonResult.matchedProduct.id) : false}
              />
            ) : (
              <div className="text-center py-20">
                <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Comparison</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Search for any makeup item above to compare prices across stores.
                </p>
                <button
                  onClick={() => handleAISearch("Maybelline Vinyl Ink 35 Cheeky")}
                  className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold shadow-xs hover:bg-rose-700 transition-colors"
                >
                  Try: Maybelline Vinyl Ink 35 Cheeky
                </button>
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="py-6">
            <CategoryBrowser onSelectCategory={handleSelectCategory} />
            <ProductExplorer
              products={products}
              onSelectProduct={handleSelectProduct}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
          </div>
        )}

        {/* EXPLORE ALL PRODUCTS TAB */}
        {activeTab === 'explore' && (
          <ProductExplorer
            products={products}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {/* ALERTS TAB */}
        {activeTab === 'alerts' && (
          <PriceAlertsDrawer
            alerts={alerts}
            onDeleteAlert={handleDeleteAlert}
            onViewProduct={(id) => {
              const p = products.find(prod => prod.id === id);
              if (p) handleSelectProduct(p);
            }}
          />
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <WishlistDrawer
            wishlistProducts={products.filter(p => wishlistIds.has(p.id))}
            onRemoveWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={alertModalConfig.isOpen}
        onClose={() => setAlertModalConfig(prev => ({ ...prev, isOpen: false }))}
        productName={alertModalConfig.productName}
        shadeName={alertModalConfig.shadeName}
        currentLowestPrice={alertModalConfig.currentLowestPrice}
        productId={alertModalConfig.productId}
        onAlertCreated={(newAlert) => setAlerts(prev => [newAlert, ...prev])}
      />

      {/* Global Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
