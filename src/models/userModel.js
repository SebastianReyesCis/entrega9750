import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    first_name : String,
    last_name : String,
    email: {
        unique: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type: String,
        enum:["user", "admin"],
        default: "user"
    },
    cart:{
        type: Types.ObjectId,
        ref: "carts"
    }
});

export const userModel = model("user", userSchema);