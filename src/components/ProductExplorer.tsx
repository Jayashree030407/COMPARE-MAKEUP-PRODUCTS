import React, { useState, useMemo } from 'react';
import { Sparkles, Heart, Search, SlidersHorizontal, ArrowUpDown, Tag, Check, ExternalLink } from 'lucide-react';
import { Product } from '../types/makeup.ts';

interface ProductExplorerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: Set<string>;
  initialCategory?: string;
}

export const ProductExplorer: React.FC<ProductExplorerProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  initialCategory
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [priceRange, setPriceRange] = useState<string>('all'); // 'all', 'under500', '500to1000', 'above1000'
  const [sortBy, setSortBy] = useState<'lowestPrice' | 'discount' | 'rating'>('lowestPrice');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const bSet = new Set(products.map(p => p.brand));
    return Array.from(bSet);
  }, [products]);

  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search term
      if (search.trim()) {
        const term = search.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.shades.some(s => s.name.toLowerCase().includes(term));
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      // Price range
      const lowestPrice = Math.min(
        ...product.shades.flatMap(s => s.platformPrices.map(pp => pp.effectivePrice))
      );

      if (priceRange === 'under500' && lowestPrice >= 500) return false;
      if (priceRange === '500to1000' && (lowestPrice < 500 || lowestPrice > 1000)) return false;
      if (priceRange === 'above1000' && lowestPrice <= 1000) return false;

      // In stock
      if (onlyInStock) {
        const hasStock = product.shades.some(s => s.platformPrices.some(pp => pp.inStock));
        if (!hasStock) return false;
      }

      return true;
    }).sort((a, b) => {
      const getMinPrice = (p: Product) => Math.min(...p.shades.flatMap(s => s.platformPrices.map(pp => pp.effectivePrice)));
      const getMaxDiscount = (p: Product) => Math.max(...p.shades.flatMap(s => s.platformPrices.map(pp => pp.discountPercent)));

      if (sortBy === 'lowestPrice') {
        return getMinPrice(a) - getMinPrice(b);
      }
      if (sortBy === 'discount') {
        return getMaxDiscount(b) - getMaxDiscount(a);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [products, search, selectedCategory, selectedBrand, priceRange, onlyInStock, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Verified Makeup Deals
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Compare prices across Nykaa, Tira, Amazon, Myntra, Flipkart, Purplle, and Meesho
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredProducts.length}</strong> products
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-rose-100/80 shadow-xs mb-8 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by brand, product name, or shade..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-rose-400"
            />
          </div>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full md:w-44 py-2 px-3 bg-slate-50 rounded-xl text-xs font-medium border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="all">All Brands</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full md:w-44 py-2 px-3 bg-slate-50 rounded-xl text-xs font-medium border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="lowestPrice">Price: Lowest First</option>
            <option value="discount">Highest Discount</option>
            <option value="rating">Top Rated</option>
          </select>

        </div>

        {/* Price Range & Quick Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-400">Budget:</span>
          
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under500', label: 'Under ₹500' },
            { id: '500to1000', label: '₹500–₹1000' },
            { id: 'above1000', label: 'Above ₹1000' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setPriceRange(p.id)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                priceRange === p.id
                  ? 'bg-rose-100 text-rose-900 border-rose-300 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p.label}
            </button>
          ))}

          <button
            onClick={() => setOnlyInStock(!onlyInStock)}
            className={`ml-auto px-3 py-1 rounded-full border transition-colors ${
              onlyInStock
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            In Stock Only
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-600 font-medium">No makeup items match the current filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedBrand('all');
              setPriceRange('all');
            }}
            className="mt-3 text-xs text-rose-600 font-semibold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            // Find lowest price and corresponding platform
            let lowestEffective = Infinity;
            let bestPlatform = 'Tira';
            let maxMrp = 0;
            let maxDiscount = 0;

            for (const s of prod.shades) {
              for (const p of s.platformPrices) {
                if (p.effectivePrice < lowestEffective) {
                  lowestEffective = p.effectivePrice;
                  bestPlatform = p.platform;
                  maxMrp = p.mrp;
                  maxDiscount = p.discountPercent;
                }
              }
            }

            const isWish = wishlistIds.has(prod.id);

            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-rose-100/70 overflow-hidden shadow-2xs hover:shadow-md hover:border-rose-300 transition-all duration-200 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-slate-50 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs border border-white/50">
                    {prod.category}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(prod.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-2xs transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Price drop tag if available */}
                  {prod.priceDropNotice && (
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded-lg">
                      {prod.priceDropNotice}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-1">
                      {prod.brand}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-900 transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {prod.description}
                    </p>

                    {/* Shades preview */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">Shades:</span>
                      <div className="flex items-center -space-x-1">
                        {prod.shades.slice(0, 4).map((s) => (
                          <span
                            key={s.id}
                            title={s.name}
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                            style={{ backgroundColor: s.hex }}
                          />
                        ))}
                      </div>
                      {prod.shades.length > 4 && (
                        <span className="text-[10px] text-slate-400">
                          +{prod.shades.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        Lowest verified price on <strong className="text-slate-700">{bestPlatform}</strong>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900">
                          ₹{lowestEffective}
                        </span>
                        {maxMrp > lowestEffective && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{maxMrp}
                          </span>
                        )}
                        {maxDiscount > 0 && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                            {maxDiscount}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-600 text-rose-800 hover:text-white text-xs font-bold rounded-xl transition-all duration-150 flex items-center gap-1 group-hover:bg-rose-600 group-hover:text-white"
                    >
                      <span>Compare</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
