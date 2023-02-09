import { Response, Request } from "express";
import { IEvent } from "../persistence/interfaces/IEvent";
import { pgClient } from "../persistence/pgClient";

export const getEvents = async (req: Request, res: Response) => {
  const email: string = res.locals.email;
  return await pgClient.getUserEvents(email);
};

export const getAllEvents = async () => {
  return await pgClient.getAllEvents();
};

export const addNewEvent = async (req: Request, res: Response) => {
  const eventToAdd: IEvent = JSON.parse(JSON.stringify(req.body)) as IEvent;
  const email: string = res.locals.email;

  await pgClient.addEventToUser(eventToAdd, email);
  return { result: true };
};

export const deleteEvent = async (req: Request) => {
  const eventId: number = parseInt(req.params.eventId);
  await pgClient.deleteEvent(eventId);
  return { result: true };
};
