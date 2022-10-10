import { NextFunction, Response, Request } from "express";
import { pgClient } from "../persistence/pgClient";

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = res.locals.email;
    res.status(200).json(await pgClient.getContacts(email));
};

export const addContact = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = res.locals.email;
    const userLifeEventId: number = parseInt(req.params.userLifeEventId);
    const sharedEventsCount: number = parseInt(req.params.sharedEventsCount);
    if (!Number.isInteger(userLifeEventId)) return res.status(400).json({ error: "An invalid identifier was sent" });
    if (!Number.isInteger(sharedEventsCount)) return res.status(400).json({ error: "An invalid events count was sent" });
    await pgClient.addContact(email, userLifeEventId, sharedEventsCount);
    res.status(200).json({ result: true });
};
