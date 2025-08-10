export async function fetchItemImage(itemName) {
  try {
    // Use a placeholder image service that doesn't require API keys
    const encodedName = encodeURIComponent(itemName.toLowerCase())
    
    // Try multiple fallback image sources
    const imageSources = [
      `https://via.placeholder.com/150x150/10b981/ffffff?text=${encodedName}`,
      `https://picsum.photos/150/150?random=${Math.floor(Math.random() * 1000)}`,
    ]
    
    // For now, return a consistent placeholder
    return `https://via.placeholder.com/150x150/10b981/ffffff?text=${encodedName.slice(0, 10)}`
    
  } catch (error) {
    console.warn('Image fetch failed for', itemName, error)
    return `https://via.placeholder.com/150x150/e5e7eb/6b7280?text=Item`
  }
}