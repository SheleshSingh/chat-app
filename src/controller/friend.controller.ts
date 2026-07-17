import { Request, Response } from "express"
import { CatchError } from "../lib/error"
import FriendModel from "../middleware/friend.model"
import { SessionInterface } from "../middleware/Auth.middleware";

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
        const friends = await FriendModel.find({ user })
        res.json(friends)
    }
    catch (err) {
        CatchError(err, res, "Failed to friends")
    }
}