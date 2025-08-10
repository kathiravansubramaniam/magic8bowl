const foodEmojiMap = {
  // Dairy & Eggs
  milk: '🥛',
  cheese: '🧀',
  yogurt: '🥛',
  butter: '🧈',
  eggs: '🥚',
  cream: '🥛',
  
  // Fruits
  apple: '🍎',
  banana: '🍌',
  orange: '🍊',
  grape: '🍇',
  strawberry: '🍓',
  lemon: '🍋',
  lime: '🍋',
  pear: '🍐',
  peach: '🍑',
  cherry: '🍒',
  kiwi: '🥝',
  pineapple: '🍍',
  mango: '🥭',
  avocado: '🥑',
  
  // Vegetables
  tomato: '🍅',
  potato: '🥔',
  carrot: '🥕',
  onion: '🧅',
  lettuce: '🥬',
  spinach: '🥬',
  broccoli: '🥦',
  cucumber: '🥒',
  pepper: '🫑',
  corn: '🌽',
  mushroom: '🍄',
  garlic: '🧄',
  
  // Meat & Fish
  chicken: '🍗',
  beef: '🥩',
  pork: '🥓',
  fish: '🐟',
  salmon: '🐟',
  shrimp: '🦐',
  
  // Grains & Bread
  bread: '🍞',
  rice: '🍚',
  pasta: '🍝',
  cereal: '🥣',
  flour: '🌾',
  oats: '🌾',
  
  // Pantry Items
  oil: '🫒',
  vinegar: '🫒',
  salt: '🧂',
  pepper: '🌶️',
  sugar: '🍯',
  honey: '🍯',
  sauce: '🥫',
  
  // Beverages
  water: '💧',
  juice: '🧃',
  soda: '🥤',
  coffee: '☕',
  tea: '🍵',
  beer: '🍺',
  wine: '🍷',
  
  // Default fallback
  default: '🛒'
}

export function getItemEmoji(itemName) {
  const name = itemName.toLowerCase()
  
  // Check for exact matches first
  if (foodEmojiMap[name]) {
    return foodEmojiMap[name]
  }
  
  // Check for partial matches
  for (const [key, emoji] of Object.entries(foodEmojiMap)) {
    if (name.includes(key) || key.includes(name)) {
      return emoji
    }
  }
  
  return foodEmojiMap.default
}