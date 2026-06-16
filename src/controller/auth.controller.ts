import AuthModel from "../model/auth.model";
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { CatchError, TryError } from "../lib/error";

const accessTokenExpiry = "10m"

interface PayloadInterface {
    id: mongoose.Types.ObjectId;
    fullname: string;
    email: string;
    mobile: string;
}

const generateToken = (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, { expiresIn: accessTokenExpiry });
    return accessToken
}

export const signup = async (req: Request, res: Response) => {
    try {
        await AuthModel.create(req.body);
        res.json({ message: "Signup successfully !" })
    }
    catch (err: unknown) {
        // if (err instanceof Error)
        //     res.status(500).json({ message: err.message })

        CatchError(err, res)
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await AuthModel.findOne({ email })

        if (!user)
            throw TryError("User not found, please try to signup first", 404)


        // if (!user) {
        //     const err: ErrorMessage = new Error("User not found, please try to signup first")
        //     err.status = 404
        //     throw err
        // }

        const isLogin = await bcrypt.compare(password, user.password)

        if (!isLogin)
            throw TryError("Invalid credetials email or password incorrect", 401)

        // if (!isLogin) {
        //     const err: ErrorMessage = new Error("Invalid credetials email or password incorrect")
        //     err.status = 401
        //     throw err
        // }

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
        };

        const options = {
            httpOnly: true,
            maxAge: (10 * 60) * 1000,
            secure: false,
            domain: "localhost"
        }

        const accessToken = generateToken(payload);
        res.cookie("accessToken", accessToken, options)
        res.json({ message: "Login success" })
    } catch (err: unknown) {
        // if (err instanceof Error)
        //     res.status(401).json({ message: err.message })

        CatchError(err, res)
    }
}

export const getSession = (req: Request, res: Response) => {
    try{
        const tokenAccess= req.cookies.accessToken
        if(!tokenAccess)
            throw TryError("Invalid session", 401)
        const session =jwt.verify(tokenAccess, process.env.AUTH_SECRET!)
        res.json(session)
    }catch(err){
        CatchError(err,res, "Invalid session")
    }
 }