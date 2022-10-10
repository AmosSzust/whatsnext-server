import express from "express";

export const eventRoutes = express.Router();
const eventController = require("../controllers/eventController");

eventRoutes.get("/", eventController.getEvents);
eventRoutes.get("/all", eventController.getAllEvents);
eventRoutes.post("/", eventController.addNewEvent);
eventRoutes.delete("/:eventId", eventController.deleteEvent);
