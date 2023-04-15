import dbConnect from "@/lib/dbConnect"
import Order from "@/models/Order"


export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const order = await Order.findById(id)
                if (!order) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: Order })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT':
            try {
                const userId = await verifyJWT(req.headers.authorization)
                req.body.user = userId
                const order = await Order.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!order) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: Order })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE':
            try {
                const userId = await verifyJWT(req.headers.authorization)
                req.body.user = userId
                const deletedOrder = await Order.deleteOne({ _id: id })
                if (!deletedOrder) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}