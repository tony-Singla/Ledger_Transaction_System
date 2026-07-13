import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Server is connected to db ")
        
    }
    catch(err){
        console.log("An error has occured while connecting to db ")
    }
}

export {connectdb}