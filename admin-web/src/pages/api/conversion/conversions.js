export default async function handler(req, res) {
    const { currentPage = 2 } = req.query; // Get currentPage, default to 1

    const API_URL = `https://api-dev.kedaipangan.com/internal-process/api/v1/conversion/conversions?currentPage=${currentPage}`;

    const options = {
        method: req.method,
        headers: {
            "Content-Type": "application/json",
            ...(req.headers.authorization && {
                Authorization: req.headers.authorization,
            }),
        },
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    };

    try {
        const response = await fetch(API_URL, options);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Error processing request",
            details: error.message,
        });
    }
}
