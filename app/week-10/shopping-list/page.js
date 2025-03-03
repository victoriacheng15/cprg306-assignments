"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";
import { redirect } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState();
  const [selectedItemName, setSelectItemName] = useState("");

  // Protect the page - only show content if user is authenticated
  if (!user) {
    redirect("/week-10");
    return;
  }

  async function loadItems() {
    const items = await getItems(user.uid);
    setItems(items);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleAddItem(newItem) {
    const id = await addItem(user.uid, newItem);
    setItems([...items, { ...newItem, id }]);
  }

  function handleItemSelect(ingredient) {
    const cleanedIngredients = ingredient
      .split(",")[0]
      .replace(/[^\w\s]/g, "")
      .trim();

    setSelectItemName(cleanedIngredients);
  }

  async function handleDelete(itemId) {
    await deleteItem(user.uid, itemId);
    setItems(items.filter((item) => item.id !== itemId));
  }

  return (
    <main className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold m-2">Shopping List</h2>
      <div className="flex gap-8">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onDelete={handleDelete}
          />
        </div>
        <div className="w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
