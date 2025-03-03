import { model, Schema } from "mongoose";
import mongoosepagintev2 from "mongoose-paginate-v2"

const productCollections = 'products';

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status:{
        type: Boolean,
        default: true,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true       
    },
    thumbnails:{
        type: Array,

    }


})

productSchema.plugin (mongoosepagintev2)

export const ProductModel = model(productCollections, productSchema)