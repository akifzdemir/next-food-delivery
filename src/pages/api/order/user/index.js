import dbConnect from "@/lib/dbConnect";
import verifyJWT from "@/middlewares/verifyJWT";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Restaurant from "@/models/Restaurant";

export default async function handler(req, res) {
    const {
        method,
    } = req
    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const { userId } = verifyJWT(req.headers.authorization)
                const orders = await Order.find({ user: userId }).populate("restaurant").populate("product")
                res.status(200).json({ data: orders, success: true })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, err: error })
            }
            break;
        default:
            console.log("abc")
            res.status(400).json({ success: false })
            break;
    }

}