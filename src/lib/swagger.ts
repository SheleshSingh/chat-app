import ProductApiDoc from "../swagger/product.swagger"

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
        ...ProductApiDoc,
    }
}

export default SwaggerConfig