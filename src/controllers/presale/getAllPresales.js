const PresaleSubmission = require('../../models/PresaleSubmission');

const getAllPresales = async (req, res) => {
  try {
    const presales = await PresaleSubmission.find().sort({ createDate: -1 });
    return res.status(200).json(presales);
  } catch (err) {
    console.error('Error fetching presales:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = getAllPresales;
