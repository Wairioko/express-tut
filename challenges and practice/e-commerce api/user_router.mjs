import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {User} from "./schema.mjs"
import jwt from 'jsonwebtoken'



const router = express.Router();
const secretKey = 'lalalala'

router.post('/api/users/register', (req, res) => {
    const { username, email, password} = req.body
    const salt_gen = bcrypt.genSaltSync(10)
    const hashed_password = bcrypt.hashSync(password, salt_gen);
    try{
        const new_user = new User(username, email, hashed_password);
        new_user.save();
        res.status(200).send(`User created successfully for: ${new_user.username}`)
    }catch(error){
        res.status(400).send("Error creating profile", error)
    }
    
})




router.post('/api/users/login', (req, res) => {
    const { email, password } = req.params;
    try {
        if(email !== User.email){
            res.status(400).send("This user is not available");
        }else{
            const comparePassword = bcrypt.compareSync(password, User.password);
            if(comparePassword === false){
                res.status(400).send("Wrong Password Entered");
            }else{
                res.status(200).send(`Welcome! ${email}`);
                const token = jwt.sign({_id: User._id}, secretKey, {expiresIn: '1h'});
                res.status(200).send(token)
            }
        }
    } catch (error) {
        res.status(400).send("Error logging in", error)
    }
})











