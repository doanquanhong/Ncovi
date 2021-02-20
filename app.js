//import express vào app 
const app = require('express')()

//khởi tạo express
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')


require('dotenv').config()


// //pug
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  res.render('users/index')
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//ket noi Twilio - send sms a ? :)))
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

client.messages.create({
  body: 'Thank you for your registration. You will receive Corona Virus update everyday. To stop the service reply with "Stop"',
  from: process.env.PHN_NUM,
  to: +84763061890,//user's mobile number (with country code).,
}).then(message => console.log(message.sid))


const script = require('./script')
const cool = require('./cool')

// app.listen(process.env.PORT || 3000, () => {
//   script.task.start()
// })

module.exports = app



