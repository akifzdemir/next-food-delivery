import dbConnect from "@/lib/dbConnect";
import verifyJWT from "@/middlewares/verifyJWT";
import Order from "@/models/Order";

export default async function handler(req, res) {
    await dbConnect()
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const orders = await Order.find({})
                res.status(200).json({ data: orders })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const userId = await verifyJWT(req.headers.authorization)
                req.body[0].user = userId
                console.log(req.body)
                Order.create(req.body)
                res.status(201).json({ success: true, data: req.body })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}