const mongoose = require('mongoose');
const pdfParser = require('../utils/pdf-parser');


const UserInvoiceSchema = new mongoose.Schema({
    b64ToBuffer: {
        type: Buffer,
        required: [ true, 'Please add a file' ],
        unique: true
    },
    website: {
        type: String,
        select: false
    },
    disputed: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No',
        select: false
    },
    status: {
        type: String,
        enum: [ 'Confirmed', 'Pending', 'Rejected' ],
        default: 'Pending',
        select: false
    },
    amount: {
        type: Number,
        select: false
    },
    currency: {
        type: String,
        select: false
    },
    invoiceDate: {
        type: Date,
        default: Date.now,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

// UserInvoiceSchema.pre('save', async function (next) {
//     let data = await pdfParser.read(this.b64ToBuffer)
// //     console.log('data')
//     console.log(data)
//     this.amount = 40
// //     // this.invoiceDate
// });


module.exports = mongoose.model('UserInvoice', UserInvoiceSchema);