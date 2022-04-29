const fs = require('fs');
const pdf = require('pdf-parse');
let arr = [];

const pdfParser = {
    read: function(path) {
        return new Promise((resolve, reject) => {
            try {
                arr = []
                let dataBuffer = fs.readFileSync(path);
                pdf(dataBuffer).then((data) => {
                    let arr = data.text.split('\n')
                    // console.log(arr)
                    // numpages: data.numpages,
                    // numrender: data.numrender,
                    // info: data.info,
                    // metadata: data.metadata,
                    // version: data.version,
                    // text: data.text
                    resolve(arr)
                });
            } catch {
                reject([])
            }
        })
    }
}

module.exports = pdfParser
