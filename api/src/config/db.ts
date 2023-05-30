import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        // For some reason mongoose.connect() does not accept process.env.MONGO_URI, this weird fix makes it work
        const uri: string = JSON.parse(JSON.stringify(process.env.MONGO_URI))
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB SUCCESSFULLY Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}