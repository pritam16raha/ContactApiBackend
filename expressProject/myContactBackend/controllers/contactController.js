//it will hold the all the logic for request response(routes)
//@desc Get all contacts
//@routes GET /api/contacts
//@ccess public

/* asyncHandler: in order to use async function we need try catch block to handle errors.
  so, we need to add try catch block in each function. to surpass this process, we will use async-handler.
  async-handler is express middleware which is used to handler exception in the express async routes.*/


const asyncHandler = require("express-async-handler");

const Contact = require("../models/ContactModels");

const getContact = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});


//Create new contact

const createContact = asyncHandler ( async(req, res) => {
    console.log("The requested body is : ",req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone ) {
        res.status(404);
        throw new Error("All fields are mandatory...!");
    }
    //create contact
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});


const selectedContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler ( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error ("Unauthorised user can not make any changes");
    }

    const newContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(newContact);
});

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error ("Contact already been deleted");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error ("Unauthorised user can not make any changes");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});



module.exports = { getContact, createContact, selectedContact, updateContact, deleteContact };