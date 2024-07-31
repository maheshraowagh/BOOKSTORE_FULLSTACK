import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addToCart, removeBook, userCart } from '../Controllers/cartController.js';




const router = express.Router();
 
router.patch('/addToCart', authMiddleware, addToCart)
router.patch('/removeBookInCart', authMiddleware, removeBook);
router.get("/userCart",authMiddleware,userCart)
 


export default router