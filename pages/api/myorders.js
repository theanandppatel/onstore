import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  const userToken = req.body.token;
  const data =jwt.verify(userToken,process.env.JWT_SECRET);
  let userOrders = await Order.find({email:data.email}).sort({ createdAt: -1 });
  res.status(200).json({userOrders});
}

export default connectDb(handler)