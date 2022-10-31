import mongoose from "mongoose";
const buyerschema = mongoose.Schema(
    {
        email: {type: String},
        password: {type: String},
        firstname: {type: String},
        middlename: {type: String},
        lastname: {type: String},
        phonenumber: {type: String},
        gender: {type: String},
        dob: {type: String}
    }
)
const buyer = mongoose.model("Buyer", buyerschema)
export default buyer