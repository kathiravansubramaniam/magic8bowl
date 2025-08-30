import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, ChefHat, Bookmark } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'
              }`
            }
          >
            <Home size={24} />
            <span className="text-xs mt-1">Inventory</span>
          </NavLink>
          
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'
              }`
            }
          >
            <ChefHat size={24} />
            <span className="text-xs mt-1">Recipes</span>
          </NavLink>
          
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'
              }`
            }
          >
            <Bookmark size={24} />
            <span className="text-xs mt-1">Saved</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}