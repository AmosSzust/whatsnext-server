import { Response, Request } from "express";
import { pgClient } from "../persistence/pgClient";

export const getContacts = async (req: Request, res: Response) => {
  const email: string = res.locals.email;
  return await pgClient.getContacts(email);
};

export const addContact = async (req: Request, res: Response) => {
  const email: string = res.locals.email;
  const userLifeEventId: number = parseInt(req.params.userLifeEventId);
  const sharedEventsCount: number = parseInt(req.params.sharedEventsCount);
  if (!Number.isInteger(userLifeEventId))
    return [400, { error: "An invalid identifier was sent" }];
  if (!Number.isInteger(sharedEventsCount))
    return [400, { error: "An invalid events count was sent" }];
  await pgClient.addContact(email, userLifeEventId, sharedEventsCount);
  return [200, { result: true }];
};
