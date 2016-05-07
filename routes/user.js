var router = require('express').Router();
var User = require('../models/user');

router.post('/signup',function(req,res,next){
	var user = new User();

	user.profile.name = req.body.name;
	user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({email:req.body.email},function(err,existingUser) {
    if(existingUser){
      console.log(req.body.email+ "is already exist");
      return res.redirect('/signup');
    }else{
      user.save(function(err){
    		if (err) return next(err);
        res.json('Successfully created a New user');
        });
    }

	});
});

module.exports = router;
