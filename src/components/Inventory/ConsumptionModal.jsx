import React from 'react'
import { getUnitLabel } from '../../utils/unitMapper'

export default function ConsumptionModal({ item, onConsume, onClose }) {
  const presetAmounts = [
    { label: '1/4', value: item.originalQuantity * 0.25 },
    { label: '1/3', value: item.originalQuantity * 0.33 },
    { label: '1/2', value: item.originalQuantity * 0.5 },
    { label: '2/3', value: item.originalQuantity * 0.67 },
    { label: 'All', value: item.quantity }
  ]

  const handlePresetConsume = (amount) => {
    onConsume(amount)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Use {item.name}</h3>
        <p className="text-gray-600 mb-4">
          Current: {item.quantity} {getUnitLabel(item.unit || 'pieces')}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {presetAmounts.map(preset => (
            <button
              key={preset.label}
              onClick={() => handlePresetConsume(preset.value)}
              className="btn-secondary text-sm py-3"
              disabled={preset.value > item.quantity}
            >
              {preset.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}