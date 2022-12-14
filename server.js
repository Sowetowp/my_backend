import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import path from "path"

import {errorHandler} from "./middlewares/error-handler.js"
import user_router from "./routes/userRoutes.js"
import admin_router from "./routes/adminRoutes.js"
import work_router from "./routes/workingHoursRoutes.js"
import buyer_router from "./routes/buyerRoutes.js"
import adminRouter from "./routes/sadminRoutes.js"

import connectDB from "./config/db.js"
import item_router from "./routes/itemRoutes.js"
import microsoft_router from "./routes/microsoftRoute.js"
import wet_router from "./routes/WetRoutes.js"
//import buyer_router from "./routes/buyerRoutes.js"

dotenv.config({path: "./config/config.env"});
connectDB().then()

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(errorHandler)
app.use("/api/user", user_router)
app.use("/api/admin", admin_router)
app.use("/api/user", work_router)
app.use("/api/item", item_router)
app.use("/api/buyer", buyer_router)
app.use("/api/sadmin", adminRouter)
app.use("/api/microsoft", microsoft_router)
app.use("/api/wet", wet_router)


const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`server runnin in ${process.env.NODE_ENV} mode on port ${PORT}`)
)