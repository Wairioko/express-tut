import session from 'express-session';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from "./products.mjs";

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

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
