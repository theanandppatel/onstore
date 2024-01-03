import connectDb from "../../middleware/mongoose"
const Razorpay = require("razorpay");
const shortid = require("shortid");
import Order from '../../models/Order'
import Product from "../../models/Product";
const crypto = require('crypto');

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const sign= req.body.OrderId +"|"+ req.body.paymentId
            
            const generated_signature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex")

            if(generated_signature != req.body.razorpaySign){
                res.status(500).json({success:false})
                return
            }else{
            let instance = await new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
            let info = await instance.orders.fetchPayments(req.body.OrderId)
            let payInfo = {
                paymentid: info.items[0].id,
                status: info.items[0].status,
                method: info.items[0].method,
                cardId: info.items[0].card_id,
                bank: info.items[0].bank,
                wallet: info.items[0].wallet,
                transactionInfo: info.items[0].acquirer_data,
            }
            let order = await Order.findOneAndUpdate({ razorOrderId: req.body.OrderId }, { status: 'Paid', paymentInfo: payInfo })

            let products = order.products
            for (let slug in products) {
                await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": -products[slug].qty } })
            }
            res.status(200).json({ success: true })}
        }
        catch (error) {
            res.status(400).json({ error })
        }
    }

    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler)