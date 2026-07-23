const ProductApiDoc = {
    "/product": {
        get: {
            summary: "Fetch all the products",
            parameters: [
                {
                    in: "query",
                    name: "page",
                    default: 1,
                    schema: { type: "number" }
                },
                {
                    in: "query",
                    name: "limit",
                    default: 12,
                    schema: { type: "number" }
                }
            ],
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        title: { type: "string" },
                                        price: { type: "number" },
                                        discount: { type: "number" },
                                        category: { type: "string" },
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error"
                }
            }
        },
        post: {
            summary: "Add a new product",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                price: { type: "number" },
                                discount: { type: "number" },
                                category: { type: "string" },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    _id: { type: "string" },
                                    title: { type: "string" },
                                    price: { type: "number" },
                                    discount: { type: "number" },
                                    category: { type: "string" },
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Internal server error" }
                                }
                            }
                        }
                    }

                }
            }
        },
    },
    "/product/{id}": {
        put: {
            summary: "Update product by id",
            responses: {
                200: {
                    description: "Success"
                },
                404: {
                    description: "Not found"
                },
                500: {
                    description: "Error"
                }
            }
        },
        delete: {
            summary: "Delete product by id",
            responses: {
                200: {
                    description: "Success"
                },
                404: {
                    description: "Not found"
                },
                500: {
                    description: "Error"
                }
            }
        }
    }
}

export default ProductApiDoc