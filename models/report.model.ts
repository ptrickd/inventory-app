import mongoose from 'mongoose'

interface IReport {
    userId: String
    date: Date
    products: IProduct[]
}

interface IProduct {
    productId: String
    currentAmount: Number
    lastAmount: Number
}

const productSchema = new mongoose.Schema<IProduct>({
    productId: String,
    currentAmount: Number,
    lastAmount: Number
})

const reportSchema = new mongoose.Schema<IReport>({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    products: [productSchema]
})

export default mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema)