const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    token: {type:String,required:true},
    email: {type:String,required:true},
},{timestamps:true});

export default mongoose.models.Token || mongoose.model("Token",TokenSchema);