import connectDb from "../../middleware/mongoose"
const shortid = require("shortid");
import Order from '../../models/Order'
import Product from "../../models/Product";

const handler = async (req, res) => {
    if (req.method === "POST") {

        let productInfo, subAmount = 0
        let cart = req.body.cart
        for (let item in cart) {
            productInfo = await Product.findOne({ slug: item })
            subAmount += productInfo.price * cart[item].qty
            if (productInfo.availableQty < cart[item].qty) {
                res.status(400).json({ success: false, error: "Some items in your cart are currently out of stock, Please try again after some time!" })
                return
            }
            if (productInfo.price != cart[item].price) {
                res.status(400).json({ success: false, error: "Some error occured in your cart  Please try again!" })
                return
            }
        }

        if (subAmount != req.body.subTotal) {
            res.status(400).json({ success: false, error: "Some error occured in your cart  Please try again!" })
            return
        }


        try {
            //Initiate an Order
            let order = new Order({
                orderId: req.body.orderId,
                paymentMethod: req.body.paymentMethod,
                email: req.body.email,
                products: req.body.cart,
                deliveryinfo: req.body.deliveryinfo,
                bcharge: req.body.subTotal,
                amount: req.body.fAmt
            })
            await order.save()

            let products = order.products
            for (let slug in products) {
                await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": -products[slug].qty } })
            }
            res.status(200).json({
                success: true
            });
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler)