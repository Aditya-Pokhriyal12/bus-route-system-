import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectToDB=async function (){
    try {
        // Use a default MongoDB connection if MONGODB_URL is not set
        const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';
        console.log(`Connecting to: ${mongoUrl}/${DB_NAME}`)
        
        const connectionInstance=await mongoose.connect(`${mongoUrl}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected successfully")
        console.log(`Connected to MongoDB at: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database connection failed:", error.message)
        console.log("Starting server without database connection...")
        // Don't exit the process, just log the error
    }
}   

export default connectToDB;