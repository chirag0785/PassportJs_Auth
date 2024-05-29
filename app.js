const express=require('express');
const path=require('path')
const mongoose=require('mongoose');
require('dotenv').config()
const app=express();
const session=require('express-session')
const passport=require('./authentication/passport');
const MongoStore=require('connect-mongo')
const userRouter=require('./routes/user');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','hbs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/auth' })
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use('/',userRouter);
const PORT=4444;
mongoose.connect('mongodb://127.0.0.1:27017/auth')
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})
