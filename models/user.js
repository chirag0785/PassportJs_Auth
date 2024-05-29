const mongoose=require('mongoose');
const {Schema}=mongoose;

let userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    googleId:String,
    googleImg:String,
    googleAccessToken:String
})

module.exports=mongoose.model('users',userSchema);