import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");

const handler=async (req, res)=> {
    if (req.method == 'POST') {

        let userbyemail = await Users.findOne({"email":req.body.email})
        if(userbyemail){
            res.status(400).json({ success: false })
        }
        let userbyphone = await Users.findOne({"phone":req.body.phone})
        if(userbyphone){
            res.status(400).json({ success: false })
        }
        let ciphertext = CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
        let createUser = new Users({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:ciphertext
        })
        if(createUser.save()){
            res.status(200).json({success: true})
        }else{
            res.status(400).json({ success: false })
        }
        
        
    }
    else{
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)