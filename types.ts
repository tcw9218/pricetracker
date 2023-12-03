export type Product = {
    _id?: string,
    url: string,
    currency: string,
    image: string,
    title: string,
    currentPrice: number,
    priceHistory: [],
    stars: number,
    isOutofStock: boolean,
}