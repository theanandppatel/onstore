// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincodes from '../../pincodes.json'
export default async function handler(req, res) {

  if (req.method == 'POST') {
    const getpindetail = await fetch(`https://api.postalpincode.in/pincode/${req.body.pincode}`)
    const senddetail = await getpindetail.json()
    res.status(200).json({senddetail})
  }else{
    res.status(400).json({error:"This Method is not allowed"})
  }
  
}