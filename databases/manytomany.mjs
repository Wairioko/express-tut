
import { ref } from "joi";
import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const User =  mongoose.model('User', UserSchema);


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, maxlength: 100, 
        index: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    timestamps: true
});



const Product = mongoose.model('Product', productSchema);


const orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number}
});

const Order = mongoose.model('Order', orderSchema);


const ReviewSchema = mongoose.Schema({
    rating:{type: Number, required: true, min:1, max:5},
    content:{type:String, required: true},
    user : {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})


const Review = mongoose.model("Review", ReviewSchema);

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  });
  
  const CartItem = mongoose.model('CartItem', cartItemSchema);
  
  const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
  });
  
  const Cart = mongoose.model('Cart', cartSchema);


const productImage = mongoose.Schema({
    product:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    imageurl: {type: String},
    type: { type: String, enum: ['thumbnail', 'main', 'other']}
})











