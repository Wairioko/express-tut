import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },

        isAdmin:{
            type: Boolean,
            default: false
        }


    }
)


const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    price:{
        type: String
    },
    category:{
        type: String
    },
    stock:{
        type: Number,
        default: 0
    },
    ratings: [], 
    rating: {
        type: Number,
        default: 0
    }
})

const OrderSchema = new mongoose.Schema({
    user: UserSchema,
    quantity:{type: Number, default:1},
    products:[ProductSchema._id],
    totalPrice: 0,
    status:{enum:['pending', 'paid', 'shipped', 'delivered'], default:"pending"},
    createdAt:{ 
        type: Date,
        default: Date.now().toString()}
})


export const User = mongoose.model('User', UserSchema);
export const Product = mongoose.model('Product', ProductSchema);
export const Order = mongoose.model('Order', OrderSchema);






