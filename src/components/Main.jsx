import { useState } from "react";
import IngredientsList from "./IngredientsList";
import KitzRecipe from "./KitzRecipe";
import { getRecipeFromChefClaude } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredientItem(formData) {
    const listItem = formData.get("ingredient");

    setIngredients((prevItem) => [...prevItem, listItem]);
  }

  return (
    <main className="main">
      <form action={addIngredientItem} className="form">
        <input
          className="ingredient-input"
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />

        <button className="ingredient-btn">+ Add ingredient</button>
      </form>

      {ingredients.length > 0 ? (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      ) : null}

      {recipe && <KitzRecipe recipe={recipe} />}
    </main>
  );
}
