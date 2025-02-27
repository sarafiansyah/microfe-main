import { getConversions } from "../../controllers/conversionsController";
import { createConversion } from "../../controllers/conversionsController";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { current_page, page_size } = req.query;
            const data = await getConversions({ current_page, page_size });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "POST") {
        try {
            const requestData = req.body;
            const data = await createConversion(requestData);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
