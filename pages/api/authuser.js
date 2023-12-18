import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method === 'POST') {
        try {
            const token = req.body.token;
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(401).json({ success: false, message: 'Token has expired' });
                    } else {
                        return res.status(401).json({ success: false, message: 'Invalid token' });
                    }
                } else {
                    let details = JSON.parse(JSON.stringify(decode));
                    Users.findOne({ "email": details.email })
                        .then(async (user) => {
                            if (user) {
                                let decrypttext = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8).length;
                                let { name, phone, email } = user;
                                res.status(200).json({ success: true, name, phone, email, decrypttext });
                            } else {
                                res.status(400).json({ success: false, message: "User Doesn't exist" });
                            }
                        })
                        .catch((error) => {
                            res.status(400).json({ success: false, message: "Some Error Occurred, Try again!" });
                        });
                }
            });
        } catch (error) {
            res.status(400).json({ success: false, message: "Some Error Occurred, Try again!" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
