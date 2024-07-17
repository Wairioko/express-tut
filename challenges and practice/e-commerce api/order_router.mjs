import express from "express";
import jwt from 'jsonwebtoken';
import { Order, Product, User } from "./schema.mjs";




const router = express.Router();
const secretKey = 'lalalala'
const stripe_key = 'pk_test_51PdZCDEpEEy16uzEJU7naSjhHp2EO49gu4dm56No'
'SodMMEiM1YQWvON4qLjwhwXTNqiizaaQJCh8i6mV6kMwg3i100dAswGRqN'


const verifyToken = async (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(400).send("USER NOT LOGGED IN");
    }
    try {
        const tokenVerified = await jwt.verify(token, secretKey);
        req.user = tokenVerified;
        res.status(200).send("User logged in")
        next();
    }catch(error){
        res.status(400).send("Unable to verify token")
    }
}



router.post('/api/orders/create-order', verifyToken, async (req, res) => {
    const { user, products, totalPrice, status } = req.body;
    try {
        const newOrder = await new Order({user: User._id, products, 
            totalPrice, status });
        if(products['quantity'] > Product.stock){
            res.status(400).send(`Not enough quantities in stock. Place equal to or under ${Product.stock}`)
        }
        newOrder.save();
        res.status(200).send("New order created", newOrder);
        
    } catch (error) {        
        res.status(400).send("Failed to create a new order", error)
    }

});



router.get('/api/orders', async (req, res) => {
    if(!User.isAdmin){
        res.status(400).send("User not admin!")
    }
    try {
        const orders = Order.findAll();
        res.status(200).send(orders)
        
    } catch (error) {
        res.status(400).send("Cannot fetch orders", error);
    }
});


router.get('/api/orders/:id', verifyToken,async (req, res) => {
    const { id } = req.params;
    const parsedID = parseInt(id);
    if(!parsedID) return res.status(400).send("Invalid id passed")
    try {
        if(User._id === Order.user){
        const findOrder = Order.findById(parsedID);
        res.status(200).send("Order found", findOrder);
        }else{
            res.status(400).send("No order found for this",
                 "user,matching the given id")
        }
        
    } catch (error) {
        res.status(200).send("cannot find order: ", error);
    }
    
});



router.put('/api/orders/update/:id', verifyToken, async(req, res) => {
    const {id} = req.params;
    const { status } = req.body;
    const parsedID = parseInt(id);
    if(!parsedID) return res.status(400).send("Invalid id passed")
    try {
        if(User._id === Order.user){
        const updateOrderStatus = Order.findByIdAndUpdate(parsedID, {status: status});
        res.status(200).send("Order updated Successfully", updateOrderStatus);
        }else{
            res.status(400).send("No order found for this",
                 "user,matching the given id")
        }
        
    } catch (error) {
        res.status(200).send("cannot find order: ", error);
    }
});



export default router;













