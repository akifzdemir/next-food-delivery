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
                res.status(400).json({ success: false, data: 'Email zaten kayıtlı.' })
                return;
            }
            const salt = await bycrpt.genSalt(10)
            const hash = await bycrpt.hash(req.body.password, salt)
            body.password = hash
            await User.create(body)
            res.status(201).json({ success: true, data: "Kayıt Başarılı" })
        } catch (error) {

            console.log(error)
            res.status(400).json({ success: false, data: error })
        }
    } else {
        res.status(400).json({ success: false })
    }

}

