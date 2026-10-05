import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { POPULAR_PROMPTS } from '../data/mockProducts.ts';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  isLoading,
  searchRef
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    onSearch(prompt);
  };

  const platforms = [
    { name: 'Tira', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { name: 'Nykaa', color: 'text-pink-700 bg-pink-50 border-pink-200' },
    { name: 'Amazon', color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { name: 'Myntra', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { name: 'Purplle', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { name: 'Flipkart', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { name: 'Meesho', color: 'text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200' },
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Decorative beauty ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-200/40 via-amber-100/30 to-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-pink-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top AI badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>Don't compare every website. Let AI do it for you.</span>
        </div>

        {/* Large Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
          Find Your Makeup. <br className="hidden sm:inline" />
          <span className="font-serif-display italic font-semibold bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
            Get the Best Price.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Let AI compare makeup prices across Indian shopping platforms and find the cheapest option for you in seconds.
        </p>

        {/* Large AI Search Box / Chat Interface */}
        <div className="max-w-2xl mx-auto bg-white/95 rounded-2xl sm:rounded-3xl shadow-xl shadow-rose-900/5 border border-rose-100/80 p-2 sm:p-3 transition-all duration-200 focus-within:shadow-2xl focus-within:border-rose-300">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-1">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <input
                ref={searchRef as any}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: Maybelline Vinyl Ink 35 Cheeky..."
                className="w-full text-slate-900 placeholder:text-slate-400 text-base sm:text-lg bg-transparent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl sm:rounded-2xl transition-all shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 text-base shrink-0 active:scale-98"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Comparing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Compare with AI</span>
                </>
              )}
            </button>
          </form>

          {/* Quick example prompt chips */}
          <div className="mt-3 pt-3 border-t border-rose-50 text-left px-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
              <span>Try asking the AI:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {POPULAR_PROMPTS.slice(0, 4).map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-900 border border-slate-200/70 hover:border-rose-200 rounded-lg px-2.5 py-1.5 transition-colors text-left truncate max-w-full"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Step Journey Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-10 text-center">
          <div className="bg-white/60 backdrop-blur-xs border border-rose-100/60 rounded-xl p-3">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">Step 1</div>
            <div className="text-sm font-semibold text-slate-800">Search Once</div>
          </div>
          <div className="bg-white/60 backdrop-blur-xs border border-rose-100/60 rounded-xl p-3">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">Step 2</div>
            <div className="text-sm font-semibold text-slate-800">AI Compares</div>
          </div>
          <div className="bg-white/60 backdrop-blur-xs border border-rose-100/60 rounded-xl p-3">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">Step 3</div>
            <div className="text-sm font-semibold text-slate-800">Lowest Price</div>
          </div>
          <div className="bg-white/60 backdrop-blur-xs border border-rose-100/60 rounded-xl p-3">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">Step 4</div>
            <div className="text-sm font-semibold text-slate-800">Buy Smart</div>
          </div>
        </div>

        {/* Platforms Strip */}
        <div className="mt-12 pt-8 border-t border-rose-100/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Comparing verified prices across leading beauty platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {platforms.map((p) => (
              <span
                key={p.name}
                className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-2xs ${p.color}`}
              >
                {p.name}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Demo prices for comparison • Real effective price formula: Price − Discount + Delivery − Coupons
          </p>
        </div>

      </div>
    </section>
  );
};
