const user = require('../models/user.model');
const Jwt = require('jsonwebtoken');
require('dotenv').config();
const JwtKey = process.env.JwtKey

exports.findUser = async(req,res)=>{
    let ans = await user.find()
    res.send(ans)
}

exports.registerUser = async(req,res)=>{
    {
        let User = new user(req.body);
        let result = await User.save();
        result = result.toObject()
        delete result.password
        if (result) {
            Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.json({
                        message: "Something went wrong",
                        error: err.message
                    })
                }
                else {
                    res.json({
                        message: "user has been saved",
                        data: User,
                        auth: token
                    })
                }
            })
        }
        else {
            res.json({
                message: "Something went wrong"
            })
        }
    }
}

exports.loginUser = async(req,res)=>{

    if (req.body.email && req.body.password) {

        let User = await user.findOne(req.body).select("-password");
        console.log(User)
        if (User) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.json({
                        result: "Something went wrong",
                        error: err.message
                    })
                }
                res.json({
                    message: "user has been found",
                    data: User,
                    auth: token

                })
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    else {
        res.json({
            message: "Both the fields are required "
        })
    }
}
