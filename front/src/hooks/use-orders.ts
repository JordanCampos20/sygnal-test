"use client";

import { useState, useEffect } from "react";
import { Order, OrderFormData, StateEnum } from "@/types/order";
import { API_CONFIG, apiCall } from "@/lib/api";

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
      const orders = await apiCall<Order[]>(API_CONFIG.ENDPOINTS.ORDER);

      setOrders(orders || []);
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
      const newOrder = await apiCall<Order>(API_CONFIG.ENDPOINTS.ORDER, {
        method: "POST",
        body: JSON.stringify(order)
      });

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
      const updatedOrder = await apiCall<Order>(`${API_CONFIG.ENDPOINTS.ORDER}/${orderId}`, {
        method: "PATCH"
      });

      if (updatedOrder) {
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? updatedOrder : order))
        );
      }

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
