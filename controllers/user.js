const user = require("../models/user");
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
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}
