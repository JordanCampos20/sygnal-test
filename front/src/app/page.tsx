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
    <div>
      <OrderStats
        loading={false}
        orders={filteredOrders}
      />
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
      <OrderTable 
          orders={filteredOrders}
          loading={false}
          onUpdateOrderState={handleUpdateOrderState}
        />
    </div>
  );
}
