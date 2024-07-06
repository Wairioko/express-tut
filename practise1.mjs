import express from "express";
import routes from "./practise.mjs"


const app = express();
app.use(routes)


const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server started and listening"))




