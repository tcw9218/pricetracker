"use server"

import { scrapeAmazonProduct } from "../scraper"

export const scrapeAndStoreProduct = async(productUrl: string) => {
    if ( !productUrl ) return

    try{
        connectToDB()

        const scrapedProducts = await scrapeAmazonProduct(productUrl)

        if(!scrapedProducts) return

        //Store

    }catch(e: any){
        throw new Error(`Failed to store product:${e.message}`)
    }
}