import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {
            const decode = jwt.verify(req.body.token, process.env.JWT_SECRET);
            let details = JSON.parse(JSON.stringify(decode))
            let user = await Users.findOne({"email":details.email})
            if(user){
                let decrypttext = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8).length;
                let name = user.name,phone = user.phone,email = user.email
                res.status(200).json({success:true,name,phone,email,decrypttext})
            }else{
                res.status(400).json({success:false})
            }
            
        } catch (error) {
            res.status(400).json({success:false})
        }
        
    }else{
        res.status(400).json({error:"This method is not allowed"})
    }
}
export default connectDb(handler)