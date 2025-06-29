"use client";

import { useState, useEffect } from "react";
import { Order, OrderFormData, StateEnum } from "@/types/order";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterControlNumber, setFilterControlNumber] = useState("");
  const [filterState, setFilterState] = useState<StateEnum | "all">("all");

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = [
        {
          id: 1,
          name: "ORD-001",
          state: StateEnum.pending,
          stateName: "Pending",
          createdAt: new Date(),
          updatedAt: undefined,
        },
        {
          id: 2,
          name: "ORD-002",
          state: StateEnum.inProgress,
          stateName: "In Progress",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "ORD-003",
          state: StateEnum.completed,
          stateName: "Completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setOrders(data || []);
    } catch (err) {
      const errorMessage = "Error loading orders";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (order: OrderFormData) => {
    setLoading(true);
    setError(null);

    try {
      const newOrder: Order = {
        id: Math.max(...orders.map((order) => order.id)) + 1,
        name: order.name,
        state: StateEnum.pending,
        stateName: "Pending",
        createdAt: new Date(),
        updatedAt: undefined,
      };
      if (newOrder) {
        setOrders((prev) => [...prev, newOrder]);
      }

      return { success: true };
    } catch (err) {
      const errorMessage = "Error creating order";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderState = async (orderId: number) => {
    setLoading(true);
    setError(null);

    try {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id === orderId) {
            if (order.state === StateEnum.pending) {
              return {
                ...order,
                state: StateEnum.inProgress,
                stateName: "In Progress",
                updatedAt: new Date(),
              };
            } else if (order.state === StateEnum.inProgress) {
              return {
                ...order,
                state: StateEnum.completed,
                stateName: "Completed",
                updatedAt: new Date(),
              };
            }
            return order;
          }
          return order;
        })
      );

      return { success: true };
    } catch (err) {
      const errorMessage = "Error updating order status";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesControlNumber =
      filterControlNumber === "" ||
      order.name.toLowerCase().includes(filterControlNumber.toLowerCase());
    const matchesState = filterState === "all" || order.state == filterState;
    return matchesControlNumber && matchesState;
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    filteredOrders,
    filterControlNumber,
    filterState,
    loading,
    error,
    fetchOrders,
    createOrder,
    toggleOrderState,
    setFilterControlNumber,
    setFilterState,
    clearError: () => setError(null),
  };
}
