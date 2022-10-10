import { NextFunction, Request, Response } from "express";
const eventService = require("../services/eventServices");

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
    eventService.getEvents(req, res, next);
};

export const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
    eventService.getAllEvents(req, res, next);
};

export const addNewEvent = (req: Request, res: Response, next: NextFunction) => {
    eventService.addNewEvent(req, res, next);
};

export const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
    eventService.deleteEvent(req, res, next);
};
