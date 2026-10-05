import React from 'react';
import { Heart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types/makeup.ts';

interface WishlistDrawerProps {
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  wishlistProducts,
  onRemoveWishlist,
  onSelectProduct
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
            <span>Saved Makeup Wishlist</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Keep track of your holy grail products and compare prices whenever you're ready to buy
          </p>
        </div>
        <span className="text-xs font-semibold bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
          {wishlistProducts.length} Items Saved
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-rose-100 shadow-xs">
          <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">Your Wishlist is Empty</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
            Click the heart icon on any makeup item to save it for price tracking and quick comparison.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlistProducts.map((prod) => {
            const minPrice = Math.min(...prod.shades.flatMap(s => s.platformPrices.map(pp => pp.effectivePrice)));
            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-4 border border-rose-100/90 shadow-2xs hover:shadow-xs transition-all flex gap-4 items-center"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                    {prod.brand}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm truncate">
                    {prod.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Starts at <strong className="text-slate-900 font-bold">₹{minPrice}</strong>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="px-3 py-1 bg-rose-50 hover:bg-rose-600 text-rose-800 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Compare</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
