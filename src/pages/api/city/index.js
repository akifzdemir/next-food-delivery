import dbConnect from "@/lib/dbConnect";
import City from "@/models/City";

export default async function handler(req, res) {
    await dbConnect()
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const cities = await City.find({})
                res.status(200).json({ data: cities })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                City.create(req.body)
                res.status(201).json({ success: true, data: req.body })
            } catch (error) {
                res.status(400).json({ success: false })
            }
        default:
            res.status(400).json({ success: false })
            break;
    }
}