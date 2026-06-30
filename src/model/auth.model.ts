import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

const authSchema = new Schema({
    image: {
        type: String,
        default: null
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

authSchema.pre("save", async function () {
    const count = await model("Auth").countDocuments({ email: this.email })
    if (count > 0)
        throw new Error("User already exits")
});

authSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password.toString(), 12);
})

const AuthModel = model("Auth", authSchema)

export default AuthModel