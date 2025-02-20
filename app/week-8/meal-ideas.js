"use client";
import { useState, useEffect } from "react";

export default function MealIdeas({ ingredient }) {
  const [loading, setLoading] = useState(false);
  const [mealIdeas, setMealIdeas] = useState([]);
  const [error, setError] = useState("");

  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsError, setIngredientsError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [message, setMessage] = useState("Select an item to see meal ideas");

  async function fetchMealIdeas(ingredient) {
    if (!ingredient) return;

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      setMealIdeas(data.meals || []);

      if (data.meals && data.meals.length > 0) {
        setMessage(`Here are some meal ideas using ${ingredient}`);
      } else {
        setMessage(`No meal ideas for ${ingredient}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMealIngredients(mealId) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    setIngredientLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        // Extract ingredients and measures from the meal data
        const meal = data.meals[0];
        const ingredientsList = [];
        let i = 1; // Start with the first ingredient

        // Use a while loop to dynamically check for ingredients
        while (true) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];

          // Break the loop if the ingredient is empty or undefined
          if (!ingredient || ingredient.trim() === "") {
            break;
          }

          // Add the ingredient and measure to the list
          ingredientsList.push(`${measure} ${ingredient}`);
          i++; // Move to the next ingredient
        }
        setIngredients(ingredientsList);
      }
    } catch (error) {
      setIngredientsError(error.message);
    } finally {
      setIngredientLoading(false);
    }
  }

  const handleMealClick = (mealId) => {
    setIngredients([]);
    setSelectedMeal(mealId);
    fetchMealIngredients(mealId);
  };

  useEffect(() => {
    fetchMealIdeas(ingredient);
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-bold">Meal Ideas</h2>
      <p className="text-lg mb-4">{message}</p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul className="grid gap-4">
        {mealIdeas.map(({ idMeal, strMeal }) => (
          <li
            key={idMeal}
            className="bg-slate-900 p-2 rounded-lg cursor-pointer hover:bg-gray-800 duratino-300 ease-in-out"
            onClick={() => handleMealClick(idMeal)}
          >
            <p className="font-bold text-xl mb-4">{strMeal}</p>
            {selectedMeal === idMeal && (
              <ul className="pl-4">
                <p className="capitalize italic text-orange-600">
                  ingredients:
                </p>
                {ingredientLoading && <li>Loading ingredients...</li>}
                {ingredientsError && (
                  <li style={{ color: "red" }}>Error: {ingredientsError}</li>
                )}
                {ingredients.map((ingredient) => (
                  <li className="ml-5" key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
