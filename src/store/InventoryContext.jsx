import React, { createContext, useContext, useReducer, useEffect } from 'react'

const InventoryContext = createContext()

const initialState = {
  items: [],
  deletedItems: [],
  bookmarkedRecipes: []
}

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEMS':
      return {
        ...state,
        items: [...state.items, ...action.payload]
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        )
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        deletedItems: itemToRemove ? [...state.deletedItems, itemToRemove] : state.deletedItems
      }
    case 'CONSUME_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, item.quantity - action.payload.amount) }
          : item
      )
      const consumedItems = updatedItems.filter(item => item.quantity === 0)
      const activeItems = updatedItems.filter(item => item.quantity > 0)
      
      return {
        ...state,
        items: activeItems,
        deletedItems: [...state.deletedItems, ...consumedItems]
      }
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarkedRecipes: [...state.bookmarkedRecipes, action.payload]
      }
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarkedRecipes: state.bookmarkedRecipes.filter(recipe => recipe.id !== action.payload)
      }
    case 'LOAD_STATE':
      return {
        ...initialState,
        ...action.payload,
        deletedItems: action.payload.deletedItems || []
      }
    default:
      return state
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState)

  useEffect(() => {
    const savedState = localStorage.getItem('magic8bowl-state')
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('magic8bowl-state', JSON.stringify(state))
  }, [state])

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider')
  }
  return context
}