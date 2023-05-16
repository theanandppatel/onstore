import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let ciphertext = CryptoJS.AES.encrypt(req.body.updateData.password,process.env.SECRET_KEY).toString();
            let user = await Users.findOneAndUpdate({"email":req.body.updateData.oemail},{"email":req.body.updateData.email,"phone":req.body.updateData.phone,"name":req.body.updateData.name,"password":ciphertext})
            let newuser = await Users.findOne({"email":req.body.updateData.email})
            res.status(200).json({success:true,email:newuser.email,phone:newuser.phone,name:newuser.name})
        } catch (error) {
            res.status(400).json({success:false})
        } 
    }
    else{
        res.status(400).json({error:"This method is not allowed"})
    }
}

export default connectDb(handler)