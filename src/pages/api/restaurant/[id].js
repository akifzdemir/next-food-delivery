import dbConnect from "@/lib/dbConnect"
import verifyJWT from "@/middlewares/verifyJWT"
import Restaurant from "@/models/Restaurant"


export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const restaurant = await Restaurant.findById(id)
                if (!restaurant) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: Restaurant })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT':
            try {
                const { userId } = verifyJWT(req.headers.authorization)
                req.body.user = userId
                const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!restaurant) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: Restaurant })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE':
            try {
                await verifyJWT(req.headers.authorization)
                const deletedRestaurant = await Restaurant.deleteOne({ _id: id })
                if (!deletedRestaurant) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: deletedRestaurant })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}