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
    {"meat-type":"chicken", "price": 500, "MOQ": "Kg", "Weight": 1},
    {"meat-type":"beef", "price": 480, "MOQ": "Kg", "Weight": 1},
    {"meat-type":"mutton", "price": 650, "MOQ": "Kg", "Weight": 1},
]

// query parameters
app.get("/api/users/", (request, response) => {
    // destructure query string from request, 
    // gets the filter criteria and value passed
    const {query: {filter, value}} = request;
    console.log(request.query);

    if(!filter && !value) return response.sendStatus(404).send("User not found");

    if (filter && value) {
        const filteredUsers = users.filter(user => user[filter] && user[filter].includes(value));
        return response.status(200).send(filteredUsers);
    }
    
})


app.get("/api/products", (request, response) => {
    const {query: {filter, value}} = request;
    if (!filter && !value) 
        return response.sendStatus(404).send("Meat Product not found");

    if (filter && value) {
        const filteredProduct = products.filter(product => product[filter] && product[filter].includes(value));
        return response.status(200).send(filteredProduct);
    }
    
})

app.post("/api/users", (request, response) => {
    const parseData = request.
    console.log(request.body);
    return response.send(200);

})


app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})