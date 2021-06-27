import mongoose from 'mongoose'

interface IReport {
    date: Date

}

const schema = new mongoose.Schema<IReport>({
    date: {
        type: Date,
        required: true,
        unique: true
    }
})

export default mongoose.models.Report || mongoose.model<IReport>('Report', schema)