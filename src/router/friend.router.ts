import { Router } from "express"
import {
    addFriend,
    deleteFriend,
    fetchFriends,
    friendRequest,
    suggestedFriends,
    updateFriendStatus
} from "../controller/friend.controller"

const FriendRouter = Router()

FriendRouter.post("/", addFriend)
FriendRouter.put("/:id", updateFriendStatus)
FriendRouter.get("/", fetchFriends)
FriendRouter.get("/suggestion", suggestedFriends)
FriendRouter.get("/request", friendRequest)
FriendRouter.delete("/:id", deleteFriend)

export default FriendRouter