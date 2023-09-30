const express = require('express');

const router = express.Router();

const { getContact ,
     createContact,
      selectedContact,
       updateContact,
        deleteContact } = require('../controllers/contactController');

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route('/').get(getContact).post(createContact);

router.route('/:id').get(selectedContact).put(updateContact).delete(deleteContact);

module.exports = router;