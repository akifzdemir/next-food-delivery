import dbConnect from "@/lib/dbConnect"
import Product from "@/models/Product"


export default async function handler(req, res) {
    const {
        query: { restaurantId },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const products = await Product.find({ restaurant: restaurantId }).populate('restaurant')
                res.status(200).json({ success: true, data: products })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}