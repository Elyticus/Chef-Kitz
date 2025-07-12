export async function getRecipeFromChefClaude(ingredientsArr) {
  if (!Array.isArray(ingredientsArr)) {
    throw new Error("ingredientsArr must be an array of strings");
  }

  const res = await fetch("/api/get-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  const data = await res.json();
  return data.recipe || "No recipe response received.";
}
