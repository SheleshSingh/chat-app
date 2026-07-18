
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CatchError, TryError } from "../lib/error";
import jwt, { JwtPayload } from "jsonwebtoken"

export interface PayloadInterface {
    id: mongoose.Types.ObjectId | string;
    fullname: string;
    email: string;
    mobile: string;
    image: string | null | undefined
}

export interface SessionInterface extends Request {
    session?: PayloadInterface
}

const AuthMiddleware = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.cookies.accessToken
        if (!accessToken)
            throw TryError("Unauthorized", 401)

        const payload = await jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload

        req.session = {
            id: payload.id,
            email: payload.email,
            mobile: payload.mobile,
            fullname: payload.fullname,
            image: payload.image
        }
        next()
    }
    catch (err) {
        CatchError(err, res, "Unauthorized")
    }

}

export default AuthMiddleware

