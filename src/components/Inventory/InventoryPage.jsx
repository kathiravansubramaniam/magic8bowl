import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import InventoryGrid from './InventoryGrid'
import AddItemCard from './AddItemModal'
import { Plus, ShoppingBag } from 'lucide-react'

const MovingCarousel = () => {
  const items = ['🍎', '🥕', '🥛', '🍞', '🧀', '🥩', '🥬', '🍅', '🧄', '🧅']
  
  return (
    <div className="overflow-hidden py-8">
      <div className="animate-scroll flex gap-8 whitespace-nowrap">
        {[...items, ...items].map((emoji, index) => (
          <div key={index} className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">{emoji}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InventoryPage() {
  const { state } = useInventory()
  const [showAddForm, setShowAddForm] = useState(false)

  if (showAddForm) {
    return <AddItemCard onClose={() => setShowAddForm(false)} />
  }

  return (
    <div className="min-h-screen">
      {state.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Magic8Bowl</h2>
            <p className="text-gray-600 text-lg mb-8">
              Track your groceries and generate
              <br />
              amazing recipes with AI.
            </p>
          </div>
          
          <MovingCarousel />
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white font-semibold py-4 px-12 rounded-full text-lg mt-8"
          >
            Add a New Item
          </button>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">Your Inventory</h1>
              <button 
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Add Item
              </button>
            </div>
          </div>
          
          {/* Added Items Section */}
          <div className="bg-gray-100 min-h-screen p-4">
            <h2 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">Current Inventory</h2>
            <InventoryGrid items={state.items} />
          </div>
        </div>
      )}
    </div>
  )
}