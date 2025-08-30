import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import InventoryGrid from './InventoryGrid'
import AddItemModal from './AddItemModal'
import { Plus, ShoppingBag } from 'lucide-react'

export default function InventoryPage() {
  const { state } = useInventory()
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Your Inventory</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>
      
      {state.items.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-white/60 mb-6">
            <ShoppingBag size={80} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No items yet</h2>
          <p className="text-white/80 mb-8 text-lg">Add some grocery items to get started</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <InventoryGrid items={state.items} />
      )}
      
      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}