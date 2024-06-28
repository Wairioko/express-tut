const express = require("express");


const app = express();

const port = 3000


// init middleware

app.use(express.json());
app.use(express.urlencoded());


app.listen(port, 'localhost', () => console.log("running express server on 3000"))

const meals = [{
    "breakfast": ["tea", "smocha", "fruit"]
}]
// define get request from user, senf the meals
app.get('/breakfast' ,
    (req, res, next) => {
    console.log("before handling request");
    next()
    }, 
    (req, res) => {
        res.send(meals)
    }
);


// post request from user get the meals they have passed
app.post("/breakfast", (req, res) => {
    console.log(req.body);
    meals.push(request.body)
    res.sendStatus(201);
});
