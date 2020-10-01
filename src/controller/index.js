const vision = require('@google-cloud/vision');
const fs = require('fs');
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'src/config/key.json'
});
const { StringDecoder } = require('string_decoder');

exports.index = (req, res) => {
    res.render('index')
}

exports.ocr = (req, res) => {
    if(req.file){
        const path = `${req.file.destination}/${req.file.filename}`
        const image =  fs.readFileSync(path)
        console.log('img ====> ', image)

        client
        .textDetection(image)
        .then(results => {
            const data = JSON.stringify({
            event_type: 'text.recognized',
            data: {
                results: results[0].textAnnotations,
            }
            });
            
            const decoder = new StringDecoder('utf8');
            const resdecoder = decoder.write(Buffer.from(data))
            const decod = JSON.parse(resdecoder)
            const cek = decod.data.results[0].description

            console.log('result ===> ',cek)

            res.send({
                result: cek
            })

            fs.unlink(path, err => {
                if (err) {
                    console.log(err)
                }
                console.log('success remove img')
            })
        })
    }    
}