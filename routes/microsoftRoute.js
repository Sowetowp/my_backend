import express from "express";
import { sign_in, sign_up } from "../controllers/microsoftcontroller.js";

const microsoft_router = express.Router()
microsoft_router.post("/sign-up", sign_up)
microsoft_router.get("/sign-in", sign_in)


export default microsoft_router