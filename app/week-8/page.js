"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectItemName] = useState("");

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleItemSelect(ingredient) {
    const cleanedIngredients = ingredient
      .split(",")[0]
      .replace(/[^\w\s]/g, "")
      .trim();

    setSelectItemName(cleanedIngredients);
  }

  return (
    <main className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold m-2">Shopping List</h2>
      <div className="flex gap-8">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
