import { createWorker } from 'tesseract.js'

export async function processReceipt(imageFile) {
  let worker;
  
  try {
    worker = await createWorker('eng', {
      logger: m => console.log(m)
    })
    
    const { data } = await worker.recognize(imageFile)
    
    return {
      text: data.text,
      confidence: data.confidence
    }
  } catch (error) {
    console.error('OCR processing failed:', error)
    throw new Error('Failed to process receipt image. Please try again with a clearer photo.')
  } finally {
    if (worker) {
      await worker.terminate()
    }
  }
}