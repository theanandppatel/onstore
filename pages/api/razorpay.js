import connectDb from "../../middleware/mongoose"
const Razorpay = require("razorpay");
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
      if(productInfo.availableQty<cart[item].qty){
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
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const partial_payment = 1;
    const amount = req.body.fAmt;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      partial_payment
    };

    try {
      //Initiate an Order
      const response = await razorpay.orders.create(options);
      let order = new Order({
        orderId :req.body.orderId,
        paymentMethod : req.body.paymentMethod,
        razorOrderId : response.id,
        email: req.body.email,
        products: req.body.cart,
        deliveryinfo: req.body.deliveryinfo,
        bcharge: req.body.subTotal,
        amount: req.body.fAmt
      })
      await order.save()
      res.status(200).json({
        success: true,
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).json({ error: "error" })
  }
}

export default connectDb(handler)