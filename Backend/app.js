import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/db.js';
import passport from 'passport';
import initializingPassport from './src/passport/passportConfig.js';
import session from 'express-session';
import userRouter from './src/routes/user.router.js';
import errorMiddleware from './src/middleware/ErrorMiddleware.js';
import adminRouter from './src/routes/book.router.js';
import favoriteRouter from './src/routes/favorite.router.js';
import cartRouter from './src/routes/cart.router.js';
import oderRouter from './src/routes/order.router.js';
import cors from 'cors'

// Load environment variables
dotenv.config({  
  path: './.env'
});
const app = express();

const corsOption= {
 origin:"http://localhost:5173",
 methods: "GET, POST, DELETE, PATCH, HEAD",
    credentials: true
}

app.use(cors(corsOption))

// Initialize Express app


// Passport configuration
initializingPassport(passport);

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", oderRouter);

// Error handling middleware should be added after all other routes and middleware
app.use(errorMiddleware);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
