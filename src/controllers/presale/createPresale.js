const PresaleSubmission = require('../../models/PresaleSubmission');

const createPresale = async (req, res) => {
    try {
        const newPresale = new PresaleSubmission(req.body);
        const saved = await newPresale.save();
        return res.status(200).json({ message: 'Presale added successfully', record: saved });
    } catch (err) {
        console.error('Error creating presale:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = createPresale;
