const captionController = require('../controllers/caption.controller');
const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at leat 3  character'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 3 character '),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 character long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate color must be at least 3 character long '),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid')
],
    captionController.registerCaption
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be atleast length 6')
],
    captionController.loginCaption
)

router.get('/profile', authMiddleware.authCaption, captionController.getCaptionProfile)

router.get('/logout', authMiddleware.authCaption, captionController.logoutCaption)

module.exports = router;