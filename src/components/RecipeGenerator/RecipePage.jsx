import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { ChefHat, Settings, Loader2, ArrowLeft, Bookmark } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState('generated')
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
    setActiveTab('generated')
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

  if (selectedRecipe) {
    return (
      <RecipeDisplay
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        onGenerateNew={() => {
          setRecipes(null)
          setSelectedRecipe(null)
          setShowCondimentSelector(true)
        }}
      />
    )
  }

  if (showCondimentSelector) {
    return (
      <CondimentSelector
        availableItems={state.items}
        onGenerate={handleGenerateRecipe}
      />
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setShowCondimentSelector(true)}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Recipes</h1>
        <div className="ml-auto">
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('generated')}
          className={`flex-1 pb-4 text-center text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'generated' 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-500 border-transparent'
          }`}
        >
          GENERATED RECIPES
        </button>
        <button
          onClick={() => setActiveTab('bookmarked')}
          className={`flex-1 pb-4 text-center text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'bookmarked' 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-500 border-transparent'
          }`}
        >
          BOOKMARKED
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="animate-spin text-gray-500 mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Generating Recipe Options...
          </h2>
          <p className="text-gray-500">
            Creating delicious recipes from your ingredients
          </p>
        </div>
      ) : activeTab === 'generated' ? (
        recipes ? (
          <div className="space-y-4">
            {recipes.map((recipe, index) => (
              <div key={index} className="recipe-card p-4 cursor-pointer"
                   onClick={() => setSelectedRecipe(recipe)}>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">{recipe.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{recipe.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{recipe.servings}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{recipe.difficulty}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{recipe.cookTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ChefHat size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No recipes generated yet</h2>
            <p className="text-gray-500 mb-6">Generate some recipes to see them here</p>
            <button
              onClick={() => setShowCondimentSelector(true)}
              className="btn-primary"
            >
              Generate Recipes
            </button>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {state.bookmarkedRecipes.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-lg font-semibold text-gray-700 mb-2">No bookmarked recipes</h2>
              <p className="text-gray-500">Save recipes to see them here</p>
            </div>
          ) : (
            state.bookmarkedRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card p-4 cursor-pointer"
                   onClick={() => setSelectedRecipe(recipe)}>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">{recipe.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{recipe.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{recipe.servings}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{recipe.cookTime}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">Saved {new Date(recipe.savedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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