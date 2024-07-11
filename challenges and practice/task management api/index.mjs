import express from "express";
import mongoose from "mongoose";
import { Task, User } from "./taskSchema.mjs";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

// {"title": "nodeeee","description": "becoooome a backend dev", "dueDate":"30/09/2024"}

// init express app
const app = express();
app.use(express.json());

// define port
const port = process.env.PORT || 3050;

// define secret to sign jwt
const jwtSecret = "lalalala"

// connect to db
mongoose.connect("mongodb://localhost:27017/express-tut")
.then(() => console.log('Connected to DB successfully'))
.catch((err) => console.log("Error connecting to db", err))

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
})


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        res.status(400).send("Access denied No authorization token found");
    }
    try {
        const decoded = jwt.decode(token, jwtSecret);
        req.user = decoded;
        next;
    } catch (error) {
        res.status(400).send(error)
    }
}
app.post('/api/user/create', async (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if password is provided
    if (!password) {
        return res.status(400).send({ error: "Password is required" });
    }

    // Hash the password
    const genSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, genSalt);
    
    // Create a new user with the hashed password
    const newUser = new User({
        username,
        email,
        password: hashedPassword  // Make sure the field name is `password`
    });

    try {
        await newUser.save();
        res.status(200).send("New User Created");
    } catch (error) {
        res.status(400).send(error);
    }
});


app.post('/api/user/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User with this email not found");
        }
        
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        
        if (isPasswordValid) {
            const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
            return res.status(200).send({ token });
        } else {
            return res.status(400).send("Wrong Password");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});



app.post('/api/task/create', verifyToken, async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    if (!title) return res.status(400).send("Title required");
    const newTask = new Task({ title, description, dueDate, status });
    try {
        await newTask.save();
        res.status(201).send(`New Task Created: ${JSON.stringify(newTask)}`);
    } catch (error) {
        res.status(500).send(`Error saving new task: ${error.message}`);
    }
});


// GET /tasks: Get all tasks
app.get('/api/tasks', verifyToken ,async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



// get tasks with pagination
app.get('tasks/page', async(req, res) => {

    try{
        // get current page
        const page = parseInt(req.query.page) || 1;
        // set number of items per page
        const limit = parseInt(req.query.limit) || 10;
        // num of elements to skip
        const skip = (page - 1) * limit;

        const tasks = await Task.find()
        .skip(skip)
        .limit(limit)
        .exec()

        const totalTasks =  await Task.countDocuments()
        const totalPages = Math.ceil(totalTasks/limit)

        res.json({
            tasks, currentPage:page, totalPages, totalTasks
        });
    
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

// get tasks by id
app.get('/api/task/:id', async (req, res) => {
    try {
        const findTask = await Task.findById(req.params.id);
        if(!findTask) return res.status(500).send("Task not found");
        res.json(findTask);
    } catch (error) {
        res.status(500).send({message: error.message})
    }

})


app.put('api/task/update/:id', verifyToken, async (req, res) => {
    try {
      const { title, description, status, dueDate } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status, dueDate },
        { new: true, runValidators: true }
      );
      if (!updatedTask) return res.status(404).json({ message: "Task not found" });
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

app.delete('/api/task/delete/:id', verifyToken ,async (req, res) => {    
    try {
        const deleteTask = await Task.findOneAndDelete(req.params.id)
        if (!deleteTask) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).send("Error deleting details", error)
    }
    
})




app.listen(port, () => console.log("Server listening for connections"))






