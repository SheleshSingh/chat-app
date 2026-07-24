const AuthApiDoc = {
    "/auth/signup": {
        post: {
            summary: "Register a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                fullname: { type: "string" },
                                email: { type: "string" },
                                password: { type: "string" },
                                mobile: { type: "string" }
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
                                    message: { type: "string", example: "Signup success" }

                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                },
            }
        }

    },
    "/auth/login": {
        post: {
            summary: "Sign in a user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string" },
                                password: { type: "string" },
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
                                    message: { type: "string", example: "Login success" },
                                    accessToken: { type: "string", example: "Valid for 10 minut http only mode" },
                                    refreshToken: { type: "string", example: "Valid for 7 days http only mode" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "User not found, please try to signup first" }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Invalid credetials email or password incorrect" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                },
            }
        }

    },
     "/auth/logout": {
        post: {
            summary: "Logout a user",
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Logout success" },
                                    accessToken: { type: "string", example: "Auto remoned from cookie" },
                                    refreshToken: { type: "string", example: "Auto remoned from cookie" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                },
            }
        }

    }
}

export default AuthApiDoc