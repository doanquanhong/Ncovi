const express = require('express')
const router = express.Router()
//var passport = require('passport')
const User = require('../Models/User')

/* GET Homepage. */
router.get('/', function(req, res, next) {
  res.render('index')
});

// GET register
router.get('/register', function(req, res, next) {
    var messages = req.flash('error')
    res.render('register', {
      title: 'Register',
      messages: messages,
      hasErrors: messages.length > 0,
    })
})

// POST Register page

router.post('/register', async (req, res) => {
        try {
            const { name, number, state } = req.body
    
        const new_user = await User.aggregate([{
            $match: { number: number}
        }])
    
        if (new_user.length != 0) {
            res.render('register', {
                message: 'It Seems Like, This number is already, registered with  us!',
            })
        } else {
          // Create a new user object to add to the DB.
            const user = new User( {
                name: name,
                number: number,
                state: state, 
            })
            const addedUser = await user.save()
            // Saving the user to the database.
            res.redirect('success')
        }
        } catch (error) {
            console.error();
            res.json({message: error})
        }   
  })


  // GET Success page
router.get('/success', function(req, res, next) {
    var messages = req.flash('error')
    res.render('success', {
      title: 'Success',
      message: messages,
      hasErrors: messages.length > 0,
    })
  })


module.exports = router
