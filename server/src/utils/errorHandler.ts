export const errorHandler = (err: any): { status: number; error: string } => {
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}: ${err.value}.`;
        return {
            status: 400,
            error: message,
        };
    }
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        console.log(value);

        const message = `Duplicate field value: ${value}. Please use another value!`;
        return {
            status: 400,
            error: message,
        };
    }
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((el: any) => el.message);
        const message = `Invalid input data. ${errors.join(". ")}`;
        return {
            status: 400,
            error: message,
        };
    }
    if (err.name === "JsonWebTokenError") {
        return {
            status: 400,
            error: "Invalid token. Please, log in again!",
        };
    }
    if (err.name === "TokenExpiredError") {
        return {
            status: 400,
            error: "Your token has expired. Please, log in again!",
        };
    }
    return {
        status: 400,
        error: "Something went wrong",
    };
};
