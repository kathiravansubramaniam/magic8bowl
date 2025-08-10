// Temporary mock OCR service for testing - replace with actual OCR later
export async function processReceipt(imageFile) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock OCR result with sample grocery items for testing
  const mockReceiptText = `
    SAINSBURY'S RECEIPT
    MILK WHOLE 4PT        £2.75
    BREAD WHITE SLICED    £1.20
    EGGS FREE RANGE 12    £3.50
    BANANAS LOOSE         £1.85
    CHICKEN BREAST 500G   £4.99
    RICE BASMATI 1KG      £2.45
    TOTAL                £16.74
  `
  
  return {
    text: mockReceiptText,
    confidence: 85
  }
}