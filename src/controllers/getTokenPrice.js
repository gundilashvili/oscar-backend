const axios = require('axios');

const getTokenPrice = async (address) => {
    try {
        const QUICKNODE_ENDPOINT = process.env.QUICKNODE_ENDPOINT;
        const url = `${QUICKNODE_ENDPOINT}/addon/912/networks/solana/tokens/${address}`;
        const { data } = await axios.get(url);

        return data?.summary?.price_usd || null;
        
    } catch (err) {
        console.error('Failed to fetch token price:', err.message);
        return null;
    }
};

module.exports = { getTokenPrice };
