import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB Conencted: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB