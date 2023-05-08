import dbConnect from "@/lib/dbConnect"
import Order from "@/models/Order";

export default async function handler(req, res) {
    await dbConnect()
    const { query: { restaurantId }, method } = req

    switch (method) {
        case 'GET':
            try {
                const orders = await Order.find({ restaurant: restaurantId })
                    .populate({ path: 'user', select: 'firstName lastName email' })
                    .populate({ path: 'product', select: 'name' })
                res.status(200).json({ success: true, data: orders })
            } catch (error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break;
        default:
            break;
    }

}