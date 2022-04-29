// const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const UserInvoice = require('../models/Affiliate');
const csvParser = require('../utils/csv-parser');
const pdfParser = require('../utils/pdf-parser');

// @desc      get amazon
// @route     get /api/v1/affiliate/amazon
// @access    Public
exports.amazon = asyncHandler(async (req, res, next) => {
  const file = 'amazon'
  sendData(file, 200, res)
  // cleanAndCompress(data, 200, res)
});

// @desc      POST invoices
// @route     post /api/v1/affiliate/userinvoices
// @access    Private
exports.uploadUserInvoices = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id
  const { b64ToBuffer, user } = req.body
  const invoice = await UserInvoice.create({ b64ToBuffer, user })
  // sendTokenResponse(user, 200, res, 'invoices', 'v1')
  res.status(200).json({
    a: 'userinvoices', v: 'v1', s: 1,
    l: '',
    n: '',
    f: invoice,
    d: invoice,
  });
});

// @desc      GET invoices
// @route     get /api/v1/affiliate/userinvoices
// @access    private
exports.getUserInvoices = asyncHandler(async (req, res, next) => {
  const id = req.user.id
  const invoices = await UserInvoice.find({ user: id }).select('-__v')
  // sendTokenResponse(user, 200, res, 'invoices', 'v1')
  res.status(200).json({
    a: 'userinvoices', v: 'v1', s: 1,
    l: '',
    n: '',
    f: invoices,
    d: invoices,
  });
});

const sendData = async (file, statusCode, res) => {
  console.log(`controller - /${file}`)
  let data = await csvParser.read(`./_data/_affiliates/_${file}/${file}.csv`)
  data = data.map( el => {
    return `${el.category_}~${el.rate}~${el.cashback}~${el.exclusions}~${el.excluded_}`
  })
  res.status(statusCode).json({
    s: 1,
    l: data.length,
    n: 'category_~rate~cashback~exclusions~excluded_',
    f: data[0],
    d: data,
  });
}
