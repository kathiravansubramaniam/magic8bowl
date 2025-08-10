import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { ChefHat, Settings, Loader2 } from 'lucide-react'
import { generateRecipe } from '../../services/recipeService'
import RecipeDisplay from './RecipeDisplay'
import CondimentSelector from './CondimentSelector'
import ApiKeyModal from './ApiKeyModal'

export default function RecipePage() {
  const { state } = useInventory()
  const [recipes, setRecipes] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [showCondimentSelector, setShowCondimentSelector] = useState(true)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai-api-key') || '')

  const handleGenerateRecipe = async (selectedCondiments) => {
    if (!apiKey) {
      setShowApiKeyModal(true)
      return
    }

    if (state.items.length === 0) {
      alert('Add some items to your inventory first!')
      return
    }

    setLoading(true)
    setShowCondimentSelector(false)
    try {
      const generatedRecipes = await generateRecipe(state.items, selectedCondiments, apiKey)
      setRecipes(generatedRecipes)
      setSelectedRecipe(null)
    } catch (error) {
      alert('Failed to generate recipe. Please check your API key.')
      setShowCondimentSelector(true)
    }
    setLoading(false)
  }

  const handleSaveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('openai-api-key', key)
    setShowApiKeyModal(false)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recipe Generator</h1>
        <button
          onClick={() => setShowApiKeyModal(true)}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <Settings size={24} />
        </button>
      </div>

      {loading ? (
        <div className="card p-6 text-center">
          <Loader2 className="animate-spin text-emerald-500 mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Generating Recipe Options...
          </h2>
          <p className="text-gray-500">
            Creating delicious recipes from your ingredients
          </p>
        </div>
      ) : selectedRecipe ? (
        <RecipeDisplay
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
          onGenerateNew={() => {
            setRecipes(null)
            setSelectedRecipe(null)
            setShowCondimentSelector(true)
          }}
        />
      ) : recipes ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recipe Options</h2>
            <button
              onClick={() => {
                setRecipes(null)
                setShowCondimentSelector(true)
              }}
              className="btn-secondary"
            >
              Generate New
            </button>
          </div>
          
          {recipes.map((recipe, index) => (
            <div key={index} className="card p-4 cursor-pointer hover:shadow-lg transition-shadow"
                 onClick={() => setSelectedRecipe(recipe)}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {recipe.style}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>⏱️ {recipe.cookTime}</span>
                <span>👥 {recipe.servings}</span>
                <span>📊 {recipe.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      ) : showCondimentSelector ? (
        <CondimentSelector
          availableItems={state.items}
          onGenerate={handleGenerateRecipe}
        />
      ) : (
        <div className="card p-6 text-center">
          <ChefHat size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">No items in inventory</h2>
          <p className="text-gray-500 mb-6">Add some ingredients first to generate recipes</p>
        </div>
      )}

      {showApiKeyModal && (
        <ApiKeyModal
          currentKey={apiKey}
          onSave={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  )
}