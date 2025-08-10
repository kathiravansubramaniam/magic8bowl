import React, { useState } from 'react'
import { Upload, Camera } from 'lucide-react'
import ReceiptProcessor from './ReceiptProcessor'

export default function CameraPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processing, setProcessing] = useState(false)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Scan Receipt</h1>
      
      {!selectedFile ? (
        <div className="space-y-4">
          <div className="card p-8 text-center">
            <Camera size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Upload Receipt Photo
            </h2>
            <p className="text-gray-500 mb-6">
              Take a photo or upload an image of your grocery receipt
            </p>
            
            <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
              <Upload size={20} />
              Choose Photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="card p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Tips for best results:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ensure receipt is well-lit and readable</li>
              <li>• Keep the receipt flat and in focus</li>
              <li>• Include the entire receipt in the photo</li>
            </ul>
          </div>
        </div>
      ) : (
        <ReceiptProcessor
          file={selectedFile}
          processing={processing}
          setProcessing={setProcessing}
          onReset={() => setSelectedFile(null)}
        />
      )}
    </div>
  )
}