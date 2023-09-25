const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const expressValidator = require("express-validator");
const dotenv = require('dotenv');
dotenv.config()

// routes
const postRoutes = require('./routes/post_route');
const authRoutes = require('./routes/auth_route');
const userRoutes = require('./routes/user_route');



//DB connection
mongoose.connect("mongodb+srv://osaruchiogele:bril35@myapiproj.u2zdsyq.mongodb.net/test",
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("DB connected"));

mongoose.connection.on('error', err => {
    console.log(`DB conncection error: ${err.message}`);
});

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({limit: '10MB'}));
app.use(cookieparser());
app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);





const port = process.env.PORT || 2001;
app.listen(port, () => {console.log(`A Node Js API is listening to port: ${port}`)});