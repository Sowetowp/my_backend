import express from "express";
import { buyerDelete, buyerSignin, buyerSignup, buyerUpdate, get_item, get_single_buyer } from "../controllers/buyerController.js";
import { buyerProtect } from "../middlewares/auth_handlers.js";
const buyer_router = express.Router()
buyer_router.route("/")
     .post(buyerSignup)
     .get(buyerSignin)
buyer_router.route("/item")
     .get(get_item)
buyer_router.route("/:id")
     .get(buyerProtect, get_single_buyer)
     .patch(buyerProtect, buyerUpdate)
     .delete(buyerProtect, buyerDelete)

    
export default buyer_router