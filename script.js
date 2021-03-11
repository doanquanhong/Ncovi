const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const fetch = require('node-fetch')
const User = require('./Models/User')


const get_data = async() => {
    caseses = {}
    await fetch('https://corona.lmao.ninja/v2/countries/vn')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            
            caseses.total_cases = data.cases
            caseses.total_new = data.todayCases
            caseses.deaths_cases = data.deaths
            caseses.deaths_new = data.todayDeaths
            caseses.recovered_cases = data.recovered
            caseses.recovered_new = data.todayRecovered


            console.log(caseses)
        }).then()
    return caseses
    
}   

  

const get_users = async() => {
    let number = {}

    //Getting all the active users from the Database
    const active_users = await User.find({
        active: true,
    })

    //Getting an array of numbers of Active Users in Vietnam
    vn_user_num = active_users.filter((user) => user.state === 'Việt Nam').map((user) => user.number)

    number.VN = vn_user_num
    console.log(number)
    return number
}

const send_msg = async() => {
    // Getting Users' Mobile Numbers And Data From API.
    const users_num = await get_users();
    const cases_data = await get_data();
    // Message For Vietnam Users
    const vn_msg = `Covid-19 Updates\nNew Cases in Viet Nam: ${cases_data.total_new}\nTotal Cases in Viet Nam: ${cases_data.total_cases}\nNew Cases Deaths in Viet Nam: ${cases_data.deaths_new}\nTotal Cases Deaths in Viet Nam: ${cases_data.deaths_cases}\nNew Cases Recovered in Viet Nam: ${cases_data.recovered_new}\nTotal Cases Recovered in Viet Nam: ${cases_data.recovered_cases}\n\n#StayHome #StaySafe <3`;

    // Sending Messages To Users In Vietnam
    console.log(vn_msg)
    users_num.VN.forEach((user) => {
        client.messages.create({
            body: vn_msg,
            from: process.env.PHN_NUM,
            to: '+84' + user,
        }).then((msg) => console.log(msg.sid)).catch((err) => console.log(err));
    })
}


const cron = require('node-cron')
 
exports.task = cron.schedule('* * * * *', () =>  {
    send_msg()

    console.log('Running...')
  }, {
    scheduled: false,
    timezone: "Asia/Bangkok"
  })
