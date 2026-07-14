import { Router } from "express"
import { getSession, login, refreshToken, signup, updateProfilePicture } from "../controller/auth.controller";
import AuthMiddleware from "../middleware/Auth.middleware";
import RefreshToken from "../middleware/refresh.middleware";

const AuthRouter = Router();

AuthRouter.post("/signup", signup)
AuthRouter.post("/login", login)
AuthRouter.post("/refresh-token", RefreshToken, refreshToken)
AuthRouter.get("/session", getSession)
AuthRouter.put("/profile-picture", AuthMiddleware, updateProfilePicture)

export default AuthRouter