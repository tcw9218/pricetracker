import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    url: { type: String, require: true, unique: true },
    currency: { type: String, require: true },
    image:  { type: String, require: true },
    title:  { type: String, require: true },
    currenctPrice:  { type: Number, require: true },
    priceHistory: [
        {
            price:  { type: Number, require: true },
            date: {type: Date, default: Date.now}
        }
    ],
    isOutOfStock:  { type: Boolean, default: false },
    users: [
        {email:  { type: String, require: true },
        }
    ], default: [],

}, {timestamps: true})


export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)