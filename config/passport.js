// config.passport.js
// load module
var passport = require('passport')
 
// load usermodel
var User = require('../Models/User')
var LocalStrategy = require('passport-local').Strategy

// passport session setup
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id)
})

// user deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

// local register 
passport.use('local.register', new LocalStrategy({
    // mặc định local strategy sử dụng username và password
    //chúng ta có thể cấu hình lại
    usernameField: 'name',
    passwordField: 'number',
    passReqToCallback: true,
}, function(req, name, number, done) {
    // Tìm một user theo email
    // chúng ta kiểm tra xem user đã tồn tại hay không
    User.findOne({
        'name': name
    }, function(err, user) {
        if (err) {
            return done(err)
        } if (user) {
            return done(null, false, {
                message: 'Name is already in use.'
            })
        }
        // Nếu chưa user nào sử dụng number này
        // tạo mới user
        var newUser = new User()
        // lưu thông tin cho tài khoản local
        newUser.name = name,
        newUser.number = number,

        // Lưu user
        newUser.save(function(err, result) {
            if (err) {
                return done(err)
            } return done(null, newUser)
        })
    })
}))