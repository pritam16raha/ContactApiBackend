//register a user
//post/api/users/register
//and it is public end point
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User is already present in the database");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`user created : ${user}`);

    if(user){
        res.status(201).json({_id: user.id, email: user.email })
    }else{
        res.status(400);
        throw new Error("user can not be created deu to the internal error!");
    }
    res.json({ message: "Register the user" });
});


//login function
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))){ //this line is actually comparing given password with saved password, if fails, user can not login
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401)
        throw new Error("Email or Password is not valid");
    }
});


//fetch user
const currentInformation = asyncHandler ( async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser , loginUser, currentInformation };