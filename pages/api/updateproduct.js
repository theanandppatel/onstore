import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    if (req.method == 'POST') {

        for (let index = 0; index < req.body.length; index++) {
            let p = await Product.findByIdAndUpdate(req.body[index]._id,req.body[index])
        }
        res.status(200).json({ success: "Success" })
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }
    
}
export default connectDb(handler)