// const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { Country, State } = require('../models/Region');
const csvParser = require('../utils/csv-parser');
const pdfParser = require('../utils/pdf-parser');

// @desc      get countries
// @route     get /api/v1/region/countries
// @access    Public
exports.countries = asyncHandler(async (req, res, next) => {
  console.log('controller - /country')
  const data = await csvParser.read('./data/_3166alpha/iso3166.csv')

  sendToClient(data, 200, res)
});

// @desc      get states
// @route     get /api/v1/region/states
// @access    Public
exports.states = asyncHandler(async (req, res, next) => {
  console.log('controller - /states')
  let data = []
  let d1 = await csvParser.read('./_data/_3166alpha/India/states.csv')
  let d2 = await csvParser.read('./_data/_3166alpha/India/ut.csv')
  // const data = await csvParser.read('./_data/_currency/currency.csv')
  // const data = await pdfParser.read('./_files/_pdf/ugc-approved.pdf')
  d1.map(el => data.push(`${el.name}~${el.lang}~${el.center}`))
  d2.map(el => data.push(`${el.name}~${el.lang}~${el.center}`))

  sendToClient(data, 200, res)
});


// @desc      update states
// @route     get /api/v1/region/updateStates
// @access    Public
exports.updateStates = asyncHandler(async (req, res, next) => {
  console.log('controller - /updateStates')
  res.status(200).json({
    success: true,
    updating: false,
  });
});

const sendToClient = (data, statusCode, res) => {
  res.status(statusCode).json({
    l: data.length,
    s: 1,
    d: data
  });
}

