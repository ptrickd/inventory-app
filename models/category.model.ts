import mongoose from 'mongoose'

interface ICategory {
    name: String
}

const schema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true
    }
})



export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', schema)