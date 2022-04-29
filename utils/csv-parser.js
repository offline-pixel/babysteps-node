const fs = require('fs')
const csv = require('csv-parser')
let arr = [];

const csvParser = {
    read: function(path) {
        return new Promise((resolve, reject) => {
            try {
                arr = []
                const fd = fs.createReadStream(path)
                .pipe(csv())
                .on('data', (data) => arr.push(data))
                .on('end', () => {
                    resolve(arr)
                })
            } catch {
                reject([])
            }
        })
    }
}

module.exports = csvParser