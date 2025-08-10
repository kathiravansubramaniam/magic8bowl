import React from 'react'
import InventoryItem from './InventoryItem'

export default function InventoryGrid({ items }) {
  const sortedItems = [...items].sort((a, b) => {
    const now = new Date()
    const aExpiry = new Date(a.expiryDate)
    const bExpiry = new Date(b.expiryDate)
    
    return aExpiry - bExpiry
  })

  return (
    <div className="grid grid-cols-2 gap-4">
      {sortedItems.map(item => (
        <InventoryItem key={item.id} item={item} />
      ))}
    </div>
  )
}