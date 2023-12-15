import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {
            const token = req.body.token;
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the token has expired

            if (decode && decode.exp && Date.now() >= decode.exp * 1000) {
                localStorage.removeItem('myuser');
                return res.status(401).json({ success: false, message: 'Token has expired' });
            }

            let details = JSON.parse(JSON.stringify(decode))
            let user = await Users.findOne({"email":details.email})
            if(user){
                let decrypttext = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8).length;
                let name = user.name,phone = user.phone,email = user.email
                res.status(200).json({success:true,name,phone,email,decrypttext})
            }else{
                res.status(400).json({success:false, message: "User Doesn't exist"})
            }
            
        } catch (error) {
            res.status(400).json({success:false, message: "Some Error Occured, Try again!"})
        }
        
    }else{
        res.status(400).json({error:"This method is not allowed"})
    }
}
export default connectDb(handler)