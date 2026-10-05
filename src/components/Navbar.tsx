import React, { useState } from 'react';
import { Sparkles, Heart, Bell, Menu, X, Search, Info, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'compare' | 'categories' | 'explore' | 'alerts' | 'wishlist' | 'about';
  setActiveTab: (tab: 'home' | 'compare' | 'categories' | 'explore' | 'alerts' | 'wishlist' | 'about') => void;
  alertsCount: number;
  wishlistCount: number;
  onOpenSearchFocus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  alertsCount,
  wishlistCount,
  onOpenSearchFocus
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: typeof activeTab; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'compare', label: 'Compare' },
    { id: 'categories', label: 'Categories' },
    { id: 'explore', label: 'All Products' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-rose-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-rose-700 bg-clip-text text-transparent">
                  MakeupCompare
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-rose-100 text-rose-800 rounded-md">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Lowest Price Finder • Indian Stores
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-rose-50 text-rose-900 font-semibold shadow-xs border border-rose-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick search button */}
            <button
              onClick={onOpenSearchFocus}
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
              title="Search Makeup"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Price Alerts button with counter badge */}
            <button
              onClick={() => setActiveTab('alerts')}
              className={`relative p-2 rounded-full transition-colors ${
                activeTab === 'alerts'
                  ? 'bg-rose-100 text-rose-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50'
              }`}
              title="Price Alerts"
            >
              <Bell className="w-5 h-5" />
              {alertsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {alertsCount}
                </span>
              )}
            </button>

            {/* Wishlist button with counter */}
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`relative p-2 rounded-full transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-rose-100 text-rose-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50'
              }`}
              title="Saved Makeup"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-rose-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-rose-100 bg-[#FAF8F5] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-base font-medium rounded-lg ${
                activeTab === item.id
                  ? 'bg-rose-100 text-rose-900 font-semibold'
                  : 'text-slate-700 hover:bg-rose-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-rose-100 flex items-center justify-around">
            <button
              onClick={() => {
                setActiveTab('alerts');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-sm text-slate-700 py-1"
            >
              <Bell className="w-4 h-4 text-rose-600" />
              Alerts ({alertsCount})
            </button>
            <button
              onClick={() => {
                setActiveTab('wishlist');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-sm text-slate-700 py-1"
            >
              <Heart className="w-4 h-4 text-rose-600" />
              Saved ({wishlistCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
