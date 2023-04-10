import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookie from 'cookie'

export default async function handler(req, res) {

    await dbConnect()
    const { method } = req
    const { email, password } = req.body
    if (method === 'POST') {
        try {
            const user = await User.findOne({ email: email })
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                res.status(401).json({ success: false, data: "Yanlış şifre" })
                return;
            }
            const payload = { email: user.email, id: user._id, userName: user.firstName + " " + user.lastName }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
            // res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
            //     httpOnly: false,
            //     maxAge: 60 * 60 * 24 * 7,
            //     path: "/"
            // }));
            res.status(201).json({ success: true, data: token })
        } catch (error) {
            res.status(400).json({ success: false, data: error._message })
        }
    } else {
        res.status(400).json({ success: false })
    }
}