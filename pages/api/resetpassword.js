import Users from "../../models/Users"
import Token from "../../models/Token"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let ciphertext = CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
            let user = await  Users.findOneAndUpdate({"email":req.body.email},{"password":ciphertext})
            let token = await Token.findOne({"token":req.body.token})
            token.remove()
            res.status(200).json({success:true,message:"Password reseted successfully"})
        } catch (error) {
            res.status(400).json({success:false,message:"Internal server error"})
        }
        

    }else{
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler)