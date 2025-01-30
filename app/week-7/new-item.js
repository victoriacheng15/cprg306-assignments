"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const selectOptions = [
    "produce",
    "dairy",
    "bakery",
    "meat",
    "frozen foods",
    "canned goods",
    "dry goods",
    "beverages",
    "snacks",
    "household",
    "others",
  ];

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

  function handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: itemName,
      quantity,
      category,
    };

    console.log(newItem);

    onAddItem(newItem);

    setItemName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form className="p-2 max-w-sm w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Item name"
          className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg text-gray-900"
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          required
        />
        <div className="flex gap-4 justify-between">
          <div className="flex items-center gap-4 bg-slate-100 text-gray-900 px-3 py-2 rounded-lg">
            <span className="">{quantity}</span>
            <div className="flex gap-2">
              <Button
                text="-"
                className={`w-10 ${
                  quantity === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-900 hover:text-slate-100"
                }`}
                onClick={decrement}
                disabled={quantity === 1}
              />
              <Button
                text="+"
                className={`w-10 ${
                  quantity === 20
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-900 hover:text-slate-100"
                }`}
                onClick={increment}
                disabled={quantity === 20}
              />
            </div>
          </div>
          <select
            className="text-gray-900 px-2 rounded-lg"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="" disabled>
              Category
            </option>
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option.slice(0, 1).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-orange-500 text-gray-900 rounded-lg py-2 font-bold hover:bg-orange-400 duration-300 ease-in-out"
          type="submit"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}

function Button({
  text,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`bg-orange-500 text-gray-900 rounded-lg py-2 font-bold ont-bold hover:bg-orange-400 duration-300 ease-in-out ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
