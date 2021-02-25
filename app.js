//import express vào app 
const app = require('express')()


const bodyParser = require('body-parser')
const User = require('./Models/User')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

require('dotenv').config()

// kết nối Database MongoDB


// //pug
app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', function(req, res) {
  res.render('users/index')
})

app.get('/register', function(req, res) {
  res.render('users/register')
})

app.post('/users/register', function(req, res) {
  console.log(req.body)
  res.redirect('/success')
})

app.get('/success', function(req, res) {
  res.render('users/success')
})

app.get('/add_user', function(req, res) {
  res.render('users/add_user')
})

const script = require('./script')

app.listen(process.env.PORT || 3000, () => {
  script.task.start()
})

module.exports = app



