import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { ChefHat, Settings, Loader2 } from 'lucide-react'
import { generateRecipe } from '../../services/recipeService'
import RecipeDisplay from './RecipeDisplay'
import ApiKeyModal from './ApiKeyModal'

export default function RecipePage() {
  const { state } = useInventory()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai-api-key') || '')

  const handleGenerateRecipe = async () => {
    if (!apiKey) {
      setShowApiKeyModal(true)
      return
    }

    if (state.items.length === 0) {
      alert('Add some items to your inventory first!')
      return
    }

    setLoading(true)
    try {
      const generatedRecipe = await generateRecipe(state.items, apiKey)
      setRecipe(generatedRecipe)
    } catch (error) {
      alert('Failed to generate recipe. Please check your API key.')
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

      {!recipe ? (
        <div className="space-y-4">
          <div className="card p-6 text-center">
            <ChefHat size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Generate a Recipe
            </h2>
            <p className="text-gray-500 mb-6">
              Create delicious recipes from your available ingredients
            </p>
            
            <button
              onClick={handleGenerateRecipe}
              disabled={loading || state.items.length === 0}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <ChefHat size={20} />
                  Generate Recipe
                </>
              )}
            </button>
          </div>
          
          {state.items.length > 0 && (
            <div className="card p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Available Ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {state.items.map(item => (
                  <span
                    key={item.id}
                    className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <RecipeDisplay
          recipe={recipe}
          onGenerateNew={() => setRecipe(null)}
        />
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