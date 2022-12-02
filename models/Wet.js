import mongoose from "mongoose";

const wetSchema = mongoose.Schema(
    {
        email: {type : String},
        firstName: {type : String},
        surName: {type : String},
        password: {type : String}
    }
)

const wet = mongoose.model("Wet", wetSchema)
export default wet