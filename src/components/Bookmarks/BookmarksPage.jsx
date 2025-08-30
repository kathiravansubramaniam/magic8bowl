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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-8">Saved Recipes</h1>
      
      {state.bookmarkedRecipes.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-white/60 mb-6">
            <Bookmark size={80} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No saved recipes</h2>
          <p className="text-white/80 mb-8 text-lg">Generate and bookmark recipes to see them here</p>
          <Link to="/recipes" className="btn-primary">
            Generate Recipe
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {state.bookmarkedRecipes.map(recipe => (
            <div key={recipe.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                <button
                  onClick={() => handleRemoveBookmark(recipe.id)}
                  className="p-2 text-red-500 hover:text-red-700 bg-red-50/80 rounded-xl transition-all duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{recipe.description}</p>
              
              <div className="flex gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 font-medium">
                Saved {new Date(recipe.savedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}