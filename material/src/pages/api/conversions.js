import {
    getConversions,
    createConversion,
    deleteConversion,
    updateConversion,
} from "../../controllers/conversionsController";

export default async function handler(req, res) {
    // Set CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        if (req.method === "GET") {
            const { current_page, page_size } = req.query;
            const data = await getConversions({ current_page, page_size });
            return res.status(200).json(data);
        }

        if (req.method === "POST") {
            const requestData = req.body;
            const data = await createConversion(requestData);
            return res.status(201).json(data);
        }

        if (req.method === "DELETE") {
            const { conversion_id, responsible_user_id } = req.body;
            if (!conversion_id || !responsible_user_id) {
                return res.status(400).json({
                    error: "conversion_id and responsible_user_id are required.",
                });
            }
            const data = await deleteConversion(
                conversion_id,
                responsible_user_id
            );
            return res.status(200).json(data);
        }

        if (req.method === "PATCH") {
            const requestData = req.body;
            const data = await updateConversion(requestData);
            return res.status(200).json(data);
        }

        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error(`Error handling ${req.method} request:`, error);
        return res.status(500).json({ error: error.message });
    }
}
