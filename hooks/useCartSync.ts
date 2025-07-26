"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { setCart } from "@/lib/cartSlice";

export function useCartSync() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      try {
        dispatch(setCart(JSON.parse(data)));
      } catch (err) {
        console.error("Failed to parse cart data", err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);
}
