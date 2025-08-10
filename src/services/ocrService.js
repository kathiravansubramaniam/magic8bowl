import { createWorker } from 'tesseract.js'

export async function processReceipt(imageFile) {
  const worker = await createWorker()
  
  try {
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    
    const { data } = await worker.recognize(imageFile)
    
    return {
      text: data.text,
      confidence: data.confidence
    }
  } finally {
    await worker.terminate()
  }
}