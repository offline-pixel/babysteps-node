const fs = require('fs');
const pdf = require('pdf-parse');
let arr = [];

const pdfParser = {
    read: function(path) {
        return new Promise((resolve, reject) => {
            try {
                arr = []
                let dataBuffer = fs.readFileSync(path);
                // console.log(dataBuffer)

                pdf(dataBuffer).then((data) => {
                    let arr = data.text.split('\n')
                    // console.log(arr)
                    const x = {
                        numpages: data.numpages,
                        numrender: data.numrender,
                        info: data.info,
                        metadata: data.metadata,
                        version: data.version,
                        text: data.text
                    }
                    console.log(x)
                    // console.log(arr)
                    resolve(arr)
                }).catch(function(error){
                    console.log(error)
                    reject([])
                    // handle exceptions
                });
            } catch {
                reject([])
            }
        })
    },
    render: function(pageData) {
        return new Promise((resolve, reject) => {
            try {
                let render_options = {
                    normalizeWhitespace: false, // default is false
                    disableCombineTextItems: false // default is false
                }
                return pageData.getTextContent(render_options)
                .then(function(textContent) {
                    console.log(textContent)
                    let lastY, text = '';
                    for (let item of textContent.items) {
                        if (lastY == item.transform[5] || !lastY){
                            text += item.str;
                        }  
                        else{
                            text += '\n' + item.str;
                        }    
                        lastY = item.transform[5];
                    }
                    resolve(text)
                    // return text;
                });
            } catch {
                reject([])
            }
        })
    },
    // options : {
    //     pagerender: render
    // },
    // pdf(dataBuffer,options).then(function(data) {
    //     // use new format
    // })
}

module.exports = pdfParser
