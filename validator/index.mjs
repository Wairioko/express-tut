import express from 'express';
import { query, validationResult, param, body, checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils/validation-schema.mjs';
import userRouter from '../routes/users.mjs'
import productRouter from '../routes/products.mjs';

// Initialize the express app
const app = express();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(productRouter)

const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

app.use(loggingMiddleWare);

// Define port
const PORT = process.env.PORT || 3000;

// List of users
const users = [
    { "id": 1, "username": "munga", "email": "munga@gmail.com" },
    { "id": 2, "username": "munga1", "email": "munga1@gmail.com" },
    { "id": 3, "username": "munga2", "email": "munga2@gmail.com" },
    { "id": 4, "username": "munga3", "email": "munga3@gmail.com" }
];

// List of products
const products = [
    { "meat-type": "chicken", "price": 500, "MOQ": "Kg", "Weight": 1 },
    { "meat-type": "beef", "price": 480, "MOQ": "Kg", "Weight": 1 },
    { "meat-type": "mutton", "price": 650, "MOQ": "Kg", "Weight": 1 },
];

app.delete("/api/users/:id",
    param("id").isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const parsedId = parseInt(id);
        const userIndex = users.findIndex(user => user.id === parsedId);

        if (userIndex === -1) {
            return res.sendStatus(404);
        }

        users.splice(userIndex , 1);
        return res.status(200).send(users);
    }
);

app.post("/api/users/",checkSchema(createUserValidationSchema) ,
     (req, res) => {
        const result = validationResult(req);
        console.log(result);
        const { body } = req;
        const newUser = {id: users[users.length - 1].id + 1, ...body};
        users.push(newUser);
        console.log(newUser);
        return res.status(201).send(newUser)
    }

);

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`);
});
