import dbConnect from "@/lib/dbConnect";
import verifyJWT from "@/middlewares/verifyJWT";
import Restaurant from "@/models/Restaurant";

export default async function handler(req, res) {
    await dbConnect()
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const restaurants = await Restaurant.find({})
                res.status(200).json({ data: restaurants })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const { userId } = verifyJWT(req.headers.authorization)
                req.body.user = userId
                Restaurant.create(req.body)
                res.status(201).json({ success: true, data: req.body })
            } catch (error) {
                res.status(400).json({ success: false, data: error.message })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}