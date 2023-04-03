import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from 'jsonwebtoken'
import bycrpt from 'bcrypt'

export default async function handler(req, res) {

    await dbConnect()
    const { method } = req
    const body = req.body
    if (method === 'POST') {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                res.status(400).json({ success: false, data: 'Email already exist.' })
                return;
            }
            const salt = await bycrpt.genSalt(10)
            const hash = await bycrpt.hash(req.body.password, salt)
            body.password = hash
            const newUser = await User.create(body)

            const payload = { email: newUser.email, id: newUser._id }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(201).json({ success: true, data: token })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    } else {
        res.status(400).json({ success: false })
    }

}