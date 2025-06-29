"use client";

import type React from "react";

import { useState } from "react";
import { Plus } from "lucide-react";

interface OrderNewProps {
  loading: boolean;
  onAddOrder: (controlNumber: string) => void;
}

export default function OrderNew({ loading, onAddOrder }: OrderNewProps) {
  const [newControlNumber, setNewControlNumber] = useState("");

  const handleAddOrder = () => {
    if (!newControlNumber.trim()) return;
    onAddOrder(newControlNumber.trim());
    setNewControlNumber("");
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddOrder();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-slate-600 mr-2" />
        <h3 className="text-lg font-semibold text-slate-900">Add New Order</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="controlNumber"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Control Number
          </label>
          <input
            id="controlNumber"
            type="text"
            placeholder="Enter control number (e.g., ORD-004)"
            value={newControlNumber}
            onChange={(e) => setNewControlNumber(e.target.value)}
            onKeyUp={handleKeyUp}
            disabled={loading}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <button
          onClick={handleAddOrder}
          disabled={!newControlNumber.trim() || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Add Order
        </button>
      </div>
    </div>
  );
}
