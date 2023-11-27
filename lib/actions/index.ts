"use server"

import { scrapeAmazonProduct } from "../scraper"

export const scrapeAndStoreProduct = async(productUrl: string) => {
    if ( !productUrl ) return

    try{
        const scrapedProducts = await scrapeAmazonProduct(productUrl)
    }catch(e: any){
        throw new Error(`Failed to store product:${e.message}`)
    }
}