import axios from "axios"
import * as cheerio from 'cheerio'
import { extractPrice } from "../utils"
import { Product } from "@/types"
export const scrapeAmazonProduct = async (url: string) => {
    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_ed471f95-zone-unblocker:wf1n83nrptkq -k https://lumtest.com/myip.json
    //BrightData Proxy
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (100000 * Math.random()) | 0

    // const options = {
    //     auth: {
    //         username: `${username}-session-${session_id}`,
    //         password,
    //     },
    //     host: "brd.superproxy.io",
    //     port,
    //     rejectUnauthorized: false,
    // }

    try{
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
       
        const title = $('#productTitle').text().trim()
        const parentdiv = $('#corePrice_feature_div')
        const targetSpan = parentdiv.find('span.a-price-whole')
        const currency = parentdiv.find('span.a-price-symbol').text()
        const currentPrice = extractPrice(targetSpan)

        const outOfStock = $('#availability').find('span.a-color-success').text().trim() !== '在庫あり。';
        
        const images = 
            $('#imgBlkFront').attr('data-a-dynamic-image') || 
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}'
        
        const imageUrls = Object.keys(JSON.parse(images));
        // const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

      

        const data: Product = {
            url,
            currency: currency || '￥',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice),
            priceHistory: [],
            stars: 4.0,
            isOutofStock: outOfStock,
        }
        
        return data
        
    }catch(e: any){
        throw new Error(`Failed to Scrape product:${e.message}`)
    }
}