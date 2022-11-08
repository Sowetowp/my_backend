import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Buyer from "../models/buyer.js";
import Item from "../models/item.js";
import User from "../models/user.js";

export const buyerSignup = asyncHandler(async(req, res) => {
    const {
        email,
        password,
        firstname,
        middlename,
        lastname,
        phonenumber,
        gender,
        dob
    } = req.body

    const buyerExist = await Buyer.find({email:email}, {phonenumber:phonenumber})
    if (buyerExist.length > 0){
        throw new Error("buyer already exists")
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const buyer = await Buyer.create({email, password: hashedpass, firstname, middlename, lastname, phonenumber, gender, dob})
        if(buyer){
            res.json({
                status: "ok",
                message: "sign up completed",
                data: {
                    _id: buyer._id,
                    email: buyer.email,
                    password: buyer.password,
                    firstname: buyer.firstname,
                    middlename: buyer.middlename,
                    lastname: buyer.lastname,
                    phonenumber: buyer.phonenumber,
                    gender: buyer.gender,
                    dob: buyer.dob,
                    token: generatetoken(buyer._id)
                }
            })
        }else{
            res.json({
                message: "incorrect info"
            })
        }
    }
})

export const buyerSignin = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const buyer = await Buyer.findOne({email})
    if(!buyer || !bcrypt.compareSync(password, buyer.password)){
        res.json({
            error: "incorrect login details"
        })
    }else{
        res.json({
            status: "ok",
            message: "welcome boss",
            profile: {
                _id: buyer._id,
                email: buyer.email,
                password: buyer.password,
                firstname: buyer.firstname,
                middlename: buyer.middlename,
                lastname: buyer.lastname,
                phonenumber: buyer.phonenumber,
                gender: buyer.gender,
                dob: buyer.dob,
                token: generatetoken(buyer._id)
            }
        })
    }
})

export const get_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findById({_id:req.params.id})
    if(buyer){
        res.json({
            status: "ok",
            message: "buyer gotten",
            data: buyer
        })
    }else{
        res.json({message:"something went wrong"})
    }
})

export const buyerUpdate = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findById({_id:req.params.id})
    const {
        email,
        password,
        firstname,
        middlename,
        lastname,
        phonenumber,
        gender,
        dob
    } = req.body
    if(buyer){
        buyer.email = email || buyer.email
        buyer.password = password || buyer.password
        buyer.firstname = firstname || buyer.firstname
        buyer.middlename = middlename || buyer.middlename
        buyer.lastname = lastname || buyer.lastname
        buyer.phonenumber = phonenumber || buyer.phonenumber
        buyer.gender = gender|| buyer.gender
        buyer.dob = dob || buyer.dob

        const update = await buyer.save()
        if(update){
            res.json({
                status: "ok",
                message: "profile updated successfully",
                data: update
            })
        }else{
            res.json({
                message: "something went wrong"
            })
        }

    }else{
        res.json({
            message: "invalid details"
        })
    }
})

export const buyerDelete = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findByIdAndDelete(req.params.id)
    if(buyer){
        res.json({
            seatus: "ok",
            message: "account deleted permanently"
        })
    }else{
        res.json({
            error: "invalid info"
        })
    }
})

export const get_item = asyncHandler(async(req, res) => {
    const users = await User.find({})
    const items = await Item.find({created_by: users})
    const veri = items.filter(x => {return x.availability == true})
        
    if(veri){
        res.json({
            status: "ok",
            message: "all available items retrieved",
            data: veri
        })
    }else{
        res.json({
            error: "no item available"
        })
    }
})