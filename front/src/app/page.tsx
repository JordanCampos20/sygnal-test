"use client";

import OrderFilter from "@/components/order-filter";
import OrderNew from "@/components/order-new";
import OrderStats from "@/components/order-stats";
import OrderTable from "@/components/order-table";
import { useOrders } from "@/hooks/use-orders";

export default function Home() {
  const {
    orders,
    filteredOrders,
    filterControlNumber,
    filterState,
    loading,
    createOrder,
    toggleOrderState,
    setFilterControlNumber,
    setFilterState,
  } = useOrders();

  const handleAddOrder = async (name: string) => {
    await createOrder({ name });
  };

  const handleUpdateOrderState = async (orderId: number) => {
    await toggleOrderState(orderId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  SygnalGroup
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Manage and track your orders from pending to completion
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-slate-100 px-3 py-1 rounded-full text-center">
                  <span className="text-sm font-medium text-slate-700">
                    {orders.length} Total Orders
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrderStats loading={loading} orders={filteredOrders} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OrderNew loading={loading} onAddOrder={handleAddOrder} />

          <OrderFilter
            filterState={filterState}
            filterControlNumber={filterControlNumber}
            loading={loading}
            onFilterStateChange={setFilterState}
            onFilterControlNumberChange={setFilterControlNumber}
          />
        </div>

        <OrderTable
          orders={filteredOrders}
          loading={loading}
          onUpdateOrderState={handleUpdateOrderState}
        />
      </div>
    </div>
  );
}
