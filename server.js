const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbConnection')

connectDB() //our mongodb created server first connected with vscode and then by application using code
const app = express()

const port = process.env.PORT || 5000


app.use(express.json())  //whenever we are receiving data from the client (during POST Method) we need body parser so that we can parse the data. Here this is built-in middleware of express which acts as body parser.
app.use('/api/contacts', require('./routes/contactRoutes'))   //require because we are importing our routes
app.use('/api/users', require('./routes/userRoutes'))  //this creates folders in mongodb in backend

app.use(errorHandler)  //position matters for this middleware
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
})