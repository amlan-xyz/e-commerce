const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    category:String,
    image:String,
    reviews:[
        {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            review: String,
            rating: {
              type: Number,
              min: 0,
              max: 10,
              default: 0,
            }
        }
    ]
},
{
    timestamps: true,
});

const Products=mongoose.model("Products",productsSchema);
module.exports=Products;