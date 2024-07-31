import jwt from 'jsonwebtoken'
import User from '../Models/UserModel.js';


const authMiddleware = async(req,res,next)=>{
const token= req.header("Authorization")

if(!token || token.length<7){
   return res.status(401).json({message:"Unauthorized: Token not provided"})
}

// const jwtToken = token.split(" ")[1];
const jwtToken = token.replace("Bearer", "").trim();

    try {  
    const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET)
  
    const userData = await User.findOne({email:isVerified.email}).
    select({password:0})
    console.log(userData )
    req.user = userData;
    req.token = token;
    req.userId = userData._id

    next()
} catch (error) {
    console.log(error)
}

}



export default authMiddleware 