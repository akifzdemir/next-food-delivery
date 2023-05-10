import dbConnect from "@/lib/dbConnect"
import verifyJWT from "@/middlewares/verifyJWT"
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
                res.status(200).json({ success: true, data: order })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                console.log(req.body)
                await verifyJWT(req.headers.authorization)
                const order = await Order.findByIdAndUpdate(id, { status: req.body }, {
                    new: true,
                    runValidators: true,
                })
                if (!order) {
                    return res.status(400).json({ success: false, data: "Bulunamadı" })
                }
                res.status(200).json({ success: true, data: order })
            } catch (error) {
                console.log(error)
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