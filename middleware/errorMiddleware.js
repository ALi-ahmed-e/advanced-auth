const errorMiddleware = async (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";
    const message = error.message || "Internal Server Error";


    // Customize error response based on environment
    if (process.env.NODE_ENV === "development") {
        return res.status(statusCode).json({
            message,
            error, // Include detailed error object in development
            stack: error.stack, // Include stack trace for debugging
        });
    }

    // Production environment: Send a more generic error message
    return res.status(statusCode).json({
        message,
        status,
    });
};

module.exports = errorMiddleware;