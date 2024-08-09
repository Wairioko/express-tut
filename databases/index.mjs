import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './users.mjs';
import { users } from '../constants.mjs';
import crypto from 'crypto';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Passport Local Strategy
passport.use(new LocalStrategy(
    (username, password, done) => {
        try {
            const findUser = users.find(user => user.username === username);
            if (!findUser) {
                return done(null, false, { message: 'User not found' });
            }
            if (findUser.password !== password) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, findUser);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.username);
});

// Deserialize user from session
passport.deserializeUser((username, done) => {
    const user = users.find(user => user.username === username);
    done(null, user);
});

const app = express();

// Init MongoDB
mongoose.connect('mongodb://localhost:27017/express-tut')
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log(error));


// Define port
const port = process.env.PORT || 3050;

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));

// Configure and use session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 300000 } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Logging middleware
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

app.use(loggingMiddleware);

// Define routes
app.use(routes);

// Root route to set cookie
app.get('/', (req, res) => {
    res.cookie('hello', 'munga', {
        maxAge: 30000,
        signed: true
    });
    console.log('Cookie sent to user/client');
    console.log(req.sessionID);
    console.log(req.session.id);
    req.session.visited = true;
    res.send('Hello world');
});

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    res.status(200).send(req.user);
});

app.get('/api/auth/status', (req, res) => {
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send('User not found');
});

app.post('/api/cart', (req, res) => {
    const { cartItems } = req.body;

    // Check if the user is authenticated
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    // Check if cartItems is defined and is an array
    if (!Array.isArray(cartItems)) {
        return res.status(400).send('Invalid cart items');
    }

    // Generate a random cart ID
    const cartId = crypto.randomBytes(16).toString('hex');

    // Create the user cart object
    const userCart = {
        cartid: cartId,
        'cart-items': cartItems
    };

    // Respond with the user cart object
    res.status(200).send(userCart);
});


app.post("/api/auth/logout", (req, res) => {
    if(!req.user) return res.sendStatus(200)
    req.logout((err) => {
        if(err) return res.sendStatus(400);
        res.send(200);
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`));
