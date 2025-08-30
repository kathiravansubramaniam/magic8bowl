import React from 'react'
import { Link } from 'react-router-dom'
import { useInventory } from '../../store/InventoryContext'
import { Bookmark, Trash2, Clock, Users } from 'lucide-react'

export default function BookmarksPage() {
  const { state, dispatch } = useInventory()

  const handleRemoveBookmark = (recipeId) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: recipeId })
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Saved Recipes</h1>
      
      {state.bookmarkedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Bookmark size={64} className="mx-auto" />
          </div>
          <h2 className="text-lg font-semibold text-gray-600 mb-2">No saved recipes</h2>
          <p className="text-gray-500 mb-6">Generate and bookmark recipes to see them here</p>
          <Link to="/recipes" className="btn-primary">
            Generate Recipe
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {state.bookmarkedRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card p-4 cursor-pointer" onClick={() => {}}>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                    {recipe.nutrition && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{recipe.nutrition.calories} kcal</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveBookmark(recipe.id)
                  }}
                  className="p-2 text-red-500 hover:text-red-700 flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}