import AsyncHandler from "express-async-handler";
import Micro from "../models/microsoft.js";
import bcrypt from "bcryptjs"

export const sign_up = AsyncHandler(async(req, res) => {
    const {phone, password} = req.body
    const exist = await Micro.find({phone:phone}, {password:password})
    if(exist.length > 0){
        throw new Error("User already exists")
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const user = await Micro.create({phone, password:hashedpass})
        if(user){
            res.json({
                status: "ok",
                message: "sign_up successful",
                data: {
                    _id: user._id,
                    phone: user.phone,
                    password: user.password
                }
            })
        }else{
            res.json({
                message: "something went wrong"
            })
        }
    }
})

export const sign_in = AsyncHandler(async(req, res) => {
     const {phone, password} = req.body
     const pn = await Micro.findOne({phone})
     if(pn || bcrypt.compareSync(password, Micro.password)){
        res.json({
            status: "ok",
            message: "sign_in successful"
        })
    }else{
        res.json({
            message: "wrong phone or password"
        })
    }
})