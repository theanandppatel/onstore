import connectDb from "../../middleware/mongoose"
import Product from '../../models/Product';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {

        const sQuery = req.body.query.toLowerCase();

         const res1 = await Product.find({})

         const result = res1.filter((product)=>{
            return ((sQuery && product && product.title && product.title.toLowerCase().includes(sQuery)) || (sQuery && product && product.desc && product.desc.toLowerCase().includes(sQuery)) || (sQuery && product && product.desc && product.desc.toLowerCase().includes(sQuery)) || (sQuery && product && product.category && product.category.replace('-', ' ').
            toLowerCase().includes(sQuery)));
         })
         res.status(200).json(result)
        } catch (error) {
            res.status(400).json({success:false,message:"Internal server error"})
        }
        

    }else{
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler)