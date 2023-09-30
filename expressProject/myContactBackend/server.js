const express = require("express");

const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

const dotenv = require("dotenv").config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;

/*in build middleware to accept json object: whenever you need to accept data from client, then we need a body perser that 
 can parse the string of data which we are receiving from client */
app.use(express.json());


//creating route here: app.use is middleware. now middleware will handle our route
app.use("/api/contacts", require('./route/contactRoutes'));

//for register users need to create new api for authentication.
app.use("/api/users", require('./route/userRoute'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});