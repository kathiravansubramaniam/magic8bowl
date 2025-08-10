import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInventory } from '../../store/InventoryContext'
import InventoryGrid from './InventoryGrid'
import AddItemModal from './AddItemModal'
import { Plus, Camera } from 'lucide-react'

export default function InventoryPage() {
  const { state } = useInventory()
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Inventory</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>
      
      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Camera size={64} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No items yet</h2>
          <p className="text-gray-500 mb-6">Scan a receipt to get started</p>
          <Link to="/camera" className="btn-primary">
            Scan Receipt
          </Link>
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