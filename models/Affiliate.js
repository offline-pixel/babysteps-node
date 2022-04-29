const mongoose = require('mongoose');

const UserInvoiceSchema = new mongoose.Schema({
    b64ToBuffer: {
        type: Buffer,
        required: [ true, 'Please add a file' ],
        unique: true
    },
    disputed: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No',
        select: false
    },
    reward: {
        type: String,
        enum: [ 'Partially-Confirmed', 'Confirmed', 'Pending', 'Rejected' ],
        default: 'Pending',
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model('UserInvoice', UserInvoiceSchema);