const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader){
        token = authHeader.split(" ")[1] //Bearer and space and then auth token so we are spliting with space and taken the second item
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error('User is not authorised')
            }
            req.user = decoded.user
            next()
        })
        if (!token) {
            res.status(401)
            throw new Error('User is not authorised or Token is missing')
        }
    }
})

module.exports = validateToken