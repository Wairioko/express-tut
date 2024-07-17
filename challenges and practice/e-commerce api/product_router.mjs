import { Product, User } from "./schema.mjs";
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { products } from "../../constants.mjs";

const router = express.Router();


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    console.log('Token:', token);
    if(!token){
        console.log('No token provided');
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, jwtSecret);
        console.log('Token verified:', verified); // Debug log
        req.user = verified; // Attach the verified user to the request
        next();
        
    } catch (error) {
        console.log('Invalid token:', error.message); // Debug log
        res.status(400).send('Invalid Token');   
    }
}


router.post('/api/product/create', verifyToken ,(req, res) => {

    const {name, description, price, category, stock} = req.body;
    const newProduct = new Product({
        name, description, price, category, stock
    })
    if(newProduct.name === Product.name){
        res.status(400).send("Product with name already exists")
    }
    try {
        newProduct.save();
        res.status(200).send(`Product created successfully ${newProduct.name}`)
    } catch (error) {
        res.status(400).send(`Error creating product ${error}`)
    }
})


router.get('/api/products', (req, res) => {
    const getProducts = Product.findAll()
    if (!getProducts) return res.status(400).send("Product not found");
    res.status(200).send("These are the products", getProducts)
})



router.get('/api/product/:name', (req, res) => {
    const { name } = req.params;
    const findProduct = Product.findById(name);
    if(!findProduct) return res.status(400).send("Product not found");
    res.status(200).send(`Products found: ${Product.name}`)
})



router.get('/api/product/update/:name', async (req, res) => {
    const { name } = req.params;
    const {new_name, new_description, new_price, new_stock, new_category} = req.body;
    try {
        if( User.isAdmin === true){
        const updateProduct = await Product.findByIdAndUpdate(name, {name:new_name, description:new_description, 
            price:new_price, stock:new_stock,
            category:new_category
        });
        updateProduct.save();
        res.status(200).send(`Product updated successfully`, updateProduct);
    }else{
        res.status(400).send("User not admin cannot update product details")
    }
    } catch (error) {
        res.status(400).send('Product not updated', error);
    }
})


router.get('/api/product/delete/:name', async (req, res) => {
    const { name } = req.params;
    try {
        if(User.isAdmin === true){
        Product.findByIdAndDelete(name);
        res.status(200).send("Product deleted successfully");
        }else{
            res.status(400).send("Not Admin cannot delete product")
        }
    } catch (error) {
        res.status(400).send("Product not deleted successfully", error)
    }
})




router.get('/api/products/search', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        // set number of items per page
        const limit = parseInt(req.query.limit) || 10;
        // num of elements to skip
        const skip = (page - 1) * limit;

        const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .exec()

        const totalProducts = await Product.countDocuments()
        const totalPages = Math.ceil(totalProducts/limit)

        res.json( {
            products, currenPage:page, totalPages, totalProducts
        })

    } catch (error) {

        res.status(500).json({message: error.message});
    }
})


router.post('/api/products/rating/:name', async (req, res) => {
    const { name } = req.params;
    const rate = req.body;
    
    try {
        const findProduct = await Product.find(name);
        if(!findProduct) return res.status(500).send("Product not found");
        if(rate <= 0) res.status(500).send("Rating cannot be less than or equal to 0");
        const product_ratings = findProduct.ratings[rate]
        const sum = list.reduce((acc, current) => acc + current, 0);
        const rate_product = sum / product_ratings.length; 
        findProduct.rating = rate_product
        res.status(200).send('product rated at', rate_product);
    } catch (error) {
        console.log("Could not rate product", error);
    }
})

export default router;





