import React from 'react';
import { Sparkles, ShieldCheck, Check, Layers, Zap, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Our Core Mission</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          "Don't compare every website. <br className="hidden sm:inline" />
          <span className="font-serif-display italic bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            Let AI do it for you.
          </span>"
        </h2>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Makeup shoppers often spend 20–30 minutes bouncing between Nykaa, Tira, Amazon, Myntra, and Purplle trying to find where their shade is cheapest. MakeupCompare AI solves this in one search.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-4">
            💄
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Exact Shade Matching</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In cosmetics, a shade difference is a product difference. The AI ensures Maybelline Fit Me 128 Warm Nude is never confused with 220 Natural Beige.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
            ₹
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Effective Price Calculation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We don't just look at MRP. We factor in discounts, delivery charges, and verified coupon offers to show the true checkout cost.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
            ⚡
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2-Second Verdict</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Search Once → AI Compares → Find Lowest Price → Buy Smart. No clutter, no technical jargon.
          </p>
        </div>

      </div>

      {/* Compliance & Data Transparency */}
      <div className="bg-white rounded-3xl p-8 border border-rose-100/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-700 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 text-rose-600" />
          <span>Real Data vs Demo Data Disclosure</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          For this preview version, <strong>MakeupCompare AI</strong> utilizes a verified developmental dataset representing prices on Tira, Nykaa, Amazon, Myntra, Flipkart, Purplle, and Meesho.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          We strictly follow ethical development principles: we do not bypass anti-bot systems, violate shopping platform terms of service, or execute unauthorized scraping. Production deployments integrate official platform APIs and authorized affiliate product feeds.
        </p>
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap gap-4">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Independent & Unbiased
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Transparent Pricing
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Powered by Gemini AI
          </span>
        </div>
      </div>

    </div>
  );
};
