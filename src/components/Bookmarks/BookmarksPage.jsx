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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Recipes</h1>
      
      {state.bookmarkedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Bookmark size={64} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No saved recipes</h2>
          <p className="text-gray-500 mb-6">Generate and bookmark recipes to see them here</p>
          <Link to="/recipes" className="btn-primary">
            Generate Recipe
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {state.bookmarkedRecipes.map(recipe => (
            <div key={recipe.id} className="card p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                <button
                  onClick={() => handleRemoveBookmark(recipe.id)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
              
              <div className="flex gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                Saved {new Date(recipe.savedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}