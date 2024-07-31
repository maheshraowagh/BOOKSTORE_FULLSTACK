import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
  
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    favorites:[
        {type:mongoose.Types.ObjectId,
         ref:"Book"
    }],
    carts:[
        {type:mongoose.Types.ObjectId,
         ref:"Book"
    }],
    orders:[
        {type:mongoose.Types.ObjectId,
         ref:"Order"
    }],


},{timestamps:true})


userSchema.pre('save', async function(next){
const user = this;
if(!user.isModified('password')){
return next();
}
try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password,salt);
     user.password = hashPassword;
     next()
    
} catch (error) {
    next(error)
}
});

userSchema.methods.comparePassword= async function(password){
    try {
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch
    } catch (error) {
        return next(error)
        console.log(error)
    }
}

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email: this.email,
            role: this.role
        },process.env.JWT_SECRET,
    {expiresIn:"7d"})
        
    } catch (error) {
        console.log(error);
        throw new error
    }
}


export default mongoose.model('User', userSchema)

 