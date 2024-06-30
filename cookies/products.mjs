import { Router } from "express";

const router = Router();

router.get('/api/products', (req, res ) => {
    if(req.signedCookies.hello && req.signedCookies.hello  === 'world'){
        console.log(req.headers.cookie);
        console.log(req.signedCookies);
        return res.send([{
            id: 123,
            name: "chicken", 
            price: 500
        }]);
    }
    else{
        res.status(404).send("No Hello Cookie Found")
    }
})

export default router


