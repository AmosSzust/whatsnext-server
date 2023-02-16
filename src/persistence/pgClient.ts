import { AppError } from "../helpers/AppError";
import { Pool, QueryResult } from "pg";
import { IUserDB } from "./interfaces/IUserDB";
import { IEvent } from "./interfaces/IEvent";
import { ILifeEvent } from "./interfaces/ILifeEvent";
import { SearchBasedOnEnum } from "./enums/SearchBasedOnEnum";
import { IContact } from "./interfaces/IContact";

const pg = require("pg");

class PGClient {
  private pool: Pool;
  constructor() {
    pg.types.setTypeParser(1114, (stringValue: string) => {
      return new Date(`${stringValue}+0000`);
    });
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT!),
      ssl: process.env.DB_SSL === "true",
    });
  }

  //General
  emailExists = async (email: string): Promise<boolean> => {
    const queryResult: QueryResult = await this.pool.query(
      `select id from users where email=$1`,
      [email]
    );
    return queryResult.rows.length > 0;
  };

  handleError = async (appError: AppError): Promise<void> => {
    const query: string =
      "insert into errors (error_when, error_message, callstack) values (now(),$1,$2)";
    try {
      await this.pool.query(query, [appError.message, appError.stack]);
    } catch (err) {
      console.log(new Date().toISOString() + ": " + err);
    }
  };

  //Contacts
  getContacts = async (email: string): Promise<IContact[]> => {
    const query: string =
      "select id, contact_when, (select full_name from users b where id=a.from_user_id) as full_name, (select email from users b where id=a.from_user_id) as email, shared_events_count from contacts a where to_user_id=(select id from users where email=$1) order by contact_when desc";
    const queryResult: QueryResult = await this.pool.query(query, [email]);
    return queryResult.rows;
  };

  addContact = async (
    email: string,
    userLifeEventId: number,
    sharedEventsCount: number
  ) => {
    let query: string =
      "select id from contacts where from_user_id=(select id from users where email=$1) and to_user_id=(select user_id from users_life_events where id=$2)";
    const queryResult: QueryResult = await this.pool.query(query, [
      email,
      userLifeEventId,
    ]);

    if (queryResult.rows.length === 0) {
      query =
        "insert into contacts (from_user_id, to_user_id, contact_when, shared_events_count) values ((select id from users where email=$1), (select user_id from users_life_events where id=$2), now(), $3)";
      await this.pool.query(query, [email, userLifeEventId, sharedEventsCount]);
    } else {
      query =
        "update contacts set contact_when=now(), shared_events_count=$1 where from_user_id=(select id from users where email=$2) and to_user_id=(select user_id from users_life_events where id=$3)";
      await this.pool.query(query, [sharedEventsCount, email, userLifeEventId]);
    }
  };

  //Users
  getUser = async (email: string): Promise<IUserDB> => {
    const queryResult: QueryResult = await this.pool.query(
      `select * from users where email=$1`,
      [email]
    );
    return queryResult.rows[0];
  };

  getUserEvents = async (email: string): Promise<IEvent[]> => {
    const query =
      "select ule.id, le.event_name,le.icon_name, ule.description, ule.event_when from users u, life_events le, users_life_events ule where u.id=ule.user_id and ule.event_id=le.id and u.email=$1 order by ule.event_when desc";
    const queryResult: QueryResult = await this.pool.query(query, [email]);
    return queryResult.rows;
  };

  setUserName = async (email: string, full_name: string) => {
    const query: string = "update users set full_name=$1 where email=$2";
    await this.pool.query(query, [full_name, email]);
  };

  setUserBirthDate = async (email: string, birthDate: string) => {
    const query: string =
      "update users_life_events set event_when=$1 where user_id=(select id from users where email=$2) and event_id=1";
    await this.pool.query(query, [birthDate, email]);
  };

  getUserName = async (email: string): Promise<string> => {
    const query: string = "select full_name from users where email = $1";
    const queryResult: QueryResult = await this.pool.query(query, [email]);
    if (queryResult.rows.length === 0) return "<No Name>";
    else return queryResult.rows[0].full_name;
  };

  saveUser = async (userData: IUserDB, birthDate: string) => {
    const query: string =
      "insert into users (full_name, password, email, last_active) values ($1,$2,$3,date(now())) RETURNING *";
    const insertResult: QueryResult = await this.pool.query(query, [
      userData.full_name,
      userData.password,
      userData.email,
    ]);
    await this.pool.query(
      "insert into users_life_events (user_id, event_id, event_when) values ($1, $2, $3)",
      [insertResult.rows[0].id, 1, new Date(birthDate)]
    );
  };

  getSimilar = async (
    email: string,
    yearsDifference: number,
    numberOfEvents: number,
    searchBasedOn: SearchBasedOnEnum,
    resultId: number
  ): Promise<[any[], { user_id: number }[]]> => {
    let query: string;
    let listIds: { user_id: number }[] = [];
    let selectResult: QueryResult;
    if (resultId === 0) {
      let query: string =
        "select distinct ule.user_id from users_life_events ule,(select user_id, event_id, date_part('year', event_when) as event_year from users_life_events where user_id = (select id from users where email=$1)) as user_events where ule.user_id != user_events.user_id and date_part('year', ule.event_when) between user_events.event_year - $2 and user_events.event_year + $3 and ule.event_id = user_events.event_id and exists (select ule2.user_id from users_life_events ule2 where ule.user_id = ule2.user_id group by ule2.user_id having count(id) >= $4)";
      selectResult = await this.pool.query(query, [
        email,
        yearsDifference,
        yearsDifference,
        numberOfEvents,
      ]);
      listIds = selectResult.rows;
      if (listIds.length === 0) return [[], []];
      resultId = listIds[0].user_id;
    }
    query =
      "select ule.id, ule.event_id, ule.event_when, (select icon_name from life_events le where le.id= ule.event_id) as icon_name from users_life_events ule, (select user_id, event_id, date_part('year', event_when) as event_year from users_life_events where user_id = (select id from users where email = $1)) as user_events where ule.user_id = $2 and date_part('year', ule.event_when) between user_events.event_year - $3 and user_events.event_year + $4 and ule.event_id = user_events.event_id and exists (select ule2.user_id from users_life_events ule2 where ule.user_id = ule2.user_id group by ule2.user_id having count(id) >= $5)";
    selectResult = await this.pool.query(query, [
      email,
      resultId,
      yearsDifference,
      yearsDifference,
      numberOfEvents,
    ]);
    return [selectResult.rows, listIds];
  };

  //Events
  getAllEvents = async (): Promise<ILifeEvent[]> => {
    const query: string =
      "select id, event_name, description, icon_name from life_events order by event_name asc";
    const queryResult: QueryResult = await this.pool.query(query);
    return queryResult.rows;
  };

  addEventToUser = async (eventToAdd: IEvent, email: string) => {
    const query: string =
      "insert into users_life_events (user_id, event_id, description, event_when) select id, $1, $2, $3 from users where email = $4";
    await this.pool.query(query, [
      eventToAdd.id,
      eventToAdd.description,
      eventToAdd.event_when,
      email,
    ]);
  };

  deleteEvent = async (eventId: number) => {
    const query: string = "delete from users_life_events where id=$1";
    await this.pool.query(query, [eventId]);
  };

  setLastActive = async (email: string) => {
    const query: string =
      "update users set last_active=date(now()) where email=$1";
    await this.pool.query(query, [email]);
  };
}

export const pgClient = new PGClient();
