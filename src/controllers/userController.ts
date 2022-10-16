import { NextFunction, Request, Response } from "express";
const userService = require('../services/userServices');

export const login = (req: Request, res: Response, next: NextFunction) => {
    userService.login(req, res, next);
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    userService.register(req, res, next);
}

export const setUserName = async (req: Request, res: Response, next: NextFunction) => {
    userService.setUserName(req, res, next);
}

export const setUserBirthDate = async (req: Request, res: Response, next: NextFunction) => {
    userService.setUserBirthDate(req, res, next);
};

export const getUserName = async (req: Request, res: Response, next: NextFunction) => {
    userService.getUserName(req, res, next);
};

export const getSimilar = async (req: Request, res: Response, next: NextFunction) => {
    userService.getSimilar(req, res, next);
}