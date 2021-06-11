import mongoose from 'mongoose'

interface IProduct {
    name: String
    amount: Number
    categoryId: String
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
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})



export default mongoose.models.Product || mongoose.model<IProduct>('Product', schema)