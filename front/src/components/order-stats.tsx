import { Clock, TrendingUp, Package } from "lucide-react"
import { StateEnum, type Order } from "@/types/order"

interface OrderStatsProps {
  orders: Order[]
  loading: boolean
}

export default function OrderStats({ orders, loading }: OrderStatsProps) {
  const stats = {
    pending: orders.filter((o) => o.state === StateEnum.pending).length,
    inProgress: orders.filter((o) => o.state === StateEnum.inProgress).length,
    completed: orders.filter((o) => o.state === StateEnum.completed).length,
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-600">Pending Orders</p>
            <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-600">In Progress</p>
            <p className="text-2xl font-bold text-slate-900">{stats.inProgress}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-slate-600">Completed</p>
            <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}