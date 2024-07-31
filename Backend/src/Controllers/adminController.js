import BooksModel from "../Models/BooksModel.js"
import UserModel from "../Models/UserModel.js";


// CREATING THE BOOK 
const createBook = async (req, res) => {
  const { url, title, author, price, description, language } = req.body;
  try {
    const { userid } = req.headers; // Ensure the header key is correct
    console.log(`Received user ID from headers: ${userid}`);
    
    if (!userid) {
      return res.status(400).json({ message: "User ID is missing in headers" });
    }

    const user = await UserModel.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }
    
    console.log(`User role: ${user.role}`);
    
    const book = await BooksModel.create({
      url, title, author, price, description, language
    });

    console.log(`New book created: ${book}`);
    
    res.status(201).json({ message: "Book Created Successfully", book });
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// UPDATING THE BOOK n

 const updateBook = async(req,res)=>{

    const bookId = req.params.id;
console.log( `bookId :${bookId}`)
const { url,title, author,price,description,language} = req.body
try {
if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

    await BooksModel.findByIdAndUpdate(bookId,{
        url,title, author,price,description,language
    },{new:true});


    return res.status(200).json({message:"Book Updated Successfully"})
} catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
}
   
} 

// Deleting the book
const deleteBook = async(req,res) =>{
   const bookId = req.params.id;
   console.log( `bookId :${bookId}`)
   try {
    if (!bookId) {
        return res.status(400).json({ message: "Book ID is required" });
      }
      await BooksModel.findByIdAndDelete(bookId)
     res.status(200).json({message:"Book Deleted Successfully"})
    }
   catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
   }
}

//  GET ALL BOOKS

const getAllBooks= async (req,res)=>{
  try{
    const book = await BooksModel.find({}).sort({createdAt:-1});
    if(!book || book.length===0){
  res.status(404).json({message:"NO Books are found"})
    }
    return res.status(200).json(book)
  }catch(error){
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


//  GET Only 4 BOOKS

const getFourBooks= async (req,res)=>{
    try{
      const book = await BooksModel.find({}).sort({createdAt:-1}).limit(4);
      if(!book || book.length===0){
    res.status(404).json({message:"NO Books are found"})
      }
      return res.status(200).json(book)
    }catch(error){
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

//  getSingleBookById

const getSingleBook =async(req,res)=>{
    const id = req.params.id;
    try {
        const bookDetails =await BooksModel.findById({_id:id})
        res.status(200).json(bookDetails)
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}



export{createBook,updateBook, deleteBook,getAllBooks,getFourBooks,getSingleBook}