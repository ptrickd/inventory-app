import mongoose from 'mongoose'

interface IUser {
    email: string
    password: string
}

const schema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.models.User || mongoose.model<IUser>('User', schema)