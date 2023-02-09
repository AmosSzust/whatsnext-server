import { Request, Response } from "express";
const eventService = require("../services/eventServices");

export const getEvents = async (req: Request, res: Response) => {
  const result = await eventService.getEvents(req, res);
  return res.status(200).json(result);
};

export const getAllEvents = async (req: Request, res: Response) => {
  const result = await eventService.getAllEvents();
  return res.status(200).json(result);
};

export const addNewEvent = async (req: Request, res: Response) => {
  const result = await eventService.addNewEvent(req, res);
  return res.status(200).json(result);
};

export const deleteEvent = async (req: Request, res: Response) => {
  const result = await eventService.deleteEvent(req);
  return res.status(200).json(result);
};
