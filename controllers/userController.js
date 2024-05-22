const asyncHandler= require('express-async-handler')
const bcrypt = require('bcrypt')  //'npm i bcrypt'--library used to hash passwords before storing in database
const jwt = require('jsonwebtoken') //'npm i jsonwebtoken' used in login endpoint
const User = require('../models/userModel')

//@desc Register new User
//@route POST /api/users
//@access public

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const userAvailable = await User.findOne({email})  //checking if user already registered or not
    if (userAvailable) {
        res.status(400)
        throw new Error('User Already Registered')
    }
    //Hashing Password
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({username,email,password:hashedPassword})
    if (user) {
        res.status(201).json({_id:user.id, email:user.email,})
    }else{
        res.status(400)
        throw new Error('User data is not valid')
    }
})

//@desc Login User
//@route POST /api/users
//@access public

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const user = await User.findOne({email}) // looking if the user with email exists or not
    if (user && (await bcrypt.compare(password,user.password))) {  //comparing the user provided password with hashed password in database if email exists
        const accessToken = jwt.sign({   //giving jwt a payload, access token secret and expiration time
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'15m'}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error('Email or Password is not valid')
    }
})

//@desc  User Info
//@route GET /api/users
//@access private

const infoUser = asyncHandler(async(req,res)=>{
    res.json(req.user)  //in validateTokenHandler we decided req.user to be decoded.user if token is valid
})

module.exports= {registerUser,loginUser,infoUser}