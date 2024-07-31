import UserModel from "../Models/UserModel.js";

// Add book to cart

const addToCart= async(req,res)=>{
try {
    const {bookid, userid} = req.headers;

    if(!bookid || !userid){
        return res.status(400).json({ message: "bookId and userId are required" });
    }
    const user = await UserModel.findById(userid)

    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isBookInCart = user.carts.includes(bookid);

      if(isBookInCart){
       return res.status(409).json({message:"Book already exists in cart"});
      }
        await UserModel.findByIdAndUpdate(userid,{
            $push:{carts:bookid}
        });
  return res.status(200).json({message:"Book added to cart"})
     
} catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
}


}

// Remove book from cart

const removeBook = async(req,res)=>{

    try {
        const {userid,bookid} = req.headers;
        
    if(!bookid || !userid){
        return res.status(400).json({ message: "bookId and userId are required" });
    }
    const user = await UserModel.findById(userid)

    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await UserModel.findByIdAndUpdate(userid,{
        $pull:{carts:bookid}
      })
      return res.status(200).json({message:"Book removed successfully"})
        
    } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
        
    }

}


//  User CART

const userCart = async(req,res)=>{
    try {
        const {userid} = req.headers;
   
        if(!userid){
            return res.status(400).json({ message: " userId are required" });
        }
        const user = await UserModel.findById(userid).populate("carts");
        const cart = user.carts.reverse()

        return res.status(200).json(cart)
    
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

export{addToCart,removeBook,userCart}