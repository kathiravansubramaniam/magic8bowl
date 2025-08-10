export async function generateRecipe(items, apiKey) {
  const ingredients = items.map(item => `${item.name} (${item.quantity} available)`).join(', ')
  
  const prompt = `Create a recipe using these available ingredients: ${ingredients}. 
  
  Please format your response as JSON with this structure:
  {
    "title": "Recipe Name",
    "description": "Brief description",
    "cookTime": "30 minutes",
    "servings": "4",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2"]
  }
  
  Make the recipe practical and use as many of the available ingredients as possible. Keep it simple and delicious.`

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
      return JSON.parse(recipeText)
    } catch (parseError) {
      return {
        title: "Generated Recipe",
        description: "A delicious recipe made from your ingredients",
        cookTime: "30 minutes",
        servings: "2-4",
        ingredients: ingredients.split(', '),
        instructions: recipeText.split('\n').filter(line => line.trim())
      }
    }
  } catch (error) {
    console.error('Recipe generation failed:', error)
    throw error
  }
}