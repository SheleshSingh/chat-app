import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { CatchError, TryError } from "../lib/error";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const conn = new S3Client({
    region: process.env.REGION,
    endpoint: `https://s3-${process.env.REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})
export const downloadFile = async (req: Request, res: Response) => {
    try {
        const { path } = req.body
        if (!path)
            throw TryError("Failed to generate download url because path is missing", 400)

        const option = {
            Bucket: process.env.S3_BUCKET,
            Key: path
        }

        const checkFileExistCommand = new HeadObjectCommand(option)
        await conn.send(checkFileExistCommand)

        const command = new GetObjectCommand(option)

        const url = await getSignedUrl(conn, command, { expiresIn: 60 })
        res.json({ url })

    }
    catch (err) {
        CatchError(err, res)
    }
}