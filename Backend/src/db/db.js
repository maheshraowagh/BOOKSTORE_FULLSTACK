import mongoose from 'mongoose';


const connectDB = async()=>{
    try {
      const db=  await mongoose.connect(process.env.MONGO_URI)
      console.log('successfully connected')
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
}



export default connectDB
