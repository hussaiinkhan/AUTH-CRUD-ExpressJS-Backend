const express = require('express')
const router = express.Router()
const {getContacts,getContact,createContact,updateContact,deleteContact} = require('../controllers/contactController')
const validateToken = require('../middleware/validateTokenHandler')


router.use(validateToken)  //since our routes are private we are using this middleware and by this method because all our routes here are private. If only some are private then we can use like un userController.js
router.route('/').get(getContacts).post(createContact)   //This is a bit different from user routes because here we can use same route for two/three methods
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router   // we are importing routes in server.js where require is written