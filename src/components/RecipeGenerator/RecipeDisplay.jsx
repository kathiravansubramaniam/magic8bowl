import React, { useState, useEffect } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { Bookmark, RefreshCw, Clock, Users, ArrowLeft, Star } from 'lucide-react'

export default function RecipeDisplay({ recipe, onBack, onGenerateNew }) {
  const { dispatch } = useInventory()
  const [recipeImage, setRecipeImage] = useState(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const handleBookmark = () => {
    const bookmarkedRecipe = {
      id: Date.now(),
      ...recipe,
      savedAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_BOOKMARK', payload: bookmarkedRecipe })
    alert('Recipe saved to bookmarks!')
  }

  const generateRecipeImage = async () => {
    const apiKey = localStorage.getItem('openai-api-key')
    if (!apiKey) return

    setIsGeneratingImage(true)
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `A beautiful, appetizing photo of ${recipe.title}. The dish should look fresh, vibrant, and professional. Food photography style, top-down view, clean white background, high quality, restaurant presentation.`,
          n: 1,
          size: "1024x1024"
        }),
      })

      const data = await response.json()
      if (data.data && data.data[0]) {
        setRecipeImage(data.data[0].url)
      }
    } catch (error) {
      console.error('Error generating recipe image:', error)
    }
    setIsGeneratingImage(false)
  }

  useEffect(() => {
    generateRecipeImage()
  }, [recipe.title])

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Recipe</h1>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="relative">
          {/* Recipe Image */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden">
            {isGeneratingImage ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Generating image...</p>
              </div>
            ) : recipeImage ? (
              <img 
                src={recipeImage} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🍽️</span>
            )}
          </div>
          
          {/* Heart bookmark button */}
          <button
            onClick={handleBookmark}
            className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <Bookmark size={20} className="text-gray-600" fill="currentColor" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Title and Style Badge */}
          <div className="mb-4">
            {recipe.style && (
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {recipe.style}
              </p>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
            <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
          </div>
          
          {/* Nutrition Info */}
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <span>{recipe.cookTime}</span>
            <span>•</span>
            <span>{recipe.servings}</span>
            <span>•</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
        <div className="text-gray-700 leading-relaxed">
          {recipe.ingredients.join(', ')}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
        <ol className="space-y-4">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </span>
              <span className="text-gray-700 pt-1 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Options
          </button>
        )}
        <button
          onClick={onGenerateNew}
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          Generate New
        </button>
      </div>
    </div>
  )
}