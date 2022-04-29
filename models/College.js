const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    rank: String,
    name: String,
    city: String,
    state: String,
});

module.exports = mongoose.model('College', CollegeSchema);