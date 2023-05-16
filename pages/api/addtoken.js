import Token from "../../models/Token"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    if (req.method == 'POST') {
        let addToken = new Token({
            name:req.body.token,
            email:req.body.email
        })

        if(addToken.save()){
            res.status(200).json({success: true})
        }else{
            res.status(400).json({ success: false })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler)