// netlify/functions/get-recipe.js

const { default: Anthropic } = require("@anthropic-ai/sdk"); // Fix import

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention. Format your response in markdown.
`;

exports.handler = async function (event) {
  try {
    const { ingredients } = JSON.parse(event.body);

    if (!Array.isArray(ingredients)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid ingredients array." }),
      };
    }

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}. What can I cook?`,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        recipe: response?.content?.[0]?.text || "No recipe found.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
