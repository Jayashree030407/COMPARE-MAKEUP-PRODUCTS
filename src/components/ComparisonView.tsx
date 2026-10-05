import React, { useState } from 'react';
import { 
  Sparkles, 
  Trophy, 
  ExternalLink, 
  Bell, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  TrendingDown, 
  Truck, 
  Tag, 
  HelpCircle,
  Filter,
  ArrowUpDown,
  Share2
} from 'lucide-react';
import { AIComparisonResponse, ProductShade, PlatformPrice, ShoppingPlatform } from '../types/makeup.ts';
import { PLATFORM_METAS } from '../utils/platformStyles.ts';

interface ComparisonViewProps {
  data: AIComparisonResponse;
  onSelectShade: (shadeId: string) => void;
  onOpenAlertModal: (productName: string, shadeName: string, currentPrice: number, productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  data,
  onSelectShade,
  onOpenAlertModal,
  onToggleWishlist,
  isWishlisted
}) => {
  const { analysis, matchedProduct, selectedShade, bestDeal, sortedPlatforms, disclaimer } = data;
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!matchedProduct || !selectedShade || !bestDeal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No Exact Match Found</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-6">
          {analysis.recommendationReason || "We couldn't find an exact match for this makeup product in our verified database."}
        </p>
        <p className="text-sm text-slate-500 mb-6">
          {analysis.savingsInsight}
        </p>
      </div>
    );
  }

  // Filter platforms if user changes filters
  let filteredPlatforms = [...sortedPlatforms];
  if (platformFilter !== 'all') {
    filteredPlatforms = filteredPlatforms.filter(p => p.platform.toLowerCase() === platformFilter.toLowerCase());
  }
  if (onlyInStock) {
    filteredPlatforms = filteredPlatforms.filter(p => p.inStock);
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const currentLowestPrice = bestDeal.price;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Disclaimer Banner for Demo Data */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded uppercase tracking-wider text-[10px]">
            Demo Prices
          </span>
          <span>
            Effective Price = Listed Price − Coupons + Delivery. Final price may vary at checkout.
          </span>
        </div>
        <span className="text-[11px] text-amber-700 font-medium">
          Verified for Indian stores (Tira, Nykaa, Amazon, etc.)
        </span>
      </div>

      {/* 1. Header: AI Match Found */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-100/80 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-rose-50">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>AI Match Found</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{matchedProduct.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {matchedProduct.brand} {matchedProduct.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <span>Size: <strong>{matchedProduct.size}</strong></span>
              <span>•</span>
              <span>Finish: <strong>{matchedProduct.finish}</strong></span>
              <span>•</span>
              <span className="text-amber-600 font-medium">★ {matchedProduct.rating} ({matchedProduct.reviewCount.toLocaleString()} reviews)</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={() => onToggleWishlist(matchedProduct.id)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-sm font-medium ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
            </button>

            <button
              onClick={() => onOpenAlertModal(matchedProduct.name, selectedShade.name, currentLowestPrice, matchedProduct.id)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Track Price Drop"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Set Price Alert</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
              title="Share comparison"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Shade Selector Section */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Selected Shade:</span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                {selectedShade.name}
              </span>
            </label>
            <span className="text-xs text-slate-500">
              Shade matching is essential for makeup
            </span>
          </div>

          {/* Warning if requested shade differed */}
          {analysis.shadeMismatchNote && (
            <div className="mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{analysis.shadeMismatchNote}</span>
            </div>
          )}

          {/* Shade swatches carousel / pills */}
          <div className="flex flex-wrap gap-2">
            {matchedProduct.shades.map((shade) => {
              const isSelected = shade.id === selectedShade.id;
              return (
                <button
                  key={shade.id}
                  onClick={() => onSelectShade(shade.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-rose-50 border-rose-600 text-rose-950 shadow-xs ring-2 ring-rose-600/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300 hover:bg-rose-50/40'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <span>{shade.name}</span>
                  {shade.isPopular && (
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded font-normal">
                      Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. UX RULE: 2-3 Second Comprehension Hero Card */}
      {/* Product → Best Price → Platform → Savings → Buy Now */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-rose-50/40 to-amber-50/40 rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-lg shadow-rose-900/5 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Product & Best Deal Info */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5 text-emerald-700" />
              <span>Best Price Guarantee</span>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                ₹{bestDeal.price}
              </span>
              {bestDeal.mrp > bestDeal.price && (
                <span className="text-lg text-slate-400 line-through">
                  ₹{bestDeal.mrp}
                </span>
              )}
              {bestDeal.savings > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
                  Save ₹{bestDeal.savings}
                </span>
              )}
            </div>

            <div className="space-y-1 text-sm text-slate-700">
              <p className="flex items-center gap-1.5 font-medium">
                <span>Best price found on:</span>
                <span className="font-extrabold text-slate-900 text-base underline decoration-rose-300 decoration-2">
                  {bestDeal.platform}
                </span>
                {bestDeal.offerNote && (
                  <span className="text-xs text-rose-700 font-semibold bg-rose-100 px-2 py-0.5 rounded-full ml-1">
                    {bestDeal.offerNote}
                  </span>
                )}
              </p>
              
              {bestDeal.savings > 0 ? (
                <p className="text-xs sm:text-sm text-emerald-700 font-medium">
                  ✨ You save up to <span className="font-bold">₹{bestDeal.savings}</span> compared with highest listed price on other platforms.
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Standard listed price across verified retailers.
                </p>
              )}
            </div>

            {/* AI Recommendation Summary */}
            <div className="mt-4 p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-rose-100/90 text-xs sm:text-sm text-slate-700 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>AI Recommendation</span>
              </div>
              <p className="text-slate-800 font-medium">
                "{analysis.recommendationReason}"
              </p>
              <p className="text-slate-500 text-xs mt-1">
                {analysis.savingsInsight}
              </p>
            </div>
          </div>

          {/* Right: Buy Now CTA */}
          <div className="w-full lg:w-auto flex flex-col gap-2 shrink-0">
            <a
              href={bestDeal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-60 py-4 px-6 bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 hover:from-rose-700 hover:to-pink-800 text-white font-bold text-center rounded-2xl shadow-lg shadow-rose-700/25 transition-all flex items-center justify-center gap-2 group active:scale-98 text-base"
            >
              <span>Buy at {bestDeal.platform}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => onOpenAlertModal(matchedProduct.name, selectedShade.name, currentLowestPrice, matchedProduct.id)}
              className="w-full py-2.5 px-4 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-rose-500" />
              <span>Notify me when price drops below ₹{currentLowestPrice - 50}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Detailed Compare Prices Table & Filter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-100/80 mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Compare Prices Across Stores</span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {filteredPlatforms.length} Options
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sorted from lowest final effective price to highest.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">All Platforms</option>
              {sortedPlatforms.map(p => (
                <option key={p.platform} value={p.platform}>{p.platform}</option>
              ))}
            </select>

            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                onlyInStock
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              In Stock Only
            </button>
          </div>
        </div>

        {/* Comparison Table for Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Listed Price</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Delivery & Offers</th>
                <th className="py-3 px-4">Final Price</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPlatforms.map((item, idx) => {
                const isCheapest = idx === 0 && platformFilter === 'all';
                const meta = PLATFORM_METAS[item.platform as ShoppingPlatform] || {
                  name: item.platform,
                  badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
                  tagline: 'Online retailer'
                };

                return (
                  <tr
                    key={item.platform}
                    className={`transition-colors ${
                      isCheapest ? 'bg-rose-50/40 font-medium' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Platform column */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${meta.badgeClass}`}>
                          {item.platform}
                        </span>
                        {isCheapest && (
                          <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                            BEST PRICE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Seller: {item.seller}
                      </div>
                    </td>

                    {/* Listed Price */}
                    <td className="py-4 px-4 text-sm text-slate-700">
                      ₹{item.price}
                    </td>

                    {/* Discount */}
                    <td className="py-4 px-4">
                      {item.discountPercent > 0 ? (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          {item.discountPercent}% OFF
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">MRP</span>
                      )}
                    </td>

                    {/* Delivery & Offers */}
                    <td className="py-4 px-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.deliveryFee === 0 ? 'Free Delivery' : `+₹${item.deliveryFee} shipping`}</span>
                      </div>
                      {item.specialOffer && (
                        <div className="text-[11px] text-rose-600 font-medium mt-0.5">
                          {item.specialOffer}
                        </div>
                      )}
                    </td>

                    {/* Final Effective Price */}
                    <td className="py-4 px-4">
                      <div className="text-base font-extrabold text-slate-900">
                        ₹{item.effectivePrice}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.lastChecked ? `Checked ${item.lastChecked}` : 'Verified'}
                      </div>
                    </td>

                    {/* Availability */}
                    <td className="py-4 px-4">
                      {item.inStock ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In Stock</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                          isCheapest
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-rose-700'
                        }`}
                      >
                        <span>Buy Now</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-3">
          {filteredPlatforms.map((item, idx) => {
            const isCheapest = idx === 0 && platformFilter === 'all';
            const meta = PLATFORM_METAS[item.platform as ShoppingPlatform] || {
              name: item.platform,
              badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
              tagline: 'Online retailer'
            };

            return (
              <div
                key={item.platform}
                className={`p-4 rounded-2xl border transition-all ${
                  isCheapest
                    ? 'bg-rose-50/50 border-rose-300 shadow-xs'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${meta.badgeClass}`}>
                      {item.platform}
                    </span>
                    {isCheapest && (
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full uppercase">
                        BEST PRICE
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">
                      ₹{item.effectivePrice}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                  <div>
                    <span>MRP: ₹{item.mrp}</span>
                    {item.discountPercent > 0 && (
                      <span className="ml-1 text-emerald-600 font-semibold">({item.discountPercent}% off)</span>
                    )}
                  </div>
                  <span className="text-emerald-700 font-medium">
                    {item.inStock ? '✓ In Stock' : 'Out of stock'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.deliveryFee === 0 ? 'Free Delivery' : `+₹${item.deliveryFee} shipping`}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1 ${
                      isCheapest ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>Buy Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Price Calculation Rule Box */}
        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>How Effective Price is Calculated</span>
          </div>
          <p>
            <strong>Effective Price = Product Price − Discount + Delivery Charges − Applicable Offer</strong>
          </p>
          <p className="mt-1 text-slate-500">
            Delivery charges, store coupons, or payment offers are factored in when available. If offers cannot be verified, prices may vary at actual checkout.
          </p>
        </div>
      </div>

    </div>
  );
};
