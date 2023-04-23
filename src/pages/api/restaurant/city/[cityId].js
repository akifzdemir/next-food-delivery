import dbConnect from "@/lib/dbConnect";
import verifyJWT from "@/middlewares/verifyJWT";
import Restaurant from "@/models/Restaurant";

export default async function handler(req, res) {
    const {
        query: { cityId },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const restaurants = await Restaurant.find({ city: cityId }).populate('city')
                res.status(200).json({ data: restaurants, success: true })
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