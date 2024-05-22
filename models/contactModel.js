//a simple schema of how our contacts will be
const mongoose = require('mongoose')
const  contactSchema = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"        // this will associate the contacts created by a user to that particular user not all users
    },
    name:{
        type : String,
        required : [true,'Please add contact name']
    },
    email:{
        type : String,
        required : [true,'Please add contact email address']
    },
    phone:{
        type : String,
        required : [true,'Please add contact phone number']
    }
},{timestamps : true})

module.exports = mongoose.model('Contact',contactSchema)