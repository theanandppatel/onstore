import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler=async (req, res)=> {
    if (req.method == 'POST') {

        let user = await Users.findOne({"email":req.body.email})

        if(user){
            let bytes  = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY)
            let originalPass = bytes.toString(CryptoJS.enc.Utf8);
            
            if(req.body.email == user.email && req.body.password==originalPass){
                let token = jwt.sign({success:true,email:user.email,password:user.password }, process.env.JWT_SECRET,{expiresIn:"45min"});
                res.status(200).json({success:true,token,email:user.email})
            }else{
                res.status(400).json({success:false})
            }
        }else{
            res.status(400).json({success:false})
        }
        
        
    }
    else{
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)