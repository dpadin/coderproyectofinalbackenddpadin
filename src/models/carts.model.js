import { model, Schema } from "mongoose";


const cartCollections = 'carts';
 
const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "products" }, // Reference to Product
            quantity: { type: Number, default: 1 } // Quantity of product in the cart
        }
    ]
 
})

export const cartModel = model(cartCollections, cartSchema)