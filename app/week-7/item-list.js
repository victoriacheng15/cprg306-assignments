"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items = [] }) {
  const [groupedView, setGroupedView] = useState(false);
  const [activeSort, setActiveSort] = useState("none");

  // Function to sort items
  function sortedList(items, func) {
    return [...items].sort(func);
  }

  // Sort items by name
  function sortedByName() {
    setGroupedView(false);
    setActiveSort("name");
  }

  // Sort items by category
  function sortedByCategory() {
    setGroupedView(false);
    setActiveSort("category");
  }

  // Group items by category
  function groupByCategory(items) {
    const grouped = items.reduce((acc, item) => {
      const { category } = item;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
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
        <Button
          activeSort={activeSort}
          onClick={() => {
            setGroupedView(true);
            setActiveSort("grouped category");
          }}
        >
          grouped category
        </Button>
      </section>
      {!groupedView ? (
        <ul>
          {displayedItems.map(({ id, name, quantity, category }) => (
            <Item
              key={id}
              name={name}
              quantity={quantity}
              category={category}
            />
          ))}
        </ul>
      ) : (
        <>
          {groupByCategory(items).map(([category, items]) => (
            <section key={category}>
              <h3 className="text-xl font-bold capitalize">{category}</h3>
              <ul>
                {items.map(({ id, name, quantity, category }) => (
                  <Item
                    key={id}
                    name={name}
                    quantity={quantity}
                    category={category}
                  />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
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
