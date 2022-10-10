import { NextFunction, Response, Request } from "express";
import { IEvent } from "../persistence/interfaces/IEvent";
import { pgClient } from "../persistence/pgClient";

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = res.locals.email;
    res.status(200).json(await pgClient.getUserEvents(email));
};

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(await pgClient.getAllEvents());
};

export const addNewEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventToAdd: IEvent = JSON.parse(JSON.stringify(req.body)) as IEvent;
    const email: string = res.locals.email;

    await pgClient.addEventToUser(eventToAdd, email);
    res.status(200).json({ result: true });
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId: number = parseInt(req.params.eventId);
    await pgClient.deleteEvent(eventId);
    res.status(200).json({ result: true });
};
