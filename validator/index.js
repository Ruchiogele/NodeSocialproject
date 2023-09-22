exports.createPostValidator = (req, res, next) => {
    //postTitle
    req.check('title', "Write a title").notEmpty()
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });
    //postBody
    req.check('body', "Write a body").notEmpty()
    req.check('body', 'body must be between 4 to 2500 characters').isLength({
        min: 4,
        max: 2500
    });
    //check for errors
    const errors = req.validationErrors()

    //if there's an error show
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({ error: firstError });
    }

    //else proceed to the next middleware
    next();
};

exports.createSignupValidator = (req, res, next) => {
     // check that name isnt null and is between 4-10 characters
        req.check("name", "Name is required").notEmpty();

        //check that email is not null and is valid

        req.check("email").notEmpty()
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email address")
        // .isLength({min: 4, max: 2500})

        // check for password

        req.check("password", "Password is required")
        req.check('password')
        .isLength({min: 6})
        .matches(/\d/)
        .withMessage("Password must contain atleast 6 characters")
        .withMessage("Password must contain a number")
        
        //check for errors
        const errors = req.validationErrors()

        //if there's an error show
        if (errors) {
            const firstError = errors.map((error) => error.msg)[0]
            return res.status(400).json({ error: firstError });
        }

        //else proceed to the next middleware
        next();
};