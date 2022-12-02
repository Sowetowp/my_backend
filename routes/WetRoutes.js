import express from "express";
import { wet_sign_in, wet_sign_up } from "../controllers/WetController.js";
import { wetProtect } from "../middlewares/auth_handlers.js";
const wet_router = express.Router()
wet_router.route("/")
    .post(wet_sign_up)
    .get(wet_sign_in)


export default wet_router