import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

// Create the model
export const User = mongoose.model("User", userSchema);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/express-tut", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));

// Create a new user
app.post('/api/user/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(password, salt);
        const new_user = new User({ username, email, password: hashed_password });
        await new_user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a user
app.delete('/api/user/delete/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).send("No user with that email found");
        }
        res.status(200).send(`User deleted successfully: ${email}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a user's username
app.put('/api/user/update/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { new_username } = req.body;
        const user = await User.findOneAndUpdate({ email }, { username: new_username }, { new: true });
        if (!user) {
            return res.status(404).send("No user with that email found");
        }
        res.status(200).send(`User username updated successfully for ${email}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




import jwt from "jsonwebtoken"

import { Router } from 'express';
import { users } from './constants.mjs';

const router = Router;


router.post('/api/users/create', async (req, res) => {
    const {username, password} = req.body;
    jwt.sign(username, "secret", "none")
    const user = {"username": username, "password":password}
    await user.save()
});

router.get('/api/users/login', (req, res) => {
    const {username, password} = req.query;
    if (!jwt.decode(username)) return res.status(500).send("user not verified")
    const findUser = users.find((user) => user.username === username);
    if(!findUser) return res.status(400).send("User not found");
    if(findUser.password === password){
        return res.status(200).send(`welcome ${username}`)
    }else{
        return res.status(500).send("wrong password")
    }
})




import rateLimit from 'express-rate-limit';

app.use(express.json());


const apiLimiter = rateLimit({
    windowMs: 15* 60* 1000,
    max: 100,
    message:" Too many requests from this api, Contact dev to increase rate limit"

})

app.use("/api", apiLimiter)

// Caching:
// Implement a caching mechanism using Redis for a route that 
// fetches data from an external API or database.


// first we create the redis client

import redis from 'redis';


const redisClient = redis.createClient({
    host: 'localhost',
    port: 4000,
    // legacy mode for using callbacks
    legacyMode: true, 
})


redisClient.on('error', (err) =>{
    console.log('reddis error', err);
})


await redisClient.connect();

export default redisClient;

// create route to fetch data from api and cache using redis

const apiUrl = 'some http'

const cacheMiddleWare = async (req, res, next) => {
    const { id } = req.params;
    const cachedData = await redisClient.get(`data${id}`)
    if (cachedData) {
        return res.status(200).send(JSON.parse(cachedData));
    } else {
        next();
    }
}


router.get('/api/users/data/:id', cacheMiddleWare ,async (req, res) => {
    try{
        const { id } = req.params;
        const response = await axios.get(`${API_URL}/${id}`);
        const data = response.data;

        await redisClient.setEx(`data:${id}`, 3600, JSON.stringify(data));

        res.status(200).send(data);

    }catch (error){

        res.status(500).send("Error fecthing data");

    }
})


app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});