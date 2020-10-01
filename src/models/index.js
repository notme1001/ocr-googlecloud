const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG)$/)) {
      return cb(new Error('Only image files are allowed!'))
    } else {
      cb(null, 'public/uploads')
    }
  },
  filename: (req, file, cb) => {
    const date = Date.now()
    const dateTimeFormat = new Intl.DateTimeFormat('id', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit' })
    const [{ value: month },, { value: day },, { value: year },, { value: hour }] = dateTimeFormat.formatToParts(date)

    cb(null, `${year}${month}${day},${hour}-${file.originalname}`)
  }
})

exports.upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024
  }
})