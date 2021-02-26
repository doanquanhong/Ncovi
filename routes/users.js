const express = require('express')
const router = express.Router()
router.get('../users/register', (req, res) => {
    res.render('../users/register')
})

const User = require('../Models/User')

router.post('/register', async (req, res) => {
    try {
        const { name, number, state } = req.body

    const new_user = await User.aggregate([{
        $match: { number: number}
    }])

    if (new_user.length != 0) {
        res.render('already_registered', {
            message: 'It Seems Like, This number is already, registered with  us!',
        })
    } else {
        const user = new User( {
            name: name,
            number: number,
            state: state,
        })
        const addedUser = await user.save()
        res.redirect('/users/register/success')
    }
    } catch (error) {
        console.error();
        res.json({message: error})
    }   
})

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

const send_msg = async() => {
    // Getting Users' Mobile Numbers And Data From API.
    const users_num = await get_users()
    const cases_data = await get_data()
    // Message For Gujarat Users
    const gj_msg = 'New Cases in Gujarat: ${cases_data.gj_new}\nTotal Cases in Gujarat: ${cases_data.gj_total} \n New Cases in India: ${cases_data.total_new}\nTotal Cases in India: ${cases_data.total_cases} \n #StayHome #StaySafe '
    // Message For Gujarat Users
    const mh_msg = 'New Cases in Maharashtra: ${cases_data.mh_new}\nTotal Cases in Maharashtra: ${cases_data.mh_total} \n New Cases in India: ${cases_data.total_new}\nTotal Cases in India: ${cases_data.total_cases} \n #StayHome #StaySafe'
    
    // Sending Messages To Users In Gujarat
    users_num.GJ.array.forEach(element => {
        client.messages.create({
            body: gj_msg,
            from: process.env.PHN_NUM,
            to: '+84763061890',
        }).then((msg) => console.log(msg.sid)).catch((err) => console.log(err))
    })

        // Sending Messages To Users In Maharashtra
        users_num.MH.array.forEach(element => {
            client.messages.create({
                body: mh_msg,
                from: process.env.PHN_NUM,
                to: '+84763061890',
            }).then((msg) => console.log(msg.sid)).catch((err) => console.log(err))
        })
}



module.exports = router
