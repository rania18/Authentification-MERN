const express = require('express');
const { registerController, loginController } = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator');


router.post('/register', 
   body('email','Invalid email!').isEmail(),   
   body('password','password must be 6 characters minimum').isLength({ min: 5 }), 
   registerController
);
router.post('/login', loginController)

module.exports = router;