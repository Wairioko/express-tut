import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
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
            Boolean: false
        }


    }
)


const ProductSchema = mongoose.Schema({
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
        number: 0
    },
    ratings: [], 
    rating: {
        number: 0
    }
})

const OrderSchema = mongoose.Schema({
    user: User,
    products:[Product._id, quantity],
    totalPrice: 0,
    status:{enum:['pending', 'paid', 'shipped', 'delivered'], default:"pending"},
    createdAt:{ default: Date.now().toString()}
})


export const User = mongoose.model('User', UserSchema);
export const Product = mongoose.model('Product', ProductSchema);
export const Order = mongoose.model('Order', OrderSchema);






