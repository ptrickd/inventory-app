import mongoose from 'mongoose'

interface IReport {
    userId: String
    date: Date
    products: IProduct[]
    hasBeenSubmitted: Boolean
    dateCreated: Date
    dateSubmitted: Date
}

interface IProduct {
    productId: String
    amount: Number
    name: Number
}

const productSchema = new mongoose.Schema<IProduct>({
    productId: String,
    amount: Number,
    name: String,
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
    products: [productSchema],
    hasBeenSubmitted: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date
    },
    dateSubmitted: {
        type: Date,
        required: true
    }
})

export default mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema)