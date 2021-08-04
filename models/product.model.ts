import mongoose from 'mongoose'

interface IProduct {
    name: String
    currentAmount: Number
    previousAmount: Number
    categoryId: String
    userId: String
}

const schema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    previousAmount: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})



export default mongoose.models.Product || mongoose.model<IProduct>('Product', schema)