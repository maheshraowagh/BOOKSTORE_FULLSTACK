
import BooksModel from "../Models/BooksModel.js";
import UserModel from "../Models/UserModel.js";

// ADD FAVORITE BOOK

const addBookINFav  = async(req,res)=>{
    try {
        console.log("Headers are:", JSON.stringify(req.headers));
    const {bookid,userid} = req.headers;
    
    
    if (!bookid || !userid) {
        return res.status(400).json({ message: "bookId and userId are required" });
      }
   
        const userData = await UserModel.findById(userid);
        const isBookFav = userData.favorites.includes(bookid);
        if(isBookFav){
            return res.status(409).json({message:"Book is already in favorites"});
        }
        await UserModel.findByIdAndUpdate(userid, {$push:{favorites:bookid}})
        return res.status(200).json({message:"Book added to favorites"})
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


// REMOVE FAVORITE BOOK

const removeFavBook = async(req,res)=>{
try {
    const {bookid,userid} = req.headers;
    if(!bookid && !userid){
        return res.status(400).json({ message: "bookId and userId are required" });
    }
    const userData = await UserModel.findById(userid)
     await BooksModel.findByIdAndUpdate(bookid)
     const isBookFav = userData.favorites.includes(bookid);
     if(!isBookFav){
         return res.status(409).json({message:"Book is not found in favorites"});
     }
     await UserModel.findByIdAndUpdate(userid, {$pull:{favorites:bookid}})
       return res.status(200).json({ message: "Book removed from favorites successfully" });
} catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
}
}



// getFavBook

const getFavBook= async(req,res)=>{
    try {
        const {id} = req.headers;
        if(!id){
            res.status(404).json({message:"book id is not found"})
        }
        const user = await UserModel.findById(id).populate("favorites");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
         const favoriteBooks = user.favorites;
         if (!favoriteBooks || favoriteBooks.length === 0) {
            return res.status(404).json({ message: "No favorite books found" }); 
          }
         return res.status(200).json(favoriteBooks)


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
 
}


export {addBookINFav,removeFavBook,getFavBook}