import React from 'react';
import { Bell, Trash2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { PriceAlert } from '../types/makeup.ts';

interface PriceAlertsDrawerProps {
  alerts: PriceAlert[];
  onDeleteAlert: (id: string) => void;
  onViewProduct: (productId: string) => void;
}

export const PriceAlertsDrawer: React.FC<PriceAlertsDrawerProps> = ({
  alerts,
  onDeleteAlert,
  onViewProduct
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-600" />
            <span>Active Price Drop Alerts</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            We continuously check Nykaa, Tira, Amazon, Purplle, and Myntra for your target prices
          </p>
        </div>
        <span className="text-xs font-semibold bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
          {alerts.length} Alerts Active
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-rose-100 shadow-xs">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Price Alerts Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
            Search for your favourite lipstick or foundation and click "Set Price Alert" to get notified when the price drops.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl p-5 border border-rose-100/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-base">
                    {alert.productName}
                  </h4>
                  <span className="text-xs bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded">
                    Shade: {alert.shadeName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Target: <strong className="text-emerald-700">₹{alert.targetPrice}</strong></span>
                  <span>•</span>
                  <span>Current: <strong>₹{alert.currentLowestPrice}</strong></span>
                  <span>•</span>
                  <span>Email: {alert.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onViewProduct(alert.productId)}
                  className="px-3.5 py-1.5 text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>Compare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteAlert(alert.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Remove alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
