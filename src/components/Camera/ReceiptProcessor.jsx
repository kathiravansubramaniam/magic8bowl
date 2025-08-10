import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventory } from '../../store/InventoryContext'
import { processReceipt } from '../../services/ocrService'
import { fetchItemImage } from '../../services/imageService'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ReceiptProcessor({ file, processing, setProcessing, onReset }) {
  const [status, setStatus] = useState('ready')
  const [extractedItems, setExtractedItems] = useState([])
  const [progress, setProgress] = useState(0)
  const { dispatch } = useInventory()
  const navigate = useNavigate()

  const processReceiptImage = async () => {
    setProcessing(true)
    setStatus('processing')
    setProgress(10)

    try {
      setStatus('Extracting text from receipt...')
      setProgress(30)
      
      const ocrResult = await processReceipt(file)
      
      setStatus('Identifying grocery items...')
      setProgress(50)
      
      const items = parseReceiptItems(ocrResult.text)
      
      setStatus('Fetching product images...')
      setProgress(70)
      
      const itemsWithImages = await Promise.all(
        items.map(async (item, index) => {
          try {
            const image = await fetchItemImage(item.name)
            return {
              ...item,
              id: Date.now() + index,
              image,
              originalQuantity: item.quantity,
              expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
            }
          } catch (error) {
            return {
              ...item,
              id: Date.now() + index,
              image: null,
              originalQuantity: item.quantity,
              expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
            }
          }
        })
      )
      
      setProgress(90)
      setExtractedItems(itemsWithImages)
      
      dispatch({ type: 'ADD_ITEMS', payload: itemsWithImages })
      
      setStatus('complete')
      setProgress(100)
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
      
    } catch (error) {
      console.error('Processing failed:', error)
      setStatus('error')
    }
  }

  const parseReceiptItems = (text) => {
    const lines = text.split('\n').filter(line => line.trim())
    const items = []
    
    const groceryKeywords = [
      'milk', 'bread', 'eggs', 'butter', 'cheese', 'yogurt', 'apple', 'banana',
      'orange', 'tomato', 'lettuce', 'onion', 'potato', 'carrot', 'chicken',
      'beef', 'fish', 'rice', 'pasta', 'flour', 'sugar', 'salt', 'pepper',
      'oil', 'vinegar', 'sauce', 'cereal', 'juice', 'water', 'soda'
    ]
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase()
      const hasGroceryKeyword = groceryKeywords.some(keyword => 
        lowerLine.includes(keyword)
      )
      
      if (hasGroceryKeyword) {
        const priceMatch = line.match(/\$?\d+\.?\d*/g)
        const price = priceMatch ? parseFloat(priceMatch[priceMatch.length - 1].replace('$', '')) : 0
        
        let name = line.replace(/\$?\d+\.?\d*/g, '').trim()
        name = name.replace(/^\d+\s*x?\s*/i, '').trim()
        
        if (name && name.length > 2) {
          items.push({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            quantity: 1,
            price: price
          })
        }
      }
    })
    
    return items.slice(0, 20)
  }

  useEffect(() => {
    if (file && !processing) {
      processReceiptImage()
    }
  }, [file])

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <img
          src={URL.createObjectURL(file)}
          alt="Receipt"
          className="w-full max-h-64 object-contain rounded-lg mb-4"
        />
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {status === 'processing' || status.includes('...') ? (
              <Loader2 className="animate-spin text-emerald-500" size={20} />
            ) : status === 'complete' ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : status === 'error' ? (
              <XCircle className="text-red-500" size={20} />
            ) : null}
            
            <span className="text-sm font-medium text-gray-700">
              {typeof status === 'string' ? status : 'Processing...'}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {status === 'complete' && (
            <div className="text-center">
              <p className="text-green-600 font-medium">
                Successfully added {extractedItems.length} items to inventory!
              </p>
              <p className="text-sm text-gray-500">Redirecting to inventory...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <p className="text-red-600 font-medium mb-3">
                Failed to process receipt
              </p>
              <button onClick={onReset} className="btn-secondary">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}