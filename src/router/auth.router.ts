import { Router } from "express"
import { getSession, login, signup, updateProfilePicture } from "../controller/auth.controller";
import AuthMiddleware from "../middleware/Auth.middleware";

const AuthRouter = Router();

AuthRouter.post("/signup", signup)
AuthRouter.post("/login", login)
AuthRouter.get("/session", getSession)
AuthRouter.put("/profile-picture", AuthMiddleware, updateProfilePicture)

export default AuthRouter