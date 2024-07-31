import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getAllOrder, getAllOrderAdmin, orderHistory, placeOrder } from '../Controllers/orderController.js';
const router = express.Router();


router.post("/placeOrder",authMiddleware,placeOrder)
router.get("/orderHistory", authMiddleware,orderHistory)
router.post("/getAllOrder", authMiddleware,getAllOrder)
router.post("/getAllOrderAdmin", authMiddleware,getAllOrderAdmin)

 


export default router