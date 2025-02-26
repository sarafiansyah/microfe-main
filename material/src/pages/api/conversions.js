export default async function handler(req, res) {
    const API_URL =
        "https://api-dev.kedaipangan.com/internal-process/api/v1/conversion/conversions";

    const options = {
        method: req.method, // Dynamic HTTP method (GET, POST, PATCH, DELETE)
        headers: {
            "Content-Type": "application/json",
            ...(req.headers.authorization && {
                Authorization: req.headers.authorization,
            }), // Forward auth token if needed
        },
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined, // Send body only for non-GET requests
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
