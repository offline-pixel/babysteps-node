// const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const College = require('../models/College');
const csvParser = require('../utils/csv-parser');

// @desc      get engineer
// @route     get /api/v1/college/engineer
// @access    Public
exports.engineer = asyncHandler(async (req, res, next) => {
  const file = 'engineer'
  sendData(file, 200, res)
  // cleanAndCompress(data, 200, res)
});

// @desc      get medical
// @route     get /api/v1/college/medical
// @access    Public
exports.medical = asyncHandler(async (req, res, next) => {
  const file = 'medical'
  sendData(file, 200, res)
});

// @desc      get mba
// @route     get /api/v1/college/mba
// @access    Public
exports.mba = asyncHandler(async (req, res, next) => {
  const file = 'mba'
  sendData(file, 200, res)
});

// @desc      get law
// @route     get /api/v1/college/law
// @access    Public
exports.law = asyncHandler(async (req, res, next) => {
  const file = 'law'
  sendData(file, 200, res)
});

const sendData = async (file, statusCode, res) => {
  console.log(`controller - /${file}`)
  let data = await csvParser.read(`./_data/_colleges/${file}.csv`)
  data = data.map( el => {
    return `${el.rank}~${el.name}~${el.city}~${el.state}`
  })
  res.status(statusCode).json({
    a: file,
    v: 'v1',
    s: 1,
    l: data.length,
    n: 'rank~name~city~state',
    f: data[0],
    d: data,
  });
}

// const cleanAndCompress = (data, statusCode, res) => {
//   let cleaned = [], garbage = []//, min = garbage[0], count = 1;
//   data = data.map( el => {
//     return `${el.rank}~${el.college}~${el.city}~${el.state}`
//   })
//   // data = data.map((el, i) => {
//   //   // Match a date in string - regex
//   //   // const isMatch = el.match(/\d{2}(\D)\d{2}\1\d{4}/g)
//   //   // const isMatchYear = el.match(/^\d{4}\s$/)
//   //   const isMatchSrNo = /^[0-9]{1,4}\.\s\s/.test(el)
//   //   if( isMatchSrNo ) {
//   //     // const str = data[i+1].split(',')[0].replace(/\s+/g,' ').trim()
//   //     // const b64 = Buffer.from(str).toString('base64')
//   //     // const b58 = Base58.encode(Buffer.from(str))
//   //     // cleaned.push(b58)
//   //     // garbage.push(Buffer.from(b64, 'base64').toString())
//   //     return data[i+1].split(',')[0].replace(/\s+/g,' ').trim() // this is nearly 35.43kb data
//   //   }
//   // })
//   // find repetition and replace - not working :(
//   // cleaned.map(arr => {
//   //   let t1 = []
//   //   t1 = arr.split(' ')
//   //   t1.map(str => {
//   //     if ( str.length > 5) {
//   //       if ( str in garbage ) {
//   //         garbage[str]++
//   //       } else {
//   //         garbage[str] = 1
//   //       }
//   //       // if( garbage[str] > count) {
//   //       //     min = str;
//   //       //     count = garbage[str]
//   //       // }
//   //     }
//   //   })
//   // })
//   // let key = Object.keys(garbage)
//   // key.sort( function(a, b) { return garbage[a] - garbage[b] }).reverse()
//   res.status(statusCode).json({
//     // tba: '584, 893, 1004 ++016between1017/18', 
//     l: data.length,
//     s: 1,
//     d: data
//   });
// }