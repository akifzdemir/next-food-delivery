import dbConnect from "@/lib/dbConnect";
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
                Order.create(req.body)
                res.status(201).json({ success: true, data: req.body })
            } catch (error) {
                res.status(400).json({ success: false })
            }
        default:
            res.status(400).json({ success: false })
            break;
    }
}