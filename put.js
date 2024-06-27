const express = require("express");

// Initialize the express app
const app = express();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Init put method
app.put("/api/users/:id", (req, res) => {
    // Deconstruct the body and parameters passed in request object
    const { body, params: { id } } = req;
    // Convert id to int as it is in string
    const parsedId = parseInt(id);
    // Check if userid integer is correct
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    // Find the user by index
    const find_user_index = users.findIndex(
        (user) => user.id === parsedId
    );
    // If user not found give error
    if (find_user_index === -1) {
        return res.sendStatus(404);
    }

    users[find_user_index] = { id: parsedId, ...body };
    return res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`);
});
