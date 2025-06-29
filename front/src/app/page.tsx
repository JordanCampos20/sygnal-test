"use client"

import OrderFilter from "@/components/order-filter";
import OrderNew from "@/components/order-new";
import OrderStats from "@/components/order-stats";
import OrderTable from "@/components/order-table";
import { Order, StateEnum } from "@/types/order";
import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      name: "ORD-001",
      state: StateEnum.pending,
      stateName: "Pending",
      createdAt: new Date(),
      updatedAt: undefined
    },
    {
      id: 2,
      name: "ORD-002",
      state: StateEnum.inProgress,
      stateName: "In Progress",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "ORD-003",
      state: StateEnum.completed,
      stateName: "Completed",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  const [filterControlNumber, setFilterControlNumber] = useState("")
  const [filterState, setFilterState] = useState<StateEnum | "all">("all")

  const filteredOrders = orders.filter((order) => {
    const matchesControlNumber =
      filterControlNumber === "" || order.name.toLowerCase().includes(filterControlNumber.toLowerCase())
    const matchesState = filterState === "all" || order.state == filterState
    return matchesControlNumber && matchesState
  })

  const handleAddOrder = async (name: string) => {
    const newOrder: Order = {
      id: Math.max(...orders.map(order => order.id)) + 1,
      name,
      state: StateEnum.pending,
      stateName: "Pending",
      createdAt: new Date(),
      updatedAt: undefined
    }

    setOrders((prev) => [...prev, newOrder])
  }

  const handleUpdateOrderState = async (orderId: number) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          if (order.state === StateEnum.pending) {
            return { ...order, state: StateEnum.inProgress, stateName: "In Progress", updatedAt: new Date() }
          }
          else if (order.state === StateEnum.inProgress) {
            return { ...order, state: StateEnum.completed, stateName: "Completed", updatedAt: new Date() }
          }
          return order
        }
        return order
      }),
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">SygnalGroup</h1>
                <p className="mt-1 text-sm text-slate-600">Manage and track your orders from pending to completion</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-slate-100 px-3 py-1 rounded-full text-center">
                  <span className="text-sm font-medium text-slate-700">{orders.length} Total Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrderStats
          loading={false}
          orders={filteredOrders}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OrderNew
            loading={false}
            onAddOrder={handleAddOrder}
          />

          <OrderFilter
            filterState={filterState}
            filterControlNumber={filterControlNumber}
            loading={false}
            onFilterStateChange={setFilterState}
            onFilterControlNumberChange={setFilterControlNumber}
          />
        </div>

        <OrderTable 
          orders={filteredOrders}
          loading={false}
          onUpdateOrderState={handleUpdateOrderState}
        />
      </div>
    </div>
  );
}
