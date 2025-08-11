import React, { useState, useEffect } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { getItemEmoji } from '../../utils/emojiMapper'
import { getRecommendedUnits, allUnits, getUnitLabel } from '../../utils/unitMapper'
import { X, ChevronDown } from 'lucide-react'

export default function AddItemModal({ onClose }) {
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('pieces')
  const [showAllUnits, setShowAllUnits] = useState(false)
  const [recommendedUnits, setRecommendedUnits] = useState(['pieces', 'grams', 'ml'])
  const { dispatch } = useInventory()

  // Update recommended units when item name changes
  useEffect(() => {
    if (itemName.trim()) {
      const recommended = getRecommendedUnits(itemName)
      setRecommendedUnits(recommended)
      setUnit(recommended[0]) // Set first recommended unit as default
    }
  }, [itemName])

  const handleAdd = () => {
    if (!itemName.trim() || !quantity) return

    const numQuantity = parseFloat(quantity)
    if (numQuantity <= 0) return

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      quantity: numQuantity,
      unit: unit,
      originalQuantity: numQuantity,
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
            <div className="flex gap-2">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0.1"
                step="0.1"
                placeholder="e.g. 2, 1.5, 500"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg bg-white min-w-20"
                >
                  <optgroup label="Recommended">
                    {recommendedUnits.map(unitValue => {
                      const unitObj = allUnits.find(u => u.value === unitValue)
                      return (
                        <option key={unitValue} value={unitValue}>
                          {unitObj ? unitObj.label : unitValue}
                        </option>
                      )
                    })}
                  </optgroup>
                  <optgroup label="All Units">
                    {allUnits.filter(u => !recommendedUnits.includes(u.value)).map(unitObj => (
                      <option key={unitObj.value} value={unitObj.value}>
                        {unitObj.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
            {itemName && (
              <p className="text-xs text-gray-500 mt-1">
                Recommended for {itemName.toLowerCase()}: {recommendedUnits.map(u => getUnitLabel(u)).join(', ')}
              </p>
            )}
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
            disabled={!itemName.trim() || !quantity || parseFloat(quantity) <= 0}
            className="flex-1 btn-primary disabled:opacity-50"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
}