import { NextFunction, Response } from "express";
import { CatchError, TryError } from "../lib/error";
import AuthModel from "../model/auth.model";
import moment from "moment";
import { SessionInterface } from "./Auth.middleware";

const RefreshToken = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken)
            throw TryError("Failed to refresh token", 401)

        const user = await AuthModel.findOne({ refreshToken })

        if (!user)
            throw TryError("Failed to refresh token", 401)

        const toDay = moment()
        const expiry = moment(user.expiry)
        const isExpiry = toDay.isAfter(expiry)

        if (isExpiry)
            throw TryError("Failed to refresh token", 401)

         req.session = {
            id: user.id,
            email: user.email,
            mobile: user.mobile,
            fullname: user.fullname,
            image: user.image ?? null
        }
        next()
    }
    catch (err) {
        CatchError(err, res, "Failed to refresh token")
    }

}

export default RefreshToken