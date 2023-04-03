import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {

    await dbConnect()
    const { method } = req
    const { email, password } = req.body
    if (method === 'POST') {
        try {
            const user = await User.findOne({ email: email })
            const passwordMatch = bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                res.status(401).json({ success: false, data: "Invalid password" })
                return;
            }
            const payload = { email: user.email, id: user._id }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(201).json({ success: true, data: token })
        } catch (error) {
            res.status(400).json({ success: false, data: error._message })
        }
    } else {
        res.status(400).json({ success: false })
    }
}