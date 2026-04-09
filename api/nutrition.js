export default async function handler(req, res) {
    const { query, pageSize = 6 } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    const apiKey = process.env.USDA_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
    }

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=${pageSize}&api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
}
