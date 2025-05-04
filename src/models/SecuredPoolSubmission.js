const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SecuredPoolSubmissionSchema = new Schema({
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    poolName: {
        type: String,
        required: true,
        default: ''
    }, 
    twitter: {
        type: String,
        required: true,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    wallet: {
        type: String,
        default: ''
    },
    purchaseAmount: {
        type: Number,
        required: true,
        default: 0
    },
    email: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }, 
    createDate: {
        type: Date,
        default: Date.now
    },

})
module.exports = SecuredPoolSubmission = mongoose.model('PrivatePoolSubmission', SecuredPoolSubmissionSchema)


