const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')


function init(passport){
    passport.use(new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
        //Login
        // check if email exists
        const user = await User.findOne({ email : email })
        if (!user){
            return done(null, false, { message:'No user with this email' })
        }

        // comparing the password with password stored in database
        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in successfully'})
            }
            return done(null, false, { message: 'Wrong username or password'})
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong'})
        })
    }))
    
    // to store the id of user in session when he logged in
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    // it use to get the user stored in database(in collection User) by id which is used in serializeuser()
    passport.deserializeUser((id,done) => {
        User.findById(id, (err,user) => {
            done(err, user)
        })
    })  

 

}

module.exports = init