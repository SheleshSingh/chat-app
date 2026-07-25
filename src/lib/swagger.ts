import AuthApiDoc from "../swagger/auth.swagger"
import FriendApiDoc from "../swagger/friend.swagger"
import StorageApiDoc from "../swagger/Storage.swagger"

const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        description: "All the pravite and public apis listed here",
        version: "1.0.0",
        contact: {
            name: "Er Shelesh mathur",
            email: "sheleshsingh755@gmail.com"
        }
    },
    servers: [
        { url: process.env.SERVER }
    ],
    paths: {
        ...AuthApiDoc,
        ...StorageApiDoc,
        ...FriendApiDoc
    }
}

export default SwaggerConfig