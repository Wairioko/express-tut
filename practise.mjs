
// app.get("/", (req, res) => {
//     res.sendStatus(200).send({
//         msg:"Hello World"
//     })
// })


// app.get("/greet", (req, res) => {
//     const { body, param:{
//         "name" : name,
//     }} = req
//     try {
//         res.sendStatus(200).send(`Hello, ${param.name}`);
//     } catch (error) {
//         res.sendStatus(400).send(error);
//     }
// })

// const loggingMiddleware = (req, res, next) => {
//     console.log(`${req.method} - ${res.method}`);
//     next()
// }

// app.use(loggingMiddleware);


// const notFoundMiddleWare = (req, res, error, next) => {
//     if(error === 404){
//         res.sendStatus(404).send("Page not Found");
//         next()
//     }
// }

// app.use(notFoundMiddleWare)


const users = [
    { "id": 1, "username": "munga", "email": "munga@gmail.com", "password": 123 },
    { "id": 2, "username": "munga1", "email": "munga1@gmail.com", "password": 124 },
    { "id": 3, "username": "munga2", "email": "munga2@gmail.com", "password": 125 },
    { "id": 4, "username": "munga3", "email": "munga3@gmail.com", "password": 126 }
];
const products = [
    { "id": 1, "meat-type": "chicken", "price": 500, "MOQ": "Kg", "Weight": 1 },
    { "id": 2, "meat-type": "beef", "price": 480, "MOQ": "Kg", "Weight": 1 },
    { "id": 3, "meat-type": "mutton", "price": 650, "MOQ": "Kg", "Weight": 1 },
];

// app.get("/users", (req, res) => {
//     try {
//         res.status(200).send(users);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })


// app.get("/users/:id", (req, res) => {
//     const id = req.query;
//     res.status(200).send(`USER ID: ${id}`)
// })


// app.post("/users", (req, res) => {
//     const { body, params:{
//         "name": name,
//         "email": email,
//     }} = req

//     res.status(200).send({
//         "message": "User created Succesfully",
//         "user": {
//             "name": `${name}`,
//             "email": `${email}`
//         }
//     })

// })

// app.get('/products/:id', (req, res) => {
//     const id = req.query;
//     const parsedID = parseInt(id);
//     const findProduct = products.findIndex((product) => product.id === parsedID);
//     if(!findProduct) res.status(404).send("User not found")
//     console.log(findProduct)

// })



// app.use((req, res, next) =>{
//     res.status(500).send(JSON.parse(error))
// })

// import fs from "node:fs"
// import { error } from "node:console";



// app.get("/", fs.readFileSync("./public/index.html", (req, res) => {
//     if (req.url === '/'){
//         res.status(200)
//         res.end()
//     }
//     else{
//         console.log(error)
//     }
// }))

// import { Router } from "express";

// const router = Router();


// router.post(
//     "/users/", (req, res) => {
//         const { username, email } = req.params;
//         res.status(200).send(
//             {
//                 message:"USER CREATED",
//                 user: {
//                     "username": username,
//                     "username": email
//                 }
//             }
//         )

//     }
// )

// router.get("/users", (req, res) => {
//     res.status(200).send(users);
// })


// router.get("/users/:id", (req, res) => {
//     const {id } = req.params;
//     const parsedID = parseInt(id);
//     const findUser = users.find( user => user.id === parsedID)
//     if(!findUser) return res.status(404).send("User not found");
//     res.status(200).send(findUser);

// })

// router.put("/users/:id", (req, res) => {
//     const {id } = req.query;
//     const {email, username} = req.params
//     const parsedID = parseInt(id);
//     const findUser = users.findIndex(user => user.id === parsedID);
//     if(!findUser) return res.status(404).send("User not found");
//     findUser.email = email;
//     findUser.username = username;
//     res.status(200).send(findUser);

// })

// router.delete(
//     "/users/:id", (req, res) => {
//         const {id} = req.query;
//         const parsedID = parseInt(id);
//         const findUser = users.findIndex(user => user.id === parsedID);
//         if(!findUser) return res.status(404).send("User not found");
//         users.splice(users[parsedID], 1)
//         res.status(200).send(users)
//     }
// )



// router.post("/users", (req, res) => {
//     const { email, name } = req.params;
//     if(!email || !email.isString) return res.status(400).send("Missing or wrong format email")
//     if(!name || !name.isString) return res.status(400).send("Missing or wrong format name")
//     res.status(400).send({
//         user:{
//             "email":email,
//             "username": name
//         }
// })      
// })



// router.post("/products/:productId", centralizedErrorHandling ,(req, res) => {
//     const { productId } = req.query;
//     if(!centralizedErrorHandling){
//         if(productId.isString) res.status(400).send("Product cannot be string")
//         const findProduct = products.findIndex((product) => products.productId === product.productId)
//         res.status(200).send(findProduct)
//     }else{
//         res.send(centralizedErrorHandling)
//     }
    
// }
// )


// const centralizedErrorHandling = ("/", (req, res, error ,next) => {
//     if(error){
//         res.status(400).send(error)
//     }
//     next();
// })






// export default router;




