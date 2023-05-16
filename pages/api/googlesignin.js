import Users from "../../models/Users"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {

        let user = await Users.findOne({ "email": req.body.email })

        if (user) {
                let token = jwt.sign({ success: true, email: user.email, password: user.password }, process.env.JWT_SECRET, { expiresIn: "1d" });
                res.status(200).json({ success: true, token, email: user.email })
            
        } else {

            let ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
            let createUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: ciphertext
            })
            if (createUser.save()) {
                let token = jwt.sign({ success: true, email: req.body.email, password: req.body.password }, process.env.JWT_SECRET, { expiresIn: "1d" });
                res.status(200).json({ success: true, token, email: req.body.email })
            } else {
                res.status(400).json({ success: false })
            }
        }


    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)