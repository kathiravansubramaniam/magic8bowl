import React, { useState, useEffect } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { getItemEmoji } from '../../utils/emojiMapper'
import { getRecommendedUnits, allUnits, getUnitLabel } from '../../utils/unitMapper'
import { X, ChevronDown } from 'lucide-react'

export default function AddItemCard({ onClose }) {
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
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Add Item</h1>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
            ITEM NAME
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g. Milk, Bread, Apples"
            className="w-full p-4 border-0 bg-gray-100 rounded-2xl text-lg placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              QUANTITY
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0.1"
              step="0.1"
              placeholder="2"
              className="w-full p-4 border-0 bg-gray-100 rounded-2xl text-lg placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              UNIT
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-4 border-0 bg-gray-100 rounded-2xl text-lg focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
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
          <div className="text-center py-6">
            <span className="text-6xl">{getItemEmoji(itemName)}</span>
            <p className="text-sm text-gray-500 mt-2">Preview</p>
          </div>
        )}
        
        {itemName && (
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-xs text-gray-600">
              Recommended units for {itemName.toLowerCase()}: {recommendedUnits.map(u => getUnitLabel(u)).join(', ')}
            </p>
          </div>
        )}
        
        <button 
          onClick={handleAdd} 
          disabled={!itemName.trim() || !quantity || parseFloat(quantity) <= 0}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 text-lg"
        >
          Save Item
        </button>
      </div>
    </div>
  )
}