import { Router} from "express";

const router = Router();


router.get('/api/products', (req, res) => {
    if (req.signedCookies.hello && 
        req.signedCookies.hello === "munga"){
            req.sessionStore.get(req.session.id, (err, sessionData) => {
                if(err){
                    throw err
                }else{
                    console.log(sessionData);

                }
            })
            console.log(req.headers.cookie);
            console.log(req.signedCookies);
            return res.status(200).send([{
                "name": "chicken",
                "weight": "1kg",
                "price": 500
            }])
        }else{
            res.status(401).send("No cookies found")
        }
})


export default router
