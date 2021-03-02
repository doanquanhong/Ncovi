
const fetch = require('node-fetch')
const get_data = async() => {
    cases = {}
    await fetch('https://api.covid19india.org/data.json').then((res) => {
        return res.json();
    }).then((data) => {
        data_array = data.statewise
        total_obj = data_array.filter((data) => data.state === 'Total')[0]
        gj_obj = data_array.filter((data) => data.state === 'Gujarat')[0]
        mh_obj = data_array.filter((data) => data.state === 'Maharashtra')[0]

        cases.total_cases = total_obj.confirmed
        cases.total_new = total_obj.deltaconfirmed
        cases.mh_total = mh_obj.confirmed
        cases.mh_new = mh_obj.deltaconfirmed
        cases.gj_total = gj_obj.confirmed
        cases.gj_new = gj_obj.deltaconfirmed
    }).then()
    return cases
}   

// const User = require('../Models/User')
const get_users = async() => {
    let number = {}

    //Getting all the active users from the Database
    const active_users = await User.find({
        active: true,
    })

    //Getting an array of numbers of Active Users in Grujiat
    guj_user_num = active_users.filter((user) => user.state === 'Gujarat').map((user) => user.number)
    //Getting an array of numbers of Active Users in Maharashtra
    mh_user_num = active_users.filter((user) => user.state == 'Maharashtra').map((user) => user.number)

    number.GJ = guj_user_num
    number.MH = mh_user_num

    return number
}

function send_msg() {
    // Getting Users' Mobile Numbers And Data From API.
    const users_num = await get_users();
    const cases_data = await get_data();
    // Message For Gujarat Users
    const gj_msg = `New Cases in Gujarat: ${cases_data.gj_new}\nTotal Cases in Gujarat: ${cases_data.gj_total} \n New Cases in India: ${cases_data.total_new}\nTotal Cases in India: ${cases_data.total_cases} \n #StayHome #StaySafe `;
    // Message For Gujarat Users
    const mh_msg = `New Cases in Maharashtra: ${cases_data.mh_new}\nTotal Cases in Maharashtra: ${cases_data.mh_total} \n New Cases in India: ${cases_data.total_new}\nTotal Cases in India: ${cases_data.total_cases} \n #StayHome #StaySafe`;

    // Sending Messages To Users In Gujarat
    users_num.GJ.array.forEach((user) => {
        client.messages.create({
            body: gj_msg,
            from: process.env.PHN_NUM,
            to: '+84' + user,
        }).then((msg) => console.log(msg.sid)).catch((err) => console.log(err));
    });

    // Sending Messages To Users In Maharashtra
    users_num.MH.array.forEach((user) => {
        client.messages.create({
            body: mh_msg,
            from: process.env.PHN_NUM,
            to: '+84' + user,
        }).then((msg) => console.log(msg.sid)).catch((err) => console.log(err));
    });
}



const cron = require('node-cron')
 
exports.task = cron.schedule('* * * * *', () =>  {
    console.log('Running...')
  }, {
    scheduled: false,
    timezone: "Asia/Bangkok"
  })


  