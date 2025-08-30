import React, { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { getUnitLabel } from '../../utils/unitMapper'
import { Trash2, Minus, Plus, Calendar } from 'lucide-react'
import ConsumptionModal from './ConsumptionModal'

export default function InventoryItem({ item }) {
  const { dispatch } = useInventory()
  const [showConsumption, setShowConsumption] = useState(false)
  
  const now = new Date()
  const expiryDate = new Date(item.expiryDate)
  const daysToExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
  
  const getExpiryColor = () => {
    if (daysToExpiry < 0) return 'text-red-100 bg-red-500/80'
    if (daysToExpiry <= 1) return 'text-orange-100 bg-orange-500/80'
    if (daysToExpiry <= 2) return 'text-yellow-100 bg-yellow-500/80'
    return 'text-green-100 bg-green-500/80'
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
      <div className="card p-4">
        <div className="relative">
          <div className="w-full h-36 bg-gradient-to-br from-white/20 to-white/5 rounded-xl mb-4 flex items-center justify-center backdrop-blur-sm">
            <span className="text-7xl drop-shadow-lg">{item.emoji || '🛒'}</span>
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-red-500/90 text-white rounded-xl hover:bg-red-600 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <h3 className="font-bold text-gray-800 mb-2 truncate text-lg">{item.name}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600 font-medium">
            {item.quantity} {getUnitLabel(item.unit || 'pieces')}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getExpiryColor()}`}>
            {daysToExpiry < 0 ? 'Expired' : `${daysToExpiry}d left`}
          </span>
        </div>
        
        <div className="w-full bg-gray-200/50 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500"
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