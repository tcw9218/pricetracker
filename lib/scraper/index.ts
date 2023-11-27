import axios from "axios"
import * as cheerio from 'cheerio'
import { extractPrice } from "./utils"
export const scrapeAmazonProduct = async (url: string) => {
    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_ed471f95-zone-unblocker:wf1n83nrptkq -k https://lumtest.com/myip.json
    //BrightData Proxy
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (100000 * Math.random()) | 0

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: "brd.superproxy.io",
        port,
        rejectUnauthorized: false,
    }

    try{
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
       
        const title = $('#productTitle').text().trim()
        const parentdiv = $('#corePrice_feature_div')
        const targetSpan = parentdiv.find('span.a-price-whole')
        const currentPrice = extractPrice(
            targetSpan
        )
            console.log(title, currentPrice)
    }catch(e: any){
        throw new Error(`Failed to Scrape product:${e.message}`)
    }
}