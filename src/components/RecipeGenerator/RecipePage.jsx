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
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Recipe Generator</h1>
        <button
          onClick={() => setShowApiKeyModal(true)}
          className="p-3 text-white/80 hover:text-white bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300"
        >
          <Settings size={24} />
        </button>
      </div>

      {loading ? (
        <div className="glass-card p-8 text-center">
          <Loader2 className="animate-spin text-white mx-auto mb-6" size={56} />
          <h2 className="text-xl font-bold text-white mb-3">
            Generating Recipe Options...
          </h2>
          <p className="text-white/80 text-lg">
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
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Recipe Options</h2>
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
            <div key={index} className="card p-6 cursor-pointer transition-all duration-300"
                 onClick={() => setSelectedRecipe(recipe)}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                <span className="text-xs bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-1 rounded-full font-medium">
                  {recipe.style}
                </span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{recipe.description}</p>
              <div className="flex gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">⏱️ {recipe.cookTime}</span>
                <span className="flex items-center gap-1">👥 {recipe.servings}</span>
                <span className="flex items-center gap-1">📊 {recipe.difficulty}</span>
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
        <div className="glass-card p-8 text-center">
          <ChefHat size={80} className="mx-auto text-white/60 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">No items in inventory</h2>
          <p className="text-white/80 mb-6 text-lg">Add some ingredients first to generate recipes</p>
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