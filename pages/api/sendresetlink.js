import Users from "../../models/Users";
import Token from "../../models/Token";
import connectDb from "../../middleware/mongoose";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await Users.findOne({ email: req.body.email });

      if (user) {
        let token = await Token.findOne({ email: req.body.email });
        if (!token) {
          token = await new Token({
            email: req.body.email,
            token: jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            }),
          }).save();
        }
        const url = `${process.env.NEXT_PUBLIC_HOST}/resetpassword?resettoken=${token.token}`;
        let transporter = nodemailer.createTransport({
          service: "​gmail",
          port: 587,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
          },
        });

        //​Create the message object​
        let message = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Onstore reset password request",
          html: `
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                      <a href="https://onstore.vercel.app" title="onstore-logo" target="_blank">
                                        <img width="60" src="https://res.cloudinary.com/dgagdyxyy/image/upload/f_auto,q_auto/gpod1wvczslirfu2fa9w" title="onstore-logo" alt="onstore-logo" style="width: 215px; height:100px;">
                                      </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                        requested to reset your password</h1>
                                                    <span
                                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                        We cannot simply send you your old password. A unique link to reset your
                                                        password has been generated for you. To reset your password, click the
                                                        following link and follow the instructions.
                                                    </p>
                                                    <a href="${url}"
                                                        style="background:#5280E1;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                        Password</a>
                                                        <br> <br>
                                                        <p>This password reset link will expire in 24 hours.</p> <br>
                                                    <p>Or copy and paste the url into your browser:&nbsp;
                                                    ${url}</p>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>onstore.vercel.app</strong></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>`,
          //​ html: "<p>HTML version of the message</p>"​
        };

        //​Send mail​
        await transporter.sendMail(message, (err) => {
          if (err) {
            success = false;
            res
              .status(400)
              .json({
                success: false,
                message: "There is Some Error occured to sent a email",
              });
          } else {
            res
              .status(200)
              .json({
                success: true,
                message: "Reset link successfully sent to your email",
              });
            return;
          }
        });
      } else {
        res
          .status(400)
          .json({
            success: false,
            message: "User with given email does not exist",
          });
      }
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Some error occured, Try again!" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
