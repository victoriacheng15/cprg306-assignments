"use client";
import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [items, setItems] = useState(itemsData);
  const [groupedView, setGroupedView] = useState(false);
  const [activeSort, setActiveSort] = useState("none");

  function sortedList(func) {
    return [...items].sort(func);
  }

  function sortedByName() {
    const sortedItems = sortedList((a, b) => a.name.localeCompare(b.name));

    setGroupedView(false);
    setActiveSort("name");
    setItems(sortedItems);
  }

  function sortedByCategory() {
    const sortedItems = sortedList((a, b) =>
      a.category.localeCompare(b.category)
    );

    setGroupedView(false);
    setActiveSort("category");
    setItems(sortedItems);
  }

  function groupByCategory() {
    const grouped = [...items].reduce((acc, item) => {
      const { category } = item;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(item);

      return acc;
    }, {});

    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
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
            setActiveSort("grouped");
          }}
        >
          grouped category
        </Button>
      </section>
      {!groupedView ? (
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
      ) : (
        <>
          {groupByCategory().map(([category, items]) => (
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
      className={`px-2 py-1 rounded-lg capitalize ${
        activeSort === children ? "bg-green-800" : "bg-green-600"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
