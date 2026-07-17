import { Router } from "express"
import { addFriend, fetchFriends } from "../controller/friend.controller"

const FriendRouter = Router()

FriendRouter.post("/", addFriend)
FriendRouter.get("/", fetchFriends)

export default FriendRouter