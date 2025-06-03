import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.MONGO_URL

const dbConnection = async()=>{
    try {
        await mongoose.connect(url)
        console.log('Db connection succesfull');
        
    } catch (error) {
        console.log('error while conneting to db');
        console.log(error.message)
        
    }
}
export default dbConnection;