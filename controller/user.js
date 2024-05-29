const User=require('../models/user')
const passport=require('../authentication/passport')
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.getHome=async (req,res,next)=>{
    if(req.isAuthenticated()) return res.redirect('/profile')
    res.render('home');
}

module.exports.getSignup=async (req,res,next)=>{
    if(req.isAuthenticated()) return res.redirect('/profile')
    res.render('signup');
}

module.exports.getLogin=async (req,res,next)=>{
    if(req.isAuthenticated()) return res.redirect('/profile')
    res.render('login');
}
module.exports.postSignup=async (req,res,next)=>{
    if(req.isAuthenticated()) return res.redirect('/profile')
    let {username,password}=req.body;
    try{
        let user=await User.findOne({username});
        if(user){
            return res.render('signup',{
                msg:"Username already exists"
            })
        }
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            user=await User.create({
                username,
                password:hash
            })
        })
        return res.redirect('/login');
    }catch(err){
        next(err);
    }
}
module.exports.getProfile=async (req,res,next)=>{
    if(!req.isAuthenticated()) return res.redirect('/login')
    res.render('profile',{
        user:req.user
    })
}