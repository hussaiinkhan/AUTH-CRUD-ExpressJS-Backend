//This file conatins the logic for all routes
//- [ ] Whenever we interact with mongodb or mongo we always get promise so to resolve promises we need to make our functions (controller functions) async.
//installed express asyn handler with 'npm i express-async-handler' and imported here to handle the exceptions in the async blocks by just wrapping the block inside the imported function
const asyncHandler= require('express-async-handler')
const Contact = require('../models/contactModel')

//@desc Get All contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id})  //fetching all contacts for this particular user 'user_id' is in contactModel.js
    res.status(200).json(contacts)
})

//@desc Get single contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error('Contact Not Found')
    }
    res.status(200).json(contact)
})

//@desc Create new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name,email,phone} = req.body
    if (!name || !email || !phone) {
        res.status(403)
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create({name,email,phone,user_id:req.user.id})  //user_id will create contact for that particular user req.user is in validateTokenHandler.js
    res.status(201).json(contact)
})

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error('Contact Not Found')
    }
    if (contact.user_id.toString()!==req.user.id) {   //checking if user is not updating others contacts
        res.status(403)
        throw new Error('User does not have permission to update others contacts')
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedContact)
})

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error('Contact Not Found')
    }
    if (contact.user_id.toString()!==req.user.id) {   //checking if user is not updating others contacts
        res.status(403)
        throw new Error('User does not have permission to delete others contacts')
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
})

module.exports= {getContacts,getContact,createContact,updateContact,deleteContact}