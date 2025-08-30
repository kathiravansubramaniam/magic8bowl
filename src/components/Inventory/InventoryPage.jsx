import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import InventoryGrid from './InventoryGrid'
import AddItemCard from './AddItemModal'
import { Plus, ShoppingBag } from 'lucide-react'

export default function InventoryPage() {
  const { state } = useInventory()
  const [showAddForm, setShowAddForm] = useState(false)

  if (showAddForm) {
    return <AddItemCard onClose={() => setShowAddForm(false)} />
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">Your Inventory</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>
      
      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingBag size={64} className="mx-auto" />
          </div>
          <h2 className="text-lg font-semibold text-gray-600 mb-2">No items yet</h2>
          <p className="text-gray-500 mb-6">Add some grocery items to get started</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <InventoryGrid items={state.items} />
      )}
    </div>
  )
}