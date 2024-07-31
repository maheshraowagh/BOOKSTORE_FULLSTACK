import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createBook, deleteBook, getAllBooks, getFourBooks, getSingleBook, updateBook } from '../Controllers/adminController.js';
const router = express.Router();



 
router.post('/addBook', authMiddleware,createBook)
router.patch('/updateBook/:id',authMiddleware,updateBook)
router.delete('/deleteBook/:id', deleteBook)
router.get('/getAllBooks',getAllBooks)
router.get('/getFourBooks',getFourBooks)
router.get('/getSingleBook/:id',getSingleBook)



export default router