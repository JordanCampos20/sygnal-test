"use client";

import type React from "react";

import { Plus } from "lucide-react";

interface OrderNewProps {
  loading: boolean;
  onAddOrder: () => void;
}

export default function OrderNew({ loading, onAddOrder }: OrderNewProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-slate-600 mr-2" />
        <h3 className="text-lg font-semibold text-slate-900">Add New Order</h3>
      </div>
      <div className="space-y-4">
        <button
          onClick={onAddOrder}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Add Order
        </button>
      </div>
    </div>
  );
}
