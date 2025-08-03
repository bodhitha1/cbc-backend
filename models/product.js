import mongoose from "mongoose";

const productScheme = mongoose.Schema (

    {
        productID:{            
            type : String,
            required :true,
            unique : true
        },
        name :{
            type : String,
            required : true
        },
        altName: {
            type : [String],
            required : true,
            default:[]
        },
        description :{
            type : String,
            required : true, 
        },
        Image :{
            type : [String],
            required : true,
            default : []
        },
        price :{
            type : Number,
            required : true
        },
        lablePrice :{
            type : Number,
            required : true
        },
        category :{
            type : String,
            required : true
        },


    }
)
const Product = mongoose.model("product", productScheme);

export default Product
