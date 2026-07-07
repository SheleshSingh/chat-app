import { Request, Response } from "express";
import { CatchError, TryError } from "../lib/error";
import { downloadObject, isFileExist, uploadObject } from "../lib/s3";

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path
        if (!path)
            throw TryError("Failed to generate download url because path is missing", 400)

        const isExist = await isFileExist(path)
        if (!isExist)
            throw TryError("File does`t exists", 404)

        const url = await downloadObject(path)
        res.json({ url })
    }
    catch (err) {
        CatchError(err, res, "File to generate download url")
    }
}

export const uploadFile = async (req: Request, res: Response) => {
    try {
        // console.log(req.session)
        const path = req.body?.path
        const type = req.body?.type
        if (!path || !type)
            throw TryError("Invalid resquest path or type is required", 400)

        const url = await uploadObject(path, type)
        res.json({ url })
    }
    catch (err) {
        CatchError(err, res, "File to generate upload url")
    }
}