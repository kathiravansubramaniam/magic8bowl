import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { Trash2, Minus, Plus, Calendar } from 'lucide-react'
import ConsumptionModal from './ConsumptionModal'

export default function InventoryItem({ item }) {
  const { dispatch } = useInventory()
  const [showConsumption, setShowConsumption] = useState(false)
  
  const now = new Date()
  const expiryDate = new Date(item.expiryDate)
  const daysToExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
  
  const getExpiryColor = () => {
    if (daysToExpiry < 0) return 'text-red-600 bg-red-50'
    if (daysToExpiry <= 1) return 'text-orange-600 bg-orange-50'
    if (daysToExpiry <= 2) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }
  
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id })
  }
  
  const handleConsume = (amount) => {
    dispatch({ 
      type: 'CONSUME_ITEM', 
      payload: { id: item.id, amount } 
    })
  }

  return (
    <>
      <div className="card p-3">
        <div className="relative">
          <div className="w-full h-32 bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-6xl">{item.emoji || '🛒'}</span>
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getExpiryColor()}`}>
            {daysToExpiry < 0 ? 'Expired' : `${daysToExpiry}d left`}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(100, (item.quantity / item.originalQuantity) * 100)}%` }}
          />
        </div>
        
        <button
          onClick={() => setShowConsumption(true)}
          className="w-full btn-secondary text-sm"
        >
          Use Item
        </button>
      </div>
      
      {showConsumption && (
        <ConsumptionModal
          item={item}
          onConsume={handleConsume}
          onClose={() => setShowConsumption(false)}
        />
      )}
    </>
  )
}