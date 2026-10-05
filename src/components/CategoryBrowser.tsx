import React from 'react';
import { CATEGORIES_LIST } from '../data/mockProducts.ts';
import { MakeupCategory } from '../types/makeup.ts';

interface CategoryBrowserProps {
  onSelectCategory: (category: MakeupCategory) => void;
  selectedCategory?: string;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  onSelectCategory,
  selectedCategory
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Makeup Categories
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Compare prices for lipsticks, foundations, concealers, and more
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name as MakeupCategory)}
              className={`p-4 rounded-2xl border text-center transition-all duration-200 group flex flex-col items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-rose-50 border-rose-300 shadow-sm ring-2 ring-rose-500/20'
                  : 'bg-white hover:bg-rose-50/50 border-slate-200/80 hover:border-rose-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5'
              }`}
            >
              <span className="text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-rose-900">
                {cat.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {cat.count} verified deals
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
