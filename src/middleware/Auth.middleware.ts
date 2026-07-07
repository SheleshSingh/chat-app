
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CatchError, TryError } from "../lib/error";
import jwt, { JwtPayload } from "jsonwebtoken"

export interface PayloadInterface {
    id: mongoose.Types.ObjectId;
    fullname: string;
    email: string;
    mobile: string;
}

export interface SessionInterface extends Request {
    session?: PayloadInterface
}

const AuthMiddleware = (req: SessionInterface, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.cookies.accessToken
        if (!accessToken)
            throw TryError("Unauthorized", 401)

        const payload = jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload

        req.session = {
            id: payload.id,
            email: payload.email,
            mobile: payload.mobile,
            fullname: payload.fullname
        }
        next()
    }
    catch (err) {
        CatchError(err, res, "Unauthorized")
    }

}

export default AuthMiddleware

