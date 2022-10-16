import { AppError } from "../helpers/AppError";
import { randomUUID } from "crypto";
import { confirmationCodes } from "../whatsnext";
import { mailing } from "../helpers/utils";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signUser } from "../helpers/utils";
import { IUserDB } from "../persistence/interfaces/IUserDB";
import { pgClient } from "../persistence/pgClient";
import { SearchBasedOnEnum } from "../persistence/enums/SearchBasedOnEnum";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const isEmailRegistered = await pgClient.emailExists(email);
    if (isEmailRegistered) return next(new AppError(false, "You can't register!", 403));
    const code = randomUUID().toString();
    confirmationCodes.set(email, code);
    await mailing(email, code, next);
    res.status(201).json({ result: true });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, birthDate, confirmationCode } = req.body;

    let user: IUserDB = await pgClient.getUser(email);
    if (confirmationCode) {
        if (user) return next(new AppError(false, "You can't register!", 401));
        if (!confirmationCodes.get(email) || confirmationCodes.get(email) !== confirmationCode)
            return next(new AppError(false, "Invalid confirmation code", 401));
        confirmationCodes.delete(email);
        const userData: IUserDB = {
            email: email,
            password: bcrypt.hashSync(password),
            full_name: email.substring(0, email.indexOf("@")),
        };
        await pgClient.saveUser(userData, birthDate);
        user = userData;
    }
    if (!user) return next(new AppError(false, "Please register!", 403));
    if (!bcrypt.compareSync(password, user.password)) return next(new AppError(false, "Invalid email or password", 401));
    if (!confirmationCode) await pgClient.setLastActive(email);
    res.status(200).json({ token: signUser(email) });
};

export const setUserName = async (req: Request, res: Response, next: NextFunction) => {
    const email = res.locals.email;
    const { full_name } = req.body;
    await pgClient.setUserName(email, full_name);
    res.status(200).json({ result: true });
};

export const setUserBirthDate = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = res.locals.email;
    const { birthDate } = req.body;
    await pgClient.setUserBirthDate(email, birthDate);
    res.status(200).json({ result: true });
};

export const getUserName = async (req: Request, res: Response, next: NextFunction) => {
    const email = res.locals.email;
    const full_name: string = await pgClient.getUserName(email);
    res.status(200).json({ full_name: full_name });
};

export const getSimilar = async (req: Request, res: Response, next: NextFunction) => {
    const email = res.locals.email;
    const yearsDifference: number = parseInt(req.query.yearsDifference as string);
    const numberOfEvents: number = parseInt(req.query.numberOfEvents as string);
    const searchBasedOn: SearchBasedOnEnum = req.query.basedOn as SearchBasedOnEnum;
    const resultId: number = parseInt(req.query.resultId as string);
    if (!Number.isInteger(yearsDifference) || yearsDifference < 0) return res.status(400).json({ error: "Invalid value for difference in years" });
    if (!Number.isInteger(numberOfEvents) || numberOfEvents < 1) return res.status(400).json({ error: "Invalid value for number of events" });
    if (!Number.isInteger(resultId) || resultId < 0) return res.status(400).json({ error: "Invalid value for result id" });
    const similar: [any[], { user_id: number }[]] = await pgClient.getSimilar(email, yearsDifference, numberOfEvents, searchBasedOn, resultId);
    res.status(200).json(similar);
};
