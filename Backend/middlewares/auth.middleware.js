const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captionModel = require('../models/caption.model');


module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({mesaage: 'Unauthorized token'});
    }

    const isBlacklisted = await userModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({mesaage: 'Unauthorized'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;
        
        return next();
    } catch(err) {
       
        return res.status(401).json({message: 'Unauthorized user'})
    }
}

module.exports.authCaption = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("cookie token", req.cookies);
    console.log("header token", req.headers);
    console.log("extracted token ", token);

    if(!token){
        return res.status(401).json({message: 'Unauthorized token '});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token: token});

    if(isBlacklisted) {
        return res.status(401).json({message: 'Unauthorized blacklistToken'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const caption = await captionModel.findById(decoded._id)
        req.caption = caption;
        return next();

    } catch(err){
        console.log("following is Error",err);
        res.status(401).json({message: 'Unauthorized error'})
    }
}