import asyncHandler from "express-async-handler";
import bcrypts from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Superadmin from "../models/superadmin.js";
import User from "../models/user.js";
import Buyer from "../models/buyer.js";

export const create_admin = asyncHandler(async(req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        dob,
        qualification,
        post,
        email,
        phoneNumber,
        password,
        gender,
        address,
        superadmin
    } = req.body
    const superexist = await Superadmin.find({})
    const adminexist = await Superadmin.find({email:email}, {phoneNumber:phoneNumber})
    if(superexist.length == 0 && adminexist.length == 0){
        const hashed = await bcrypts.hash(password, 10)
        const admin = await Superadmin.create({firstName, middleName, lastName, dob, qualification, post, email, phoneNumber, password: hashed, gender, address, superadmin: true})
        if(admin){
            res.json({
                status: "ok",
                message: "you are the superadmin",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    dob: admin.dob,
                    qualification: admin.qualification,
                    post: admin.post,
                    email: admin.email,
                    phonenumber: admin.phonenumber,
                    password: admin.password,
                    gender: admin.gender,
                    address: admin.address,
                    superadmin: admin.superadmin,
                    token: generatetoken(admin._id)
                }
            })
        }else{
            res.json({
                message: "incorrect info"
            })
        }
    }else if(adminexist.length > 0){
        throw new Error("admiin already exists")
    }else{
        const hashed = await bcrypts.hash(password, 10)
        const admin = await Superadmin.create({firstName, middleName, lastName, dob, qualification, post, email, phoneNumber, password: hashed, gender, address})
        if(admin){
            res.json({
                status: "ok",
                message: "you are now an admin",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    dob: admin.dob,
                    qualification: admin.qualification,
                    post: admin.post,
                    email: admin.email,
                    phonenumber: admin.phonenumber,
                    password: admin.password,
                    gender: admin.gender,
                    address: admin.address,
                    superadmin: admin.superadmin,
                    token: generatetoken(admin._id)
                }
            })
        }else{
            res.json({
                message: "incorrect info"
            })
        }
    }
})

export const getusersbuyersandadmins = asyncHandler(async(req, res) => {
    const users = await User.find({})
    const buyer = await Buyer.find({})
    const admin = await Superadmin.find({})
    const su = await Superadmin.find({_id:req.params.id})
    const sup = su[0].superadmin == true
    if(su && sup){
        res.json({
            status: "oK",
            message: "every fvckig body",
            vendors: users,
            customers: buyer,
            officials: admin
            
        })
    }else{
        res.json({
            message: "you no b superadmin"
        })
    }
})

export const get_single_admin = asyncHandler(async(req, res) => {
    const admin = await Superadmin.findById({_id:req.params.id})
    if(admin){
        res.json({
            status: "ok",
            message: "admin gotten",
            data: admin
        })
    }else{
        res.json({message: "profile not found"})
    }
})

export const updateself = asyncHandler(async(req, res) => {
    const admin = await Superadmin.findOne({_id:req.params.id})
    const {
        firstName,
        middleName,
        lastName,
        dob,
        qualification,
        post,
        email,
        phoneNumber,
        password,
        gender,
        address
    } = req.body
    if(admin){
        admin.firstName = firstName || admin.firstName,
        admin.middleName = middleName || admin.middleName,
        admin.lastName = lastName || admin.lastName,
        admin.dob = dob || admin.dob,
        admin.qualification = qualification || admin.qualification,
        admin.post = post || admin.post,
        admin.email = email || admin.email,
        admin.phoneNumber = phoneNumber || admin.phoneNumber,
        admin.password = password || admin.password,
        admin.gender = gender || admin.gender,
        admin.address = address || admin.address
    }

    const update = await admin.save()
    if(update){
        res.json({
            status: "ok",
            message: "admin updated successfully",
            data: update
        })
    }else{
        res.json({
            message: "something went wrong"
        })
    }
})

export const deleteadmin = asyncHandler(async(req, res) => {
    const su = await Superadmin.find({_id:req.params.id})
    const sup = su[0].superadmin == true
    const {_id} = req.body
    if(sup){
        const supe = await Superadmin.findByIdAndDelete({_id})
        if(supe){
            res.json({
                seatus: "ok",
                message: "account deleted permanently"
            })
        }else{
            res.json({
                error: "invalid info"
            })
        }
    }
})