"use client"

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
      <OrderTable 
          orders={orders} 
          loading={false}
          onUpdateOrderState={handleUpdateOrderState}
        />
    </div>
  );
}
