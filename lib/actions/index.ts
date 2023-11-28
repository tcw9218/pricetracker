"use server"
import { revalidatePath } from "next/cache"
import { Product } from "../models/product.model"
import { scrapeAmazonProduct } from "../scraper"
import { connectToDB } from "../scraper/mongoose"

export const scrapeAndStoreProduct = async (productUrl: string) => {
    if ( !productUrl ) return

    try{
        connectToDB()

        const scrapedProduct = await scrapeAmazonProduct(productUrl)

        if(!scrapedProduct) return

        //Store
        let product = scrapedProduct
        const existingProduct = await Product.findOne({
            url: scrapedProduct.url
        })
        if (existingProduct) {
            const updatePriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product =  {
                ...scrapedProduct,
                priceHistory: updatePriceHistory,
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            {url: scrapedProduct.url},
            product,
            { upsert: true, new: true }
        )

      revalidatePath(`/products/${newProduct._id}`)

    } catch (e: any){
        throw new Error(`Failed to store product:${e.message}`)
    }
}

export const getProductById = async (productId: string) => {
    try {

        connectToDB()

        const product = await Product.findOne({_id: productId})
        if(!product) return null

        return product
    } catch (e: any) {
        throw new Error(`Failed to find product:${e.message}`)
    }
}