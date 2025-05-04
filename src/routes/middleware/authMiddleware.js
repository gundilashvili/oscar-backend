const { verifyAPIKey } = require('../../services/authService');

async function authenticateAPIKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
    }

    try {
        const decoded = await verifyAPIKey(apiKey);

        if (!decoded.apiKey) {
            return res.status(403).json({ error: 'Invalid API key' });
        }
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid API key' });
    }
}

module.exports = {
    authenticateAPIKey
};