import express from "express";
import http from "node:http";



const app = express();


const port = process.env.PORT || 3000;


const LoggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    console.log(new Date.toISOString());
    next();
}

app.use(LoggingMiddleware)

import jwt from "jsonwebtoken"
import router from "./routes/users.mjs";

const secretKey = "mysecretKey"


const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.setHeader({'ContextType': 'text/plain'})
        res.end('Hello, World')
    }else{
        res.end("Invalid route")
    }

})


server.listen(port, () => console.log(`Listening on port ${port}`))



app.get('/api/users/:name', (req, res) => {
    const { name } = req.query;
    if(name.isString()){
        res.status(200).send(`Hello, ${name}`);
    }else{
        res.status(500).send("Invalid name being passed, it should be a string");
    }
})

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url} - ${Date.toString()}`)
})

import fs from "node:fs"
app.use(async (req, res) => {
    if(req.url === '/'){
        res.contentType({'Contentype': 'application/json'})
        fs.readFileSync('/public/text.txt', (data, error) => {
            if(error){
                res.status(400).send("Error reasding file")
            }else{
                res.send(data)
            }
        })
    }
})



app.post('/api/users/', (req, res) => {
    const { data } = req.body;
    const stringData = JSON.stringify(data);
    res.status(200).send(stringData);
})


app.use('/', (err, req, res, next) => {
    next();
    res.status(500).send("Error");  
})


app.get('/:sortCriteria', (req, res) => {
    const {sortCriteria} = req.query;
    if(!sort) return res.status(404).send("Sorting criteria empty")
    const sortedArray = users.sort((user) => users.sortCriteria === sortCriteria);
    res.status(400).send(sortedArray)
})


// import multer from "multer";


// const uploadFile = () => multer.diskStorage({
//     destination: (req, res, cb) =>{
//         cb(null, 'uploads/')
//     },
//     filename: (req, res, cb) => {
//         cb(null, file.originalname)
//     }
// }
// )

// const upload =multer({uploadFile});

// app.post('/upload', upload.single('file'), (req, res) => {
//     res.status(200).send("File uploaded successfully");
// })


// const port = process.env.PORT || 3000;
// const dbUrl = process.env.Database || "http://localhost/27017/express-tut"



// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if(!token) return res.status(401).send("SAccess denied no token presented")
//         try{
//             const decoded = jwt.verify(token, 'secretKey');
//             req.user = decoded;
//             next();
//         }catch (error){
//             res.status(400).send(error)
//         }
// }
// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find((user) => user.email === email);
//     if(!user) return res.status(400).send("No user registered via this email");
//     if(user.password !== password) return res.status(400).send("Wrong Password");
//     const token = jwt.sign({email: user.email}, 'secretKey', {expiresIn:'1h'})
//     res.status(200).send({ token });
// })


// app.get('/profile', (req, res) => {
//     const user =  users.find((user) => user.email === req.user.email)
//     if(!user) return res.status(404).send("User not found");
//     res.status(200).send(user);
// })

// import axios from 'axios'

// router.get('/JSONPlaceholder', async (req, res) => {
//     try{
//         const response = await axios.get("lalala.com");
//         res.status(200).send(response.data);
//     }catch(error){
//         res.status(500).send("Error fethcing data from external API");
//     }
// })




// Task 15: Complex Query Handling
// Create a route that allows filtering users based on their name and email.
//  Implement this in a way that allows partial matching 
// (e.g., searching for "John" should return users with names like "John", "Johnny", etc.).



// router.get('/users', (req, res) => {
//     const { name, email } = res.query;
//     const findUser = users.includes((name) => users.username = name);
//     if(!findUser) return res.status(400).send("User not found");
//     return res.status(200).send(`Found the user(s) ${name}`)
// })


// import WebSocket from "ws";
// import { http } from 'http';

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server })

// router.get('/', (req, res) => {
//     res.status(200).send('home page')
// });




// wss.on('connection', (ws) => {
//     console.log('Client connected');


//     ws.on('message', (message) => {
//         console.log("Received: ", message);
//     });

//     ws.on('close', () => {
//         console.log('client connection ended');
//     });
// });


// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log("Sever started"))




// Task 17: Database Integration (MongoDB)
// Integrate MongoDB into your application using Mongoose. 
// Create models for users and products, and update your routes to interact with the database instead of in-memory data.


// define models

// import mongoose from "mongoose";

// const userModel = new mongoose.Schema(
//     {
//         username : {
//             type: String,
//             required: true,
//             unique: true
//         },
//         email : {
//             type: String,
//             required: true,
//             unique: true
//         },
//         password: {
//             type: String,
//             required: true
//         }
//     }
// );

// mongoose.connect('http://mongodb:localhost/27017/myuserdatabase', { useNewUrlParser: true, useUnifiedTopology: true}, () => {
//     console.log("Connected to MongoDB");
// })


// const User = mongoose.model('User', userModel)



// Challenge 1: JWT (JSON Web Tokens)
// Task: Create an Express middleware to verify a JWT.

// Set up an Express server.
// Create a JWT token using a secret key.
// Implement a middleware function to verify the JWT token and protect a route.





