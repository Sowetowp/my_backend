import mongoose from "mongoose";
const microschema = mongoose.Schema(
    {
        phone: {type: String},
        password: {type: String}
    }
)
const micro = mongoose.model("micro" , microschema)
export default micro