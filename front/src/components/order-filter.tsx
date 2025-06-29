"use client"

import { Search } from "lucide-react"
import { StateEnum } from "@/types/order"

interface OrderFilterProps {
  filterControlNumber: string
  filterState: StateEnum | "all"
  loading: boolean
  onFilterControlNumberChange: (value: string) => void
  onFilterStateChange: (value: StateEnum | "all") => void
}

export default function OrderFilter({
  filterControlNumber,
  filterState,
  loading,
  onFilterControlNumberChange,
  onFilterStateChange,
}: OrderFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-slate-600 mr-2" />
        <h3 className="text-lg font-semibold text-slate-900">Filter Orders</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="filterControl" className="block text-sm font-medium text-slate-700 mb-2">
            Control Number
          </label>
          <input
            id="filterControl"
            type="text"
            placeholder="Search control number..."
            value={filterControlNumber}
            onChange={(e) => onFilterControlNumberChange(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="filterState" className="block text-sm font-medium text-slate-700 mb-2">
            State
          </label>
          <select
            id="filterState"
            value={filterState}
            onChange={(e) => onFilterStateChange(e.target.value as StateEnum | "all")}
            disabled={loading}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="all">All States</option>
            <option value={StateEnum.pending}>Pending</option>
            <option value={StateEnum.inProgress}>In Progress</option>
            <option value={StateEnum.completed}>Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}