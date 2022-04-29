const bs58 = require('bs58')

// After encoding, the data becomes large
// input must be a Uint8Array, Buffer, or an Array. It returns a string.
// Buffer.from(string)
// Uint8Array.from([0, 60,  23, 110, 101, 155, 234,
//    15, 41, 163, 233, 191, 120, 128,
//    193, 18, 177, 179,  27,  77, 200,
//     38, 38, 129, 135])
const bs58 = {
    encode: function(data) {
        return new Promise((resolve, reject) => {
            try {
                Buffer.from(data)
                const address = bs58.encode(hex)
                resolve(address)
            } catch {
                reject([])
            }
        })
    },
    decode: function(data) {
        return new Promise((resolve, reject) => {
            try {
                // NOTE: Need to work on this. FLAG: incomplete
                // data will be the decoded data if any
                const bytes = bs58.decode(data)
                // See uint8array-tools package for helpful hex encoding/decoding/compare tools
                console.log(Buffer.from(bytes).toString('hex'))
                resolve(bytes)
            } catch {
                reject([])
            }
        })
    }
}

module.exports = csvParser
