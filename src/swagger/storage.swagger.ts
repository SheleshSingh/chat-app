const StorageApiDoc = {
    "/storage/download": {
        post: {
            summary: "Generate signed URL for download",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["path"],
                            properties: {
                                path: {
                                    type: "string",
                                    example: "folder/file.ext"
                                }
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
                                    url: {
                                        type: "string",
                                        example: "signed URL valid for 60 seconds"
                                    }
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
                                    message: { type: "string", example: "Invalid token" }
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
                }
            }
        }
    },
    "/storage/upload": {
        post: {
            summary: "Generate signed URL for upload",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["path"],
                            properties: {
                                path: { type: "string", example: "folder/file.ext" },
                                type: { type: "string", example: "image/png" },
                                status: { type: "string", example: "private | public-read" },
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
                                    url: {
                                        type: "string",
                                        example: "signed URL valid for 60 seconds"
                                    }
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
                                    message: { type: "string", example: "Invalid token" }
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
                }
            }
        }
    }
};

export default StorageApiDoc;