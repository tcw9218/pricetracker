export const extractPrice = (...elements: any) => {
    
    for (const element of elements) {
      
        const priceText = element.text().trim()
        console.log('priceText::',priceText)
        if(priceText) return priceText.replace(/\D/g,'')
    }

    return ''
}