"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  function increment() {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="max-w-sm mt-10 mx-auto">
      <p className="text-center text-2xl mb-4">Quantity: {quantity}</p>
      <div className="flex gap-4 justify-center">
        <button
          className={`border-2 p-2 rounded-lg duration-300 ${
            quantity === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-50 hover:text-gray-900"
          }`}
          onClick={decrement}
          disabled={quantity === 1}
        >
          Decrement
        </button>
        <button
          className={`border-2 p-2 rounded-lg duration-300 ${
            quantity === 20
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-50 hover:text-gray-900"
          }`}
          onClick={increment}
          disabled={quantity === 20}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
