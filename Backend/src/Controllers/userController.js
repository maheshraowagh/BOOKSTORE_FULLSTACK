import User from '../Models/UserModel.js';



// HOme router
const Home = (req,res)=>{
    res.send("welcome to the Home page")
};


// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, address, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const isExisted = await User.findOne({ email });
    if (isExisted) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
      address,
    });

    // Generate token and respond with user details
    return res.status(200).json({
      msg: "User created successfully",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
      role: newUser.role,
    });
  } catch (error) {
    // Log error and respond with a generic error message
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//  Login router

const loginUser = async(req,res, next) =>{
    const {email, password} = req.body;
if(!email || !password){
 return res.status(400).json({message:"All fields are requried"})
}
let userExisted
try {
      userExisted = await User.findOne({email});
    if(!userExisted){
        return res.status(404).json({message:"Invalid Credentials"})
    }
} catch (error) {
   next(error) 
}

const isMatched = userExisted? userExisted.comparePassword(password) : false;

if (!isMatched) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  
res.status(200).json({message:"Login successfully",
    token:await userExisted.generateToken(),
    userId:userExisted._id.toString(),
    role:userExisted.role
})


}





//  User LoginInfo


const user = async(req,res)=>{
try {
    const userData = req.user
    console.log(`This is userDAta: ${userData}`)
    res.status(200).json(userData)
} catch (error) {
    console.log(error)
     res.status(500).json({message:"Internal server error"})
}
}

//  updateUserById

const updateUserById = async (req,res) =>{
    try {
        const {id} = req.headers ;
        const{address} = req.body;

        const updateData = await User.findByIdAndUpdate(id,
            {
                address:address
            }
        );
        return res.status(200).json({message:"Address updated successfully"})
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}



export {Home,registerUser,loginUser,user,updateUserById};