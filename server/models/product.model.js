import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    image : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],
    unit : {
        type : String,
        default : ""
    },
    stock : {
        type : Number,
        default : null
    },
    price : {
        type : Number,
        defualt : null
    },
    discount : {
        type : Number,
        default : null
    },
    pricePerKilo : {
        type : String,
        default : ""
    },
    deliveryTime : {
        type : String,
        default : ""
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
        type : Object,
        default : {}
    },
    publish : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
})

// create a text index with weights so $text queries work efficiently
// Note: the second argument must use the 'weights' option to assign importance to fields
productSchema.index({
    name: 'text',
    description: 'text'
}, {
    weights: {
        name: 10,
        description: 5
    }
})


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel