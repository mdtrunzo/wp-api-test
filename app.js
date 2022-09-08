const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const session = require('express-session')
const PORT = 5000
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
  })
)

let indexRoutes = require('./routes/index.js')

//Serve frontend
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.use('/', indexRoutes)
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
