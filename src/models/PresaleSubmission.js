const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PresaleSubmissionSchema = new Schema({
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    },
    poolName: {
        type: String,
        default: ''
    },
    wallet: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    },
    telegram: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = PresaleSubmission = mongoose.model('PresaleSubmission', PresaleSubmissionSchema)