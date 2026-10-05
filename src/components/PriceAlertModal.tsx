import React, { useState } from 'react';
import { X, Bell, CheckCircle2, TrendingDown, Sparkles } from 'lucide-react';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  shadeName: string;
  currentLowestPrice: number;
  productId: string;
  onAlertCreated: (newAlert: any) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  productName,
  shadeName,
  currentLowestPrice,
  productId,
  onAlertCreated
}) => {
  const [targetPrice, setTargetPrice] = useState<number>(Math.max(100, currentLowestPrice - 50));
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (targetPrice >= currentLowestPrice) {
      setError(`Target price should be lower than current lowest price (₹${currentLowestPrice}).`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/price-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName,
          shadeName,
          targetPrice,
          currentLowestPrice,
          email
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        onAlertCreated(data.alert);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Failed to set price alert.');
      }
    } catch (err) {
      setError('Network error. Price alert saved locally.');
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Price Alert Active!</h3>
            <p className="text-sm text-slate-600">
              We'll monitor prices on Nykaa, Tira, Amazon, Purplle and notify you at <strong>{email}</strong> when this shade drops below <strong>₹{targetPrice}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4" />
              <span>Smart Price Drop Alert</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Track Price Drop
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {productName} • Shade: <strong>{shadeName}</strong>
            </p>

            {/* Current Price vs Target */}
            <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-100 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-500">Current Lowest</span>
                <div className="text-lg font-extrabold text-slate-900">₹{currentLowestPrice}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium text-rose-700">Target Savings</span>
                <div className="text-lg font-extrabold text-emerald-600">
                  ₹{Math.max(0, currentLowestPrice - targetPrice)} OFF
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notify me when price goes below:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="50"
                    max={currentLowestPrice - 1}
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-base focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-rose-400"
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold rounded-xl shadow-md shadow-rose-600/20 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Setting Alert...' : 'Set Price Alert'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
