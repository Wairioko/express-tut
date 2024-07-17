import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import orderRoutes from './order_router.mjs';
import productRoutes from './product_router.mjs';
import userRoutes from './user_router.mjs';

const app = express();

// use routes
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);



// code to connect to db
mongoose.connect('mongodb://localhost/27017/express-tut')
.then(()=> console.log("Connected to db successfully"))
.catch((error) => console.log("Unable to connect to db", error))

const port = process.env.PORT || 3000;

const limiter = rateLimit({
    // set limit to 15mins
    windowMs: 15 *  60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later"
});


app.use(limiter);



app.get('/', (req, res) => {
    res.send("welcome to my 2nd challenge")
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});















