import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, ChefHat, Bookmark } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <main className="pb-24">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 px-6 py-4 shadow-2xl">
        <div className="flex justify-around max-w-md mx-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg scale-105' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
              }`
            }
          >
            <Home size={22} />
            <span className="text-xs mt-1 font-medium">Inventory</span>
          </NavLink>
          
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg scale-105' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
              }`
            }
          >
            <ChefHat size={22} />
            <span className="text-xs mt-1 font-medium">Recipes</span>
          </NavLink>
          
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-white bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg scale-105' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
              }`
            }
          >
            <Bookmark size={22} />
            <span className="text-xs mt-1 font-medium">Saved</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}