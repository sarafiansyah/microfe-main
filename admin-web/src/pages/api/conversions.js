export default async function handler(req, res) {
    const { current_page, page_size } = req.query; // Get query params
    const materialApiUrl = `${process.env.MATERIAL_API_URL}/api/conversions`;

    try {
        // Build the full URL with query parameters
        const url = new URL(materialApiUrl);
        if (current_page) url.searchParams.append("current_page", current_page);
        if (page_size) url.searchParams.append("page_size", page_size);

        const response = await fetch(url.toString(), {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: req.method !== "GET" ? JSON.stringify(req.body) : null,
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error forwarding request:", error);
        res.status(500).json({ error: "Failed to connect to Material API" });
    }
}
