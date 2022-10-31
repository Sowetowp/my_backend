import express from "express";
import { adminProtect } from "../middlewares/auth_handlers.js";
import { create_admin, deleteadmin, getusersbuyersandadmins, get_single_admin, updateself } from "../controllers/superadmincontroller.js";
const adminRouter = express.Router()
adminRouter.route("/")
     .post(create_admin)
adminRouter.route("/all/:id")
     .get(adminProtect, getusersbuyersandadmins)
adminRouter.route("/:id")
     .get(adminProtect, get_single_admin)
     .patch(adminProtect, updateself)
     .delete(adminProtect, deleteadmin)
     
export default adminRouter