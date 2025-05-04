const axios = require('axios');
const path = require('path');
const fs = require('fs');

const { beautifyNumber } = require('../../utils/numberUtils');
const { getTokenPrice } = require('../../controllers/getTokenPrice');
const { SOLANA_MINT_ADDRESS } = require('../../config/tokenAddresses');

const getPresalePools = async (req, res) => {
    try {
        const publicPoolsPath = path.join(__dirname, '../../config/public_pools.json');
        const privatePoolsPath = path.join(__dirname, '../../config/private_pools.json');
        const publicPoolsRawData = fs.readFileSync(publicPoolsPath);
        const privatePoolsRawData = fs.readFileSync(privatePoolsPath);
        const public_pools = JSON.parse(publicPoolsRawData);
        const private_pools = JSON.parse(privatePoolsRawData);
        const sol_usd_price = await getTokenPrice(SOLANA_MINT_ADDRESS);

        const updatedPools = await Promise.all(
            public_pools.map(async (pool) => {
                try {
                    const { data } = await axios.get(`https://dlmm-api.meteora.ag/pair/${pool.pool_address}`);
                    const reserveX = data?.reserve_x_amount / 1e6;
                    const reserveY = data?.reserve_y_amount / 1e9;
                    let reserveY_price = null;
                    let current_price = data.current_price;

                    if (data?.mint_y.toLowerCase() === SOLANA_MINT_ADDRESS.toLowerCase()) {

                        reserveY_price = parseFloat(sol_usd_price);
                    }

                    const usdValueOfReserveX = reserveY_price ? (reserveX * current_price) * reserveY_price : 0;
                    const usdValueOfReserveY = reserveY_price ? reserveY * reserveY_price : 0;
                    const tvl = reserveY_price ? parseInt(usdValueOfReserveX + usdValueOfReserveY) : 'Fetching...';
                    const currentProgress = (reserveX == 0 && reserveY == 0) ? 0 : parseFloat(
                        100 - parseInt((parseFloat(reserveX) / pool.initial_supply) * 100)
                    ).toFixed(2);

                    return {
                        ...pool,
                        name: data.name,
                        mint_x: data.mint_x,
                        mint_y: data.mint_y,
                        reserve_x_amount: beautifyNumber(parseFloat(reserveX).toFixed(2)),
                        reserve_y_amount: beautifyNumber(parseFloat(reserveY).toFixed(2)),
                        base_fee_percentage: data.base_fee_percentage,
                        max_fee_percentage: data.max_fee_percentage,
                        liquidity: beautifyNumber(data.liquidity),
                        current_price: beautifyNumber(data.current_price),
                        current_progress: beautifyNumber(currentProgress),
                        progress_label: `${beautifyNumber(parseInt(reserveX))} / ${beautifyNumber(parseInt(pool.initial_supply))}`,
                        tvl_usd: beautifyNumber(tvl),
                        price_label: `${beautifyNumber(data.current_price)} ${pool.reserve_y || 'Y'}/${pool.reserve_x || 'X'}`
                    };
                } catch (err) {
                    console.error(`Error fetching data for ${pool.pool_address}:`, err.message);
                    return {
                        ...pool,
                        name: '',
                        mint_x: '',
                        mint_y: '',
                        reserve_x_amount: '',
                        reserve_y_amount: '',
                        base_fee_percentage: '',
                        max_fee_percentage: '',
                        liquidity: '',
                        current_price: '',
                        current_progress: '',
                        progress_label: '',
                        tvl_usd: '',
                        price_label: ''
                    };
                }
            })
        );
        res.status(200).json([...updatedPools, ...private_pools]);
    } catch (err) {
        console.error('Error loading presales:', err.message);
        res.status(500).json({ error: 'Failed to load presales.' });
    }
};

module.exports = {
    getPresalePools
};
