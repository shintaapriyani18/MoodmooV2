"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { removeFromCart, clearCart } from "@/lib/cartSlice";

export default function CartContent() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <section className="p-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-3 rounded-xl shadow"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-pink-500">{item.name}</span>
                <span className="text-sm text-gray-500">
                  {item.qty} pcs x Rp {item.price.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl">
            Total: Rp {totalPrice.toLocaleString()}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => dispatch(clearCart())}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Checkout! (Simulasi)")}
              className="px-3 py-1 bg-pink-500 text-white rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
