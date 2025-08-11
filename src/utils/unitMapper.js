// Smart unit suggestions based on item type
export const getRecommendedUnits = (itemName) => {
  const name = itemName.toLowerCase()
  
  // Liquids - ml, liters
  const liquidItems = ['milk', 'juice', 'oil', 'vinegar', 'water', 'wine', 'beer', 'cream', 'broth', 'stock', 'sauce']
  if (liquidItems.some(liquid => name.includes(liquid))) {
    return ['ml', 'liters', 'cups']
  }
  
  // Weight-based items - grams, kg
  const weightItems = ['flour', 'sugar', 'rice', 'pasta', 'meat', 'chicken', 'beef', 'fish', 'cheese', 'butter']
  if (weightItems.some(weight => name.includes(weight))) {
    return ['grams', 'kg', 'lbs']
  }
  
  // Produce - usually by piece or weight
  const produceItems = ['apple', 'banana', 'orange', 'potato', 'onion', 'tomato', 'carrot', 'pepper', 'lemon', 'lime']
  if (produceItems.some(produce => name.includes(produce))) {
    return ['pieces', 'grams', 'kg', 'lbs']
  }
  
  // Eggs and similar countable items
  const countableItems = ['egg', 'bagel', 'muffin', 'roll', 'can', 'bottle', 'jar', 'pack']
  if (countableItems.some(countable => name.includes(countable))) {
    return ['pieces', 'dozen']
  }
  
  // Spices and herbs - usually small quantities
  const spiceItems = ['salt', 'pepper', 'basil', 'oregano', 'thyme', 'cumin', 'paprika', 'cinnamon']
  if (spiceItems.some(spice => name.includes(spice))) {
    return ['grams', 'tsp', 'tbsp']
  }
  
  // Default units
  return ['pieces', 'grams', 'ml']
}

export const allUnits = [
  // Count
  { value: 'pieces', label: 'pieces', type: 'count' },
  { value: 'dozen', label: 'dozen', type: 'count' },
  
  // Weight
  { value: 'grams', label: 'g', type: 'weight' },
  { value: 'kg', label: 'kg', type: 'weight' },
  { value: 'lbs', label: 'lbs', type: 'weight' },
  { value: 'oz', label: 'oz', type: 'weight' },
  
  // Volume
  { value: 'ml', label: 'ml', type: 'volume' },
  { value: 'liters', label: 'L', type: 'volume' },
  { value: 'cups', label: 'cups', type: 'volume' },
  { value: 'fl oz', label: 'fl oz', type: 'volume' },
  
  // Cooking
  { value: 'tsp', label: 'tsp', type: 'cooking' },
  { value: 'tbsp', label: 'tbsp', type: 'cooking' }
]

export const getUnitLabel = (unitValue) => {
  const unit = allUnits.find(u => u.value === unitValue)
  return unit ? unit.label : unitValue
}