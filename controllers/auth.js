const jwt = require('jsonwebtoken')
require('dotenv').config();
var { expressjwt: Xjwt } = require("express-jwt");
const User = require("../models/user");

exports.signup = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists)
            return res.status(403).json({
                error: "Email is taken!"
            });
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ user });
        }
        catch (err){
            return res.status(500).json({
                error: "Something went wrong!"
        });
    
};
};

// exports.signin = async(req, res) => {
//     try {
//         const userExists = await User.findOne({ email: req.body.email });
//         if(!userExists)
//         return res.status(403).json({
//             error: "Incorrect Email!"
//         });
//         if(userExists.encryptPassword(req.body.password) !== userExists.hashed_password){
//             return res.status(403).json({
//                 error: "Incorrect password!"
//             });      
//          } return res.status(200).json({
//             message: "Acess Granted!", userExists
//          });
//     }
//     catch(err){
//         console.log(err)
//     }
// }

exports.signin = async (req, res) =>{
    // find user based on email
    try {
        const {email: userEmail, password} =  req.body

  const userData = await User.findOne({email: userEmail} );
  
    // if error or no user
    if(!userData) {
        return res.status(401).json({
            error: "User does not exist. Please signin."
        });
    }
    // if user is found make sure the email and password match

    // create authentication in model and use here
    if(!userData.authenticate(password)) {
        return res.status(401).json({
            error: "Email and password do not match"
        });
    }
     // generate a token with user id and secret
    const token = jwt.sign({_id: userData._id}, process.env.JWT_SECRET);

    // persist the token as "t" in cookie with expiry date
    res.cookie("t", token, {expire: new Date() + 9999})

    // return response with user and token to frontend client
    const {_id, name, email} = userData
    return res.json({token, user: (_id, email, name) });


    } catch (error) {
        console.log (error);
        res.status(500).json({
            error: "Oops! Something went wrong!"
        });
    }
    
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    return res.json({ message: "Signout success!" });
};

exports.requireSignin = Xjwt({
    // if the token is valid, express jwt will append the verified users id 
    // in an auth key to request object
     secret: process.env.JWT_SECRET,
     userProperty: "auth",
     algorithms: ["HS256"],
});