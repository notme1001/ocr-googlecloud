require('express-group-routes')

const express = require('express')
const router = require('./src/router')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 1010
const pathTemplate = path.join(__dirname, 'src/views/template')
const pathPublic = path.join(__dirname, 'public')

hbs.registerPartials(pathTemplate)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(pathPublic))
app.set('views', 'src/views')
app.set('view engine', 'hbs')

app.use('/', router)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: 'You are not authorized.'
    })
  } else {
    next(err)
  }
})

app.listen(port, () => console.log(`server is listening to port : ${port}`))