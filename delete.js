const express = require('express');

// init app
const app = express();

// init middleware
app.use(express.json());
app.use(express.urlencoded());

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


app.get('/api/users', (req, res) => {
    return res.send(users)
    
})


app.delete("/api/users/:id", (req, res) => {
    // decon body and parameter id from req object
    const { body, params: {id}} = req;
    // convert id to int, currently string
    const parsedId = parseInt(id);
    // check if id is valid
    if (parsedId === isNaN) return res.send(201)
    // check for id in users list
    const find_user_index = users.findIndex(
        (user) => user.id === parsedId
    )
    if (find_user_index === -1) return res.send(404);
    users.pop(users[find_user_index])

    return res.send(users)

})


app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`);
});
