//ket noi Twilio
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountId, authToken)

client.messages.create({
  body: 'Thank you for your registration. You will receive Corona Virus update everyday. To stop the service reply with "STOP"',
  from: process.env.PHN_NUM,
  to: +84763061890,//user's mobile number (with country code).,
}).then(message => console.log(message.sid))

