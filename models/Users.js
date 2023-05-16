const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    phone : {type:Number,sparse:true},
    password: {type:String,required:true}
  },{timestamps:true});

  export default mongoose.models.Users || mongoose.model("Users",UserSchema);