import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-white border-t border-rose-100/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-300 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900">
                MakeupCompare AI
              </span>
              <p className="text-xs text-slate-400">
                Don't compare every website. Let AI do it for you.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavClick('home')} className="hover:text-rose-600 transition-colors">
              Home
            </button>
            <button onClick={() => onNavClick('explore')} className="hover:text-rose-600 transition-colors">
              Compare Deals
            </button>
            <button onClick={() => onNavClick('categories')} className="hover:text-rose-600 transition-colors">
              Categories
            </button>
            <button onClick={() => onNavClick('alerts')} className="hover:text-rose-600 transition-colors">
              Price Alerts
            </button>
            <button onClick={() => onNavClick('about')} className="hover:text-rose-600 transition-colors">
              About & Terms
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for beauty lovers in India</span>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Demo prices shown for development testing. All brand names, logos, and trademarks belong to their respective owners (Nykaa, Reliance Tira, Amazon, Myntra, Flipkart, Purplle, Meesho).
        </div>
      </div>
    </footer>
  );
};
