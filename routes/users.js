const express = require('express')
const router = express.Router()
router.get('/register', (req, res) => {
    res.render('register')
})

const User = require('../models/User')

router.post('/add_user', async (req, res) => {
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
        res.redirect('/users/register/successful')
    }
    } catch (error) {
        console.error();
        res.json({message: error})
    }   
})

module.exports = router