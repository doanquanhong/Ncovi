
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

const cron = require('node-cron')
 
exports.task = cron.schedule('* * * * *', () =>  {
    console.log('Running...')
  }, {
    scheduled: false,
    timezone: "Asia/Bangkok"
  })
