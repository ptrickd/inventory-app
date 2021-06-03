import mongoose from 'mongoose'

interface IProduct {
    name: String
}

const schema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        default: 0
    }
})



export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', schema)