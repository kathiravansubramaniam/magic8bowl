import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { InventoryProvider } from './store/InventoryContext'
import Layout from './components/Common/Layout'
import InventoryPage from './components/Inventory/InventoryPage'
import RecipePage from './components/RecipeGenerator/RecipePage'
import BookmarksPage from './components/Bookmarks/BookmarksPage'

function App() {
  return (
    <InventoryProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<InventoryPage />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
          </Routes>
        </Layout>
      </Router>
    </InventoryProvider>
  )
}

export default App