import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from "./products.mjs";
import { users } from '../constants.mjs';
import { v4 as uuidv4, v4 } from 'uuid';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import passport from 'passport';

const app = express();

// Define port
const port = process.env.PORT || 3050;

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

// Configure and use session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 300000 } // Set to true if using HTTPS
}));

// Logging middleware
const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

app.use(loggingMiddleWare);

// import passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use(routes);

// Root route to set cookie
app.get('/', (req, res) => {
    res.cookie("hello", "munga", {
        maxAge: 30000,
        signed: true
    });
    console.log("Cookie sent to user/client");
    console.log(req.sessionID);
    console.log(req.session.id);
    req.session.visited = true;
    res.send("Hello world");
});

app.post('/api/auth/', (req, res) => {
    const { body: { username, password } } = req;
    const findUser = users.find((user) => user.username === username);
    if (!findUser || findUser.password !== password) return res.status(401).send("Wrong Password");
    req.session.user = findUser;
    return res.status(200).send(findUser);
});

app.get('/api/auth/status', (req, res) => {
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send("User not found");
});

app.post('/api/cart', (req, res) => {
    const { cartItems } = req.body;

    // Check if the user is authenticated
    if (!req.session.user) {
        return res.status(401).send("Unauthorized");
    }

    // Check if cartItems is defined and is an array
    if (!Array.isArray(cartItems)) {
        return res.status(400).send("Invalid cart items");
    }

    // Generate a random cart ID
    const cartId = crypto.randomBytes(16).toString("hex");

    // Create the user cart object
    const userCart = {
        cartid: cartId,
        'cart-items': cartItems
    };

    // Respond with the user cart object
    res.status(200).send(userCart);
});
