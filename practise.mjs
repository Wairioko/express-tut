
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


const app = express();

const port = process.env.PORT || 3000;


const LoggingMiddleware = (req, res, next) => {

    console.log(`${req.method} - ${req.url}`)
    console.log(Date.now());
    next();
}

app.use(LoggingMiddleware)

import jwt from "jsonwebtoken"


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    for (let index = 0; index < users.length; index++) {
        const user = users[index]
        if (user.email=== email){
            if(!user.password === password)return res.status(400).send("Wrong Password")
            res.status(200).send(`Welcome back ${user.email}`)
        }else{
            res.status(404).send("Email not found")
        }       
    }
})


app.get('/profile', (req, res) => {
    const { email, password} = req.query;
    for (let index=0; index < users.length; index++){
        if(jwt.decode())
    }

})







