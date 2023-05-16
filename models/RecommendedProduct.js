const mongoose = require('mongoose');


const RecommendedProductSchema = new mongoose.Schema({
    title: {type:String,required:true},
    slug: {type:String,required:true,unique:true},
    desc: {type:String,required:true},
    highlights: [{
        type: String
    }],
    details: {type:String},
    img: [{
        type: String,
        required: true
    }],
    category: {type:String,required:true},
    size: {type:String},
    color: {type:String},
    price: {type:Number},
    availableQty: {type:Number,required:true}
},{timestamps:true});

export default mongoose.models.RecommendedProduct || mongoose.model("RecommendedProduct",RecommendedProductSchema);