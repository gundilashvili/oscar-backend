const SecuredPoolSubmission = require('../../models/SecuredPoolSubmission');

const getAllSecuredPools = async (req, res) => {
  try {
    const submissions = await SecuredPoolSubmission.find().sort({ createDate: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching secured pool submissions:', error.message);
    res.status(500).json({ error: 'Failed to load secured pool submissions.' });
  }
};

const createSecuredPool = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      poolName,
      twitter,
      company,
      wallet,
      purchaseAmount,
      email,
      message
    } = req.body;

    const newSubmission = new SecuredPoolSubmission({
      firstName,
      lastName,
      poolName,
      twitter,
      company,
      wallet,
      purchaseAmount,
      email,
      message
    });

    await newSubmission.save();
    res.status(200).json(newSubmission);
  } catch (error) {
    console.error('Error creating secured pool submission:', error.message);
    res.status(500).json({ error: 'Failed to create secured pool submission.' });
  }
};

const deleteSecuredPool = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await SecuredPoolSubmission.findById(id);

    if (!submission) {
      return res.status(404).json({ error: 'Secured pool submission not found.' });
    }

    await SecuredPoolSubmission.findByIdAndDelete(id);
    res.status(200).json({ message: 'Secured pool submission deleted successfully.' });
  } catch (error) {
    console.error('Error deleting secured pool submission:', error.message);
    res.status(500).json({ error: 'Failed to delete secured pool submission.' });
  }
};

module.exports = {
  getAllSecuredPools,
  createSecuredPool,
  deleteSecuredPool
};
