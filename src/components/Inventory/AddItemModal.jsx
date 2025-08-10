import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { getItemEmoji } from '../../utils/emojiMapper'
import { X } from 'lucide-react'

export default function AddItemModal({ onClose }) {
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useInventory()

  const handleAdd = () => {
    if (!itemName.trim()) return

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      quantity: quantity,
      originalQuantity: quantity,
      emoji: getItemEmoji(itemName),
      price: 0,
      expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
    }

    dispatch({ type: 'ADD_ITEMS', payload: [newItem] })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Item</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Milk, Bread, Apples"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          {itemName && (
            <div className="text-center">
              <span className="text-4xl">{getItemEmoji(itemName)}</span>
              <p className="text-sm text-gray-500 mt-1">Preview</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 btn-secondary">
            Cancel
          </button>
          <button 
            onClick={handleAdd} 
            disabled={!itemName.trim()}
            className="flex-1 btn-primary disabled:opacity-50"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
}