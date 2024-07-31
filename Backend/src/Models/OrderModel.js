import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
},
book:{
    type:mongoose.Types.ObjectId,
    ref:"Book"
},
status:{
    type:String,
    default:"Order Placed",
    enum:["Order Placed","out for delivery", "Delivered", "Canceled"]
}


}, {timestamps:true})




export default mongoose.model('Order', orderSchema)