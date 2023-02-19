import { Request, Response } from "express";
import express from "express";
import helmet from "helmet";
require("dotenv").config();
import { userRoutes } from "./routes/userRoutes";
import {
  errorHandler,
  handle404,
  validation,
} from "./middlewares/expressMiddleware";
import cors from "cors";
import { AppError } from "./helpers/AppError";
import fs from "fs";
import https from "https";
import { pgClient } from "./persistence/pgClient";
import { eventRoutes } from "./routes/eventRoutes";
import { contactRoutes } from "./routes/contactRoutes";
import { Server } from "http";

export const confirmationCodes = new Map<string, string>();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

app.use(validation);
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send("whatsnext: 0.1.0");
});

app.use(handle404);
app.use(errorHandler);

let server: Server;
if (process.env.DB_USER == null) {
  console.log(new Date().toISOString() + ": Can't find environment variables");
} else if (fs.existsSync(process.env.PRIV_KEY_PATH!)) {
  const options = {
    key: fs.readFileSync(process.env.PRIV_KEY_PATH!),
    cert: fs.readFileSync(process.env.FULL_CHAIN_PATH!),
  };
  server = https.createServer(options, app).listen(8447, () => {
    console.log(
      new Date().toISOString() + ": Server is running on https at port 8447"
    );
  });
} else {
  server = app.listen(3000, () => {
    console.log(
      new Date().toISOString() + ": Server is running on http at port 3000"
    );
  });
}

const closingStuff = (fromWhere: string) => {
  console.log(`${new Date().toISOString()}: Closing all connections`);
  server.closeAllConnections();
  console.log(`${new Date().toISOString()}: Exited via ${fromWhere}`);
};

process
  .on("unhandledRejection", async (reason: Error | any, p) => {
    console.log(
      `${new Date().toISOString()}: Reason: ${
        reason.stack ? reason.stack : reason
      }`
    );
    await pgClient.handleError(new AppError(true, `${reason}: ${p}`, 500));
    process.exit(1);
  })
  .on("uncaughtException", async (err, origin) => {
    console.log(
      `${new Date().toISOString()}: Error: ${
        err.stack ? err.stack : err
      }. origin: ${origin}`
    );
    await pgClient.handleError(
      new AppError(true, `uncaught exception ${err}`, 500)
    );
    process.exit(1);
  })
  .on("exit", async () => {
    closingStuff("exit");
  })
  .on("SIGTERM", () => {
    closingStuff("SIGTERM");
  })
  .on("SIGINT", () => {
    closingStuff("SIGINT");
  });
