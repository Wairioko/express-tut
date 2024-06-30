import express from "express";
import cookieParser, { signedCookie } from "cookie-parser";
import routes from "./products.mjs"

const app = express();

app.use(express.json());
app.use(cookieParser('secret'));
app.use(routes);

const port = process.env.PORT || 3000

app.listen(port, () => console.log("Listening on port 3000"));


app.get('/', 
    (req, res) => {
        res.cookie("hello", "world", {
            maxAge: 3000000,
            signed:true
        })
        res.status(200).send({msg: "Hello"})

    }
)


