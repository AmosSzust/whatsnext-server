import { Request, Response } from "express";
const userService = require('../services/userServices');

export const login = async (req: Request, res: Response) => {
    const result = await userService.login(req);
    return res.status(result[0]).json(result[1]);
}

export const register = async (req: Request, res: Response) => {
    const result = await userService.register(req);
    return res.status(result[0]).json(result[1]);
}

export const setUserName = async (req: Request, res: Response) => {
    const result = await userService.setUserName(req, res);
    return res.status(200).json(result);
}

export const setUserBirthDate = async (req: Request, res: Response) => {
    const result = await userService.setUserBirthDate(req, res);
    return res.status(200).json(result);
};

export const getUserName = async (req: Request, res: Response) => {
    const result = await userService.getUserName(req, res);
    return res.status(200).json(result);
};

export const getSimilar = async (req: Request, res: Response) => {
    const result = await userService.getSimilar(req, res);
    return res.status(result[0]).json(result[1]);
}