import { NextFunction, Request, Response } from "express";
const contactService = require("../services/contactServices");

export const getContacts = (req: Request, res: Response, next: NextFunction) => {
    contactService.getContacts(req, res, next);
};

export const addContact = (req: Request, res: Response, next: NextFunction) => {
    contactService.addContact(req, res, next);
};
