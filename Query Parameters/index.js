const express = require("express");


const app = express();


const PORT = process.env.PORT || 3000;

const users = [
    {"id": 1, "username": "munga", "email": "munga@gmail.com"},
    {"id": 2, "username": "munga1", "email": "munga1@gmail.com"},
    {"id": 3, "username": "munga2", "email": "munga2@gmail.com"},
    {"id": 4, "username": "munga3", "email": "munga3@gmail.com"}
]

const products = [
    {"name":"chicken", "price": 500, "MOQ": "Kg", "Weight": 1},
    {"name":"beef", "price": 480, "MOQ": "Kg", "Weight": 1},
    {"name":"mutton", "price": 650, "MOQ": "Kg", "Weight": 1},
]

// illustration of route paramater
app.get("/api/users/:id",  (request, response) => {
    // prints the id param passed in the url by user to console
    console.log(request.params)
    // we get an object eg. { id: '2' } 2 is in string so we need to 
    // convert to int
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId))
        return response.sendStatus(400).send(
        { msg: "Bad Request. Invalid Parameter"});

    const find_user = users.findIndex((user) => user.id === parsedId )
    if (find_user === true) {
        console.log(find_user.email);
        response.send(find_user.email);
    }
    if (!find_user) return response.sendStatus(404).send(
        {msg: "User not found"}
    )
})



app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})