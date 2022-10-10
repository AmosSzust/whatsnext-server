import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/AppError";
import { validateEmail, verifyToken } from "../helpers/utils";
import { pgClient } from "../persistence/pgClient";

export const errorHandler = async (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (err.log) await pgClient.handleError(err);
    res.status(err.code).json({ error: err.message });
};

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(false, `can't find ${req.originalUrl}`, 404));
};

export const validation = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === "/") return next();
    if (req.originalUrl === "/api/user/login" || req.originalUrl === "/api/user/register") {
        if (!req.body.email || !validateEmail(req.body.email)) return next(new AppError(false, "Something went wrong", 401));
        if (!req.body.password) return next(new AppError(false, "Something went wrong", 401));
        else return next();
    }
    if (!req.headers.authorization) return next(new AppError(false, "Something went wrong", 401));
    else {
        const token = req.headers.authorization.split(" ")[1];
        verifyToken(token, res, next);
    }
};
