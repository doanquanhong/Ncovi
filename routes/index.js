const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home Page' });
  });
  
  module.exports = router;
  


// const {registerValidation} = require('../auth/validation')

// const { router } = require('../app')
// const User = require('../Models/User')

// // Validate user
// const{ error } = registerValidation(req.body);
// if(error) return res.status(400).send(error.details[0].message)

// router.post('../users/register', async (req, res) => {
//     try {
//         const { name, number, state } = req.body

//     const new_user = await User.aggregate([{
//         $match: { number: number}
//     }])

//     if (new_user.length != 0) {
//         res.render('../users/register', {
//             message: 'It Seems Like, This number is already, registered with  us!',
//         })
//     } else {
//         const user = new User( {
//             name: name,
//             number: number,
//             state: state,
//         })
//         const addedUser = await user.save()
//         res.redirect('../users/success')
//         res.send(addedUser)
//     }
//     } catch (error) {
//         console.error();
//         res.json({message: error})
//     }   
// })
