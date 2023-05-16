import Token from "../../models/Token"
import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    if (req.method == 'POST') {
        let token = await Token.findOne({"token":req.body.token})

        if(token){
            let user = await Users.findOne({"email":token.email})
            res.status(200).json({success:true,useremail:user.email,token:req.body.token})
        }else{
            res.status(400).json({success:false})
        }
    }else{
        res.status(400).json({success:false,error:"This method is not allowed"})
    }
}
export default connectDb(handler)