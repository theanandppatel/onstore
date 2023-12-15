import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method == 'POST') {

        for (let index = 0; index < req.body.length; index++) {
            let find = await Product.findOne({ "slug": req.body[index].slug })
            if (!find) {
                let p = new Product({
                    title: req.body[index].title,
                    slug: req.body[index].slug,
                    desc: req.body[index].desc,
                    highlights: req.body[index].highlights,
                    details: req.body[index].details,
                    img: req.body[index].img,
                    category: req.body[index].category,
                    size: req.body[index].size,
                    color: req.body[index].color,
                    price: req.body[index].price,
                    availableQty: req.body[index].availableQty
                })
                await p.save()
            }
            else{
                res.status(400).json({ error: "You Can't add product with same slug" })
            }
        }
        res.status(200).json({ success: "Success" })
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler)