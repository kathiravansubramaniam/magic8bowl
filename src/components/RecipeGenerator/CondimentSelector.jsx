import React, { useState, useEffect } from 'react'
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
  const [selectedCondiments, setSelectedCondiments] = useState(() => {
    const saved = localStorage.getItem('selected-condiments')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('selected-condiments', JSON.stringify(selectedCondiments))
  }, [selectedCondiments])

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
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Condiments & Spices</h1>
        <p className="text-gray-600">
          Select what you have available to get better recipe suggestions.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-8">
        {commonCondiments.map(condiment => (
          <button
            key={condiment.name}
            onClick={() => toggleCondiment(condiment.name)}
            className={`p-4 rounded-2xl border-0 text-base font-medium transition-all duration-200 flex flex-col items-center gap-2 min-h-[80px] ${
              selectedCondiments.includes(condiment.name)
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-150'
            }`}
          >
            <span className="text-2xl">{condiment.emoji}</span>
            <span className="text-sm leading-tight text-center">{condiment.name}</span>
          </button>
        ))}
      </div>

      <div className="card p-6">
        <h4 className="font-semibold text-gray-700 mb-3">Your Available Ingredients:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {availableItems.map(item => (
            <span
              key={item.id}
              className="px-3 py-2 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center gap-1"
            >
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </span>
          ))}
        </div>
        
        <button
          onClick={handleGenerate}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <ChefHat size={24} />
          Generate Recipe Options
        </button>
      </div>
    </div>
  )
}