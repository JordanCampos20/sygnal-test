"use client";

import { Play, CheckCircle, Package, Check } from "lucide-react";
import { Order, StateEnum } from "@/types/order";
import { formatDateToBR } from "@/lib/date-utils";

interface OrderTableProps {
  orders: Order[];
  loading: boolean;
  onUpdateOrderState: (orderId: number) => void;
}

export default function OrderTable({
  orders,
  loading,
  onUpdateOrderState,
}: OrderTableProps) {
  const getStateStyles = (state: StateEnum) => {
    switch (state) {
      case StateEnum.pending:
        return {
          badge: "bg-amber-100 text-amber-800 border border-amber-200",
          dot: "bg-amber-400",
        };
      case StateEnum.inProgress:
        return {
          badge: "bg-blue-100 text-blue-800 border border-blue-200",
          dot: "bg-blue-400",
        };
      case StateEnum.completed:
        return {
          badge: "bg-emerald-100 text-emerald-800 border border-emerald-200",
          dot: "bg-emerald-400",
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-800 border border-gray-200",
          dot: "bg-gray-400",
        };
    }
  };

  const canStartProgress = (order: Order) => order.state === StateEnum.pending;
  const canComplete = (order: Order) => order.state === StateEnum.inProgress;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Orders ({orders.length})
        </h3>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No orders found</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          {orders.map((order, index) => {
            const styles = getStateStyles(order.state);
            return (
              <div
                key={order.id}
                className={`p-6 ${
                  index !== orders.length - 1 ? "border-b border-slate-200" : ""
                } hover:bg-slate-50 transition-colors`}
              >
                <div className="flex flex-col gap-4 sm:gap-1">
                  <h4 className="text-lg font-semibold text-slate-900">
                    {order.id}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${styles.dot}`}
                      ></div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}
                      >
                        {order.stateName}
                      </span>
                      {order.createdAt && (
                        <span className="text-sm text-slate-500">
                          Created:{" "}
                          {formatDateToBR(order.createdAt.toString())}
                        </span>
                      )}
                      {order.updatedAt && (
                        <span className="text-sm text-slate-500">
                          Updated:{" "}
                          {formatDateToBR(order.updatedAt.toString())}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {canStartProgress(order) && (
                        <button
                          onClick={() => onUpdateOrderState(order.id)}
                          className="inline-flex items-center px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Progress
                        </button>
                      )}
                      {canComplete(order) && (
                        <button
                          onClick={() => onUpdateOrderState(order.id)}
                          className="inline-flex items-center px-4 py-2 border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </button>
                      )}
                      {order.state === StateEnum.completed && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <Check className="w-4 h-4 mr-2" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
