const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    iso: String,
    ofs: String,
    sovereignty: String,
    a2c: String,
    a3c: String,
    nc: Number,
    subdivision: String,
    ccTLD: String
});
const StateSchema = new mongoose.Schema({
    iso: String,
    ofs: String,
    sovereignty: String,
    a2c: String,
    a3c: String,
    nc: Number,
    subdivision: String,
    ccTLD: String
});


module.exports = mongoose.model('Region', CountrySchema);
module.exports = mongoose.model('State', StateSchema);