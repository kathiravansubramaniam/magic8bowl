export async function generateRecipe(items, condiments, apiKey) {
  const mainIngredients = items.map(item => item.name).join(', ')
  const availableCondiments = condiments.join(', ')
  
  const prompt = `You are a professional chef. Create 2 different recipe options using SOME (not all) of these main ingredients: ${mainIngredients}

Available condiments/spices: ${availableCondiments}

IMPORTANT GUIDELINES:
- Use only 3-6 main ingredients per recipe (don't try to use everything)
- Base recipes on real, popular dishes from 2024 cooking trends
- Focus on simple, proven combinations that actually taste good
- Include sheet pan dinners, one-pot meals, or 5-ingredient recipes
- Each recipe should be different cooking styles (e.g., one baked, one sautéed)
- Don't make up unusual combinations - stick to classic, tested recipes

Format as JSON array:
[
  {
    "title": "Recipe Name",
    "description": "Brief description of the dish",
    "cookTime": "25 minutes",
    "servings": "2-3",
    "difficulty": "Easy",
    "style": "Sheet Pan/One-Pot/Stir-fry",
    "ingredients": ["specific amount + ingredient"],
    "instructions": ["step 1", "step 2"],
    "nutrition": {
      "calories": 450,
      "protein": "25g",
      "fat": "15g",
      "carbs": "35g"
    }
  },
  {
    "title": "Different Recipe Name",
    ...
  }
]

Give me 2 completely different recipe options.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const recipeText = data.choices[0].message.content

    try {
      const recipes = JSON.parse(recipeText)
      return Array.isArray(recipes) ? recipes : [recipes]
    } catch (parseError) {
      // Return simple fallback recipes
      return [
        {
          title: "Simple Sautéed Vegetables",
          description: "Quick and healthy vegetable sauté",
          cookTime: "15 minutes", 
          servings: "2-3",
          difficulty: "Easy",
          style: "Stir-fry",
          ingredients: ["2 tbsp olive oil", "Mixed vegetables from your inventory", "Salt and pepper to taste"],
          instructions: ["Heat oil in pan", "Add vegetables", "Cook 5-7 minutes until tender", "Season with salt and pepper"],
          nutrition: {
            calories: 180,
            protein: "4g",
            fat: "12g", 
            carbs: "15g"
          }
        }
      ]
    }
  } catch (error) {
    console.error('Recipe generation failed:', error)
    throw error
  }
}