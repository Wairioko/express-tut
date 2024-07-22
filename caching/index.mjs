import redis from 'redis';
import express from 'express'
// initiate redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 7000
})


const app = express();

redisClient.on('connect', () => console.log("Connected to redis client"));



redisClient.on('error', (error) => console.log("Error starting redis", 
    error.message))



// middleware to check cache 
function cache(req, res, next){
    const {id} = req.params;

    redisClient.get(
        id, (err, data) => {
            if(err) throw err;

            if(data !== null) {
                res.send(data);
            }else{
                next();
            }
        }
    )
}




app.get('/api/data/:id', (req, res) => {
    const { id } = req.params;

    // Simulate a database call
    const data = {
        id: id,
        value: `Data for ID: ${id}`
    };

    // set data to redis
    redisClient.setEx(id, 3600, JSON.stringify(data));

    redisClient.rPush()
    res.send(data);

})


app.listen(3000, () => {
    "Server running on 3000"
})



