import express from "express";
import { wet_sign_in, wet_sign_up } from "../controllers/WetController.js";
import { wetProtect } from "../middlewares/auth_handlers.js";
const wet_router = express.Router()
wet_router.route("/up")
    .post(wet_sign_up)
    
wet_router.route("/in")
    .post(wet_sign_in)


export default wet_router