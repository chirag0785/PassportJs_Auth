const express=require('express');
const router=express.Router();
const passport=require('../authentication/passport')
const userController=require('../controller/user')
router.get('/',userController.getHome);
router.get('/signup',userController.getSignup);
router.get('/login',userController.getLogin);
router.get('/profile',userController.getProfile);
router.get('/logout')
router.post('/signup',userController.postSignup);
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
  router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

module.exports=router;