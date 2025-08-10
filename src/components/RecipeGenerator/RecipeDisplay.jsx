import React from 'react'
import { useInventory } from '../../store/InventoryContext'
import { Bookmark, RefreshCw, Clock, Users, ArrowLeft, Star } from 'lucide-react'

export default function RecipeDisplay({ recipe, onBack, onGenerateNew }) {
  const { dispatch } = useInventory()

  const handleBookmark = () => {
    const bookmarkedRecipe = {
      id: Date.now(),
      ...recipe,
      savedAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_BOOKMARK', payload: bookmarkedRecipe })
    alert('Recipe saved to bookmarks!')
  }

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">{recipe.title}</h2>
          <button
            onClick={handleBookmark}
            className="p-2 text-gray-600 hover:text-emerald-600"
          >
            <Bookmark size={20} />
          </button>
        </div>
        
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} />
            <span>{recipe.difficulty}</span>
          </div>
          {recipe.style && (
            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs">
              {recipe.style}
            </span>
          )}
        </div>
        
        <p className="text-gray-700 mb-4">{recipe.description}</p>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
        <ol className="space-y-3">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700 pt-0.5">{step}</span>
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