import { Request, Response } from "express"
import { SessionInterface } from "../middleware/Auth.middleware";
import AuthModel from "../model/auth.model";
import FriendModel from "../model/friend.model";
import mongoose from "mongoose";
import { CatchError, TryError } from "../lib/error";

export const addFriend = async (req: SessionInterface, res: Response) => {
    try {
        req.body.user = req.session?.id
        const friend = await FriendModel.create(req.body)
        res.json(friend)
    }
    catch (err) {
        CatchError(err, res, "Failed to send friend request")
    }
}

export const fetchFriends = async (req: SessionInterface, res: Response) => {
    try {
        const user = req.session?.id
        const friends = await FriendModel.find({ user }).populate("friend")
        res.json(friends)
    }
    catch (err) {
        CatchError(err, res, "Failed to friends")
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    try {
        await FriendModel.deleteOne()
        res.json({ message: "Friend deleted" })

    } catch (err) {
        CatchError(err, res, "Failed to friends")
    }
}

export const suggestedFriends = async (req: SessionInterface, res: Response) => {
    try {
        if (!req.session)
            throw TryError("Failed to suggest friend !", 401)

        const friends = await AuthModel.aggregate([
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(req.session.id) }
                }
            },
            {
                $sample: {
                    size: 5
                }
            },
            {
                $project: {
                    fullname: 1,
                    image: 1,
                    createdAt: 1
                }
            }
        ])

        const modify = await Promise.all(
            friends.map(async (item) => {
                const count = await FriendModel.countDocuments({ friend: item._id })
                return count === 0 ? item : null
            })
        )
        const filtered = modify.filter((item) => item !== null)
        res.json(filtered)
    }
    catch (err) {
        CatchError(err, res, "Failed to suggestions friends")
    }
}


export const friendRequest = async (req: SessionInterface, res: Response) => {
    try {
        if (!req.session)
            throw TryError("Failed to fetch friend request")
        const friends = await FriendModel.find({ friend: req.session.id, status: "requested" })
            .populate("user", "fullname image")
        res.json(friends)
    }
    catch (err) {
        CatchError(err, res, "Failed to suggestions friends")
    }
}

export const updateFriendStatus = async (req: SessionInterface, res: Response) => {
    try {
        if (!req.session)
            throw TryError("Failed to update friend status")

        await FriendModel.updateOne(
            { _id: req.params.id },
            { $set: { status: req.body.status } }
        )
        res.json({ message: "Friend status update" })

    }
    catch (err) {
        CatchError(err, res, "Failed to update status friends")
    }
}