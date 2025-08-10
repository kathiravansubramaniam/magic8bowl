import React, { useState } from 'react'
import { ChefHat } from 'lucide-react'

const commonCondiments = [
  { name: 'Salt', emoji: '🧂' },
  { name: 'Black Pepper', emoji: '🌶️' },
  { name: 'Olive Oil', emoji: '🫒' },
  { name: 'Garlic', emoji: '🧄' },
  { name: 'Onion', emoji: '🧅' },
  { name: 'Butter', emoji: '🧈' },
  { name: 'Soy Sauce', emoji: '🥢' },
  { name: 'Lemon', emoji: '🍋' },
  { name: 'Paprika', emoji: '🌶️' },
  { name: 'Cumin', emoji: '🟤' },
  { name: 'Oregano', emoji: '🌿' },
  { name: 'Basil', emoji: '🌿' },
  { name: 'Thyme', emoji: '🌿' },
  { name: 'Honey', emoji: '🍯' },
  { name: 'Vinegar', emoji: '🫒' },
  { name: 'Hot Sauce', emoji: '🌶️' }
]

export default function CondimentSelector({ onGenerate, availableItems }) {
  const [selectedCondiments, setSelectedCondiments] = useState([])

  const toggleCondiment = (condiment) => {
    setSelectedCondiments(prev => 
      prev.includes(condiment)
        ? prev.filter(c => c !== condiment)
        : [...prev, condiment]
    )
  }

  const handleGenerate = () => {
    onGenerate(selectedCondiments)
  }

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What condiments and spices do you have?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Select what you have available to get better recipe suggestions
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-6">
          {commonCondiments.map(condiment => (
            <button
              key={condiment.name}
              onClick={() => toggleCondiment(condiment.name)}
              className={`p-3 rounded-lg border text-sm flex items-center gap-2 transition-colors ${
                selectedCondiments.includes(condiment.name)
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{condiment.emoji}</span>
              <span>{condiment.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-semibold text-gray-700 mb-3">Your Available Ingredients:</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableItems.map(item => (
            <span
              key={item.id}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center gap-1"
            >
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </span>
          ))}
        </div>
        
        <button
          onClick={handleGenerate}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <ChefHat size={20} />
          Generate Recipe Options
        </button>
      </div>
    </div>
  )
}