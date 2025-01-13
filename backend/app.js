import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import connectDB from './config/connectDatabase.js';
import userRoutes from './routes/userRoutes.js'

const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

//cors policy
const corsOptions = {
 origin: process.env.FRONTEND_HOST,
 Credential:true,
 optionSuccessStatus : 200
}

// Database connection
connectDB(DATABASE_URL);

const port = process.env.PORT ;

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());

// Load Routes
app.use('/api/user', userRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})