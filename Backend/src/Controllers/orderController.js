import OrderModel from "../Models/OrderModel.js";
import UserModel from "../Models/UserModel.js";

const placeOrder = async (req, res) => {
   
    try {
      const {userid} = req.headers;
      const {order} = req.body;
    
      console.log(`this is userid ${userid} and this is order ${order}`)
  
      if (!userid || !order) {
        return res.status(400).json({
          message: "User ID and order data are required",
          error: !userid ? "Missing user ID" : "Missing order data",
        });
      }
    console.log('i am reching herer')
      for (const orderData of order) {
        // Create a new order instance
        const newOrder = new OrderModel({ user: userid, book: orderData._id });
  
        // Save the order to the database
        const orderDataFromDb = await newOrder.save();
  
        // Update the user's orders
        await UserModel.findByIdAndUpdate(userid, {
          $push: { orders: orderDataFromDb._id },
        });
  
        // Clear the user's cart
        await UserModel.findByIdAndUpdate(userid, {
          $pull: { carts: orderData._id },
        });
      }
  
      // Return a success response
      return res.json({
        status: "success",
        message: "Order placed Successfully",
      });
  
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle the error, e.g., log it and return a meaningful message to the client
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };


//  get order histroy
const orderHistory = async (req, res) => {
  try {
    const { userid } = req.headers;
    // Find the user by ID and populate the orders and book for each order
    const userData = await UserModel.findById(userid).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    // Create a copy of the orders array and then reverse it
    const orderData = Array.isArray(userData.orders) ? [...userData.orders].reverse() : [];

    return res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get all user order Data

const getAllOrder = async(req,res)=>{
    try {
        const userData = await OrderModel.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user"
        })
        .sort({createdAt: -1});

        return res.json({
            status:"success",
            data:userData
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

//  getAllOrderAdmin

const getAllOrderAdmin = async(req,res)=>{
    try {
        const userData = await OrderModel.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user"
        }).sort({createdAt:-1});
        return res.json({
            status:"Success",
            data:userData
        })
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export {placeOrder,orderHistory,getAllOrder,getAllOrderAdmin }