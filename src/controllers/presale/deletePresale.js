const PresaleSubmission = require('../../models/PresaleSubmission');

const deletePresale = async (req, res) => {
  try {
    const result = await PresaleSubmission.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Presale not found' });
    }
    return res.status(200).json({ message: 'Presale deleted successfully' });
  } catch (err) {
    console.error('Error deleting presale:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = deletePresale;
