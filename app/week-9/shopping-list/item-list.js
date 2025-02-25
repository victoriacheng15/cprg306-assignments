"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items = [], onItemSelect }) {
  const [activeSort, setActiveSort] = useState("none");

  // Function to sort items
  function sortedList(items, func) {
    return [...items].sort(func);
  }

  // Sort items by name
  function sortedByName() {
    setActiveSort("name");
  }

  // Sort items by category
  function sortedByCategory() {
    setActiveSort("category");
  }

  // Compute the displayed items based on the activeSort and groupedView states
  let displayedItems = [...items];
  if (activeSort === "name") {
    displayedItems = sortedList(items, (a, b) => a.name.localeCompare(b.name));
  } else if (activeSort === "category") {
    displayedItems = sortedList(items, (a, b) =>
      a.category.localeCompare(b.category)
    );
  }

  return (
    <>
      <section className="flex gap-4 items-center p-4">
        <p>Sorted by:</p>
        <Button activeSort={activeSort} onClick={sortedByName}>
          name
        </Button>
        <Button activeSort={activeSort} onClick={sortedByCategory}>
          category
        </Button>
      </section>
      <ul>
        {displayedItems.map(({ id, name, quantity, category }) => (
          <Item
            key={id}
            name={name}
            quantity={quantity}
            category={category}
            onSelect={() => onItemSelect(name)}
          />
        ))}
      </ul>
    </>
  );
}

function Button({ onClick, children, activeSort }) {
  return (
    <button
      className={`px-2 py-1 rounded-lg capitalize text-gray-900 hover:bg-orange-400 duration-300 ease-in-out ${
        activeSort === children ? "bg-orange-500" : "bg-orange-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
