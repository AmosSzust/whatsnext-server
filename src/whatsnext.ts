import { Request, Response } from "express";
import express from "express";
import helmet from "helmet";
require("dotenv").config();
import { userRoutes } from "./routes/userRoutes";
import { errorHandler, handle404, validation } from "./middlewares/expressMiddleware";
import cors from "cors";
import { AppError } from "./helpers/AppError";
import fs from "fs";
import https from "https";
import { pgClient } from "./persistence/pgClient";
import { eventRoutes } from "./routes/eventRoutes";
import { contactRoutes } from "./routes/contactRoutes";

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
    res.send("whatsnext: 0.0.1");
});

app.use(handle404);
app.use(errorHandler);

if (process.env.DB_USER == null) {
    console.log(new Date().toISOString() + ": Can't find environment variables");
} else if (fs.existsSync(process.env.PRIV_KEY_PATH!)) {
    const options = {
        key: fs.readFileSync(process.env.PRIV_KEY_PATH!),
        cert: fs.readFileSync(process.env.FULL_CHAIN_PATH!),
    };
    https.createServer(options, app).listen(8447, () => {
        console.log(new Date().toISOString() + ": Server is runing on https at port 8447");
    });
} else {
    app.listen(3000, () => {
        console.log(new Date().toISOString() + ": Server is runing on http at port 3000");
    });
}

process
    .on("unhandledRejection", async (reason, p) => {
        await pgClient.handleError(new AppError(true, `${reason}: ${p}`, 500));
        console.log(new Date().toISOString() + ": Exited via unhandledRejection");
        process.exit(1);
    })
    .on("uncaughtException", async (err) => {
        await pgClient.handleError(new AppError(true, `uncaught exception ${err}`, 500));
        console.log(new Date().toISOString() + ": Exited via uncaughtException");
        process.exit(1);
    })
    .on("exit", async () => {
        console.log(new Date().toISOString() + ": Exited via exit");
    })
    .on("SIGTERM", async () => {
        console.log(new Date().toISOString() + ": Exited via sigterm");
    })
    .on("SIGINT", async () => {
        console.log(new Date().toISOString() + ": Exited via sigint");
    });