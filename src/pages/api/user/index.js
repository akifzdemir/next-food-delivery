import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect()
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({})
                res.status(200).json({ data: users })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'DELETE':
            try {
                User.deleteOne({ _id: req.body._id })
                res.status(200).json({ success: true, data: "Deleted" })
            } catch (error) {
                res.status(400).json({ success: false })
            }
        default:
            res.status(400).json({ success: false })
            break;
    }
}