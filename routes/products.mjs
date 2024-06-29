// import express, validator functions, products from constants file

import { Router } from "express";
import { query, validationResult } from "express-validator";
import { products } from "../constants.mjs";

// init router
const productRouter = Router();
const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}

app.use(loggingMiddleWare);

productRouter.get('/api/products'   
    ,(req, res) => {
        const errors = validationResult(query);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { filter, value } = req.query;

        if (!filter || !value) {
            return res.status(200).send(products);
        }
    
        const filteredProduct = products.filter(product => product[filter] && product[filter].includes(value));
        return res.status(200).send(filteredProduct);

})

export default productRouter;



