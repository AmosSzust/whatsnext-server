import { randomUUID } from "crypto";
import { confirmationCodes } from "../whatsnext";
import { mailing } from "../helpers/utils";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signUser } from "../helpers/utils";
import { IUserDB } from "../persistence/interfaces/IUserDB";
import { pgClient } from "../persistence/pgClient";
import { SearchBasedOnEnum } from "../persistence/enums/SearchBasedOnEnum";

export const register = async (req: Request) => {
  const { email } = req.body;
  const isEmailRegistered = await pgClient.emailExists(email);
  if (isEmailRegistered) return [403, { error: "You can't register!" }];
  const code = randomUUID().toString();
  confirmationCodes.set(email, code);
  try {
    await mailing(
      email,
      `Thank you for signing up, here's your confirmation code: ${code}`
    );
    return [200, { result: true }];
  } catch (err: any) {
    return [500, { error: err.message ? err.message : err }];
  }
};

export const login = async (req: Request) => {
  const { email, password, birthDate, confirmationCode } = req.body;

  let user: IUserDB = await pgClient.getUser(email);
  if (confirmationCode) {
    if (user) return [401, { error: "You can't register!" }];
    if (
      !confirmationCodes.get(email) ||
      confirmationCodes.get(email) !== confirmationCode
    )
      return [401, { error: "Invalid confirmation code" }];
    confirmationCodes.delete(email);
    const userData: IUserDB = {
      email: email,
      password: bcrypt.hashSync(password),
      full_name: email.substring(0, email.indexOf("@")),
    };
    await pgClient.saveUser(userData, birthDate);
    user = userData;
  }
  if (!user) return [403, { error: "Please register!" }];
  if (!bcrypt.compareSync(password, user.password))
    return [401, { error: "Invalid email or password" }];
  if (!confirmationCode) await pgClient.setLastActive(email);
  return [200, { token: signUser(email) }];
};

export const setUserName = async (req: Request, res: Response) => {
  const email = res.locals.email;
  const { full_name } = req.body;
  await pgClient.setUserName(email, full_name);
  return { result: true };
};

export const setUserBirthDate = async (req: Request, res: Response) => {
  const email: string = res.locals.email;
  const { birthDate } = req.body;
  await pgClient.setUserBirthDate(email, birthDate);
  return { result: true };
};

export const getUserName = async (req: Request, res: Response) => {
  const email = res.locals.email;
  const full_name: string = await pgClient.getUserName(email);
  return { full_name: full_name };
};

export const getSimilar = async (req: Request, res: Response) => {
  const email = res.locals.email;
  const yearsDifference: number = parseInt(req.query.yearsDifference as string);
  const numberOfEvents: number = parseInt(req.query.numberOfEvents as string);
  const searchBasedOn: SearchBasedOnEnum = req.query
    .basedOn as SearchBasedOnEnum;
  const resultId: number = parseInt(req.query.resultId as string);
  if (!Number.isInteger(yearsDifference) || yearsDifference < 0)
    return [400, { error: "Invalid value for difference in years" }];
  if (!Number.isInteger(numberOfEvents) || numberOfEvents < 1)
    return [400, { error: "Invalid value for number of events" }];
  if (!Number.isInteger(resultId) || resultId < 0)
    return [400, { error: "Invalid value for result id" }];
  const similar: [any[], { user_id: number }[]] = await pgClient.getSimilar(
    email,
    yearsDifference,
    numberOfEvents,
    searchBasedOn,
    resultId
  );
  return [200, similar];
};
