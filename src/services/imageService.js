export async function fetchItemImage(itemName) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(itemName + ' food grocery')}&per_page=1&client_id=demo`
    )
    
    if (!response.ok) {
      throw new Error('Image fetch failed')
    }
    
    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small
    }
    
    return null
  } catch (error) {
    console.warn('Image fetch failed for', itemName, error)
    return null
  }
}