const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const createPresale = require('../controllers/presale/createPresale');
const getAllPresales = require('../controllers/presale/getAllPresales');
const deletePresale = require('../controllers/presale/deletePresale');
const { getPresalePools } = require('../controllers/pools/poolsController');
const { authenticateAPIKey } = require('./middleware/authMiddleware');
const {
  getAllSecuredPools,
  createSecuredPool,
  deleteSecuredPool
} = require('../controllers/privatePools/securedPoolController');



// @route   GET /api/presale/pools
// @desc    Get pool data from public_pools.json
// @access  Private
router.get('/pools', authenticateAPIKey, getPresalePools);
 
 
// @route   GET /api/presale/submissions
// @desc    Get all presale submissions
// @access  Private
router.get('/submissions', authenticateAPIKey, getAllPresales);


// @route   DELETE /api/presale/submissions/:id
// @desc    Delete presale by ID
// @access  Private
router.delete('/submissions/:id', authenticateAPIKey, deletePresale);


// @route   POST /api/presale/submissions
// @desc    Submit new presale
// @access  Private
router.post('/submissions', [
  check('poolName').notEmpty().withMessage('poolName is required'),
  check('wallet').notEmpty().withMessage('wallet is required'),
  check('twitter').notEmpty().withMessage('twitter is required'),
  check('about').notEmpty().withMessage('about is required'),
  check('type').notEmpty().withMessage('type is required'),
  check('size').notEmpty().withMessage('size is required'),
], authenticateAPIKey,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    createPresale(req, res);
  });
 

// @route   GET /api/presale/private-submissions
// @desc    Get all private pool submissions
// @access  Private
router.get('/private-submissions', authenticateAPIKey, getAllSecuredPools);

// @route   DELETE /api/presale/private-submissions/:id
// @desc    Delete private pool submission by ID
// @access  Private
router.delete('/private-submissions/:id', authenticateAPIKey, deleteSecuredPool);

// @route   POST /api/presale/private-submissions
// @desc    Submit new private pool submission  
// @access  Private
router.post(
  '/private-submissions',
  [
    authenticateAPIKey,
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('poolName').notEmpty().withMessage('poolName is required'),
    check('company').notEmpty().withMessage('company is required'),
    check('twitter').notEmpty().withMessage('twitter is required'),
    check('purchaseAmount').notEmpty().withMessage('purchaseAmount is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    createSecuredPool(req, res);
  }
);


module.exports = router; 
