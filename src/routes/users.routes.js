const { Router } = require('express');
const router = Router();

const { 
    renderSignUpForm,
    renderSignInForm,
    signIn,
    signUp,
    logout 
} = require('../controllers/user.controller');

router.get('/users/signup' , renderSignUpForm);

router.post('/users/signup', signUp);

router.get('/users/signin' , renderSignInForm);

router.post('/users/signin' , signIn);

router.get('/users/logout' , logout);

module.exports = router;