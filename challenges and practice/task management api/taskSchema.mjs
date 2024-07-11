import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true
        },
        description:{
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
          },

        dueDate:{
            type: String,
        }


    }
)

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
        
    }
})

export const Task = mongoose.model("Task", taskSchema);
export const User = mongoose.model("User", userSchema)
