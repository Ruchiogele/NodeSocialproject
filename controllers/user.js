const _ = require('lodash');
const User = require("../models/user");


exports.userById = async(req, res, next, id) => {
    
    try {
     const userData = await User.findById(id);
        req.profile = userData //adds profile object in req with user info
            next();
    
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "User not found!"
        });
    }
    
};

exports.userAuthorization = async (req, res, next) => {

    try {
        const authorised = await 
        req.profile && req.auth && req.profile._id === req.auth._id;
        next();
        if (!authorised) {
            return res.status(403).json({
                error: "User is not authorised to perform this action!"
            });
        };
    } catch (error) {
        console.log(error);
        return res.status(500);
    };
};

exports.allUsers = async (req, res ) => {
    try {
        const showUser = await User.find().select("name email updated created");
        res.json ({ showUser })
        
    } catch (error) {
        console.log(error)
        return res.status (500).json({
            error: "Oops! Something went wrong!"
        });
    };
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
};

exports.userUpdate = async (req, res, next) => {
    try {
        let user = await req.profile;
        user = _.extend(user, req.body) // This method will mutate the source object 
        user.updated = Date.now()
        user.save() 
        const userData = await User.findById(user.id).select('-hashed_password -salt');
        return res.json(userData)
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                error: "User is not authorised to perform this action!"
            });
    }
    
};

exports.deleteUser = async (req, res, next) =>{
   try {
    const userData = await User.findByIdAndRemove(req.profile.id);
    return res.json({
        message: "Account deleted successfuly!"
    });
   } catch (error) {
    console.log("error", error)
            return res.status(400).json({
                message: "cannot delete user!"
            });
        
   };
   
        
};

