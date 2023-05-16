const mongoose = require('mongoose');


const FeaturedProductSchema = new mongoose.Schema({
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

export default mongoose.models.FeaturedProduct || mongoose.model("FeaturedProduct",FeaturedProductSchema);