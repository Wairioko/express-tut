const express = require("express");


const app = express();

const port = 3000

app.listen(port, 'localhost', () => console.log("running express server on 3000"))


// define get request

app.get('/breakfast', (req, res) => {
    res.send([{
        "breakfast": ["tea", "smocha", "fruit"]
    }])
})