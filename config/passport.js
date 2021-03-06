var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

//serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


//middleware
passport.use('local-login',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function(re,email,password,done){
  User.findOne({email:email},function(err, user){
    if(err) return done(err);

    if(!user){
      return done(null,false,req.flash('Login Message','No user has been found'));
    }

    if(!user.comparePassword(password)){
      return done(null,false,req.flash('Login Message', 'Oops!! Wrong password pal'));
    }
    return done(null,user);

  });
}));

exports.isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};



//custom function to validate
