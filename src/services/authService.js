const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// require('dotenv').config();


function generateAPIKeys(keys) {
    const jwtSecret = process.env.JWT_SECRET;
    const apiKeys = [];

    for (let i = 0; i < keys; i++) {
        const apiKey = jwt.sign({ apiKey: true, uuid: uuidv4() }, jwtSecret, { expiresIn: '365d' });
        apiKeys.push(apiKey);
    }

    return apiKeys;
}

function verifyAPIKey(apiKey) {
    const jwtSecret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
        jwt.verify(apiKey, jwtSecret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = {
    generateAPIKeys,
    verifyAPIKey
};