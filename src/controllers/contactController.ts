import { Request, Response } from "express";
const contactService = require("../services/contactServices");

export const getContacts = async (req: Request, res: Response) => {
    const result = await contactService.getContacts(req, res);
    return res.status(200).json(result);
};

export const addContact = async (req: Request, res: Response) => {
    const result = await contactService.addContact(req, res);
    return res.status(result[0]).json(result[1]);
};
