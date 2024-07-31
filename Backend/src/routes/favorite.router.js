import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addBookINFav, getFavBook, removeFavBook } from '../Controllers/FavoriteController.js';


const router = express.Router();
 
router.patch('/addBookINFav', authMiddleware, addBookINFav)
router.patch('/removeFavBook',authMiddleware,removeFavBook)
router.get('/getFavBook',authMiddleware,getFavBook)


export default router