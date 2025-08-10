import React, { useState } from 'react'
import { Key, ExternalLink } from 'lucide-react'

export default function ApiKeyModal({ currentKey, onSave, onClose }) {
  const [apiKey, setApiKey] = useState(currentKey)

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Key size={20} className="text-emerald-600" />
          <h3 className="text-lg font-semibold">OpenAI API Key</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          Enter your OpenAI API key to generate recipes. Your key is stored locally and never shared.
        </p>
        
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        />
        
        <div className="flex gap-3 mb-4">
          <button onClick={onClose} className="flex-1 btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 btn-primary">
            Save
          </button>
        </div>
        
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
        >
          <ExternalLink size={16} />
          Get API Key from OpenAI
        </a>
      </div>
    </div>
  )
}