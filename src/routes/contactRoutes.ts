import express from "express";

export const contactRoutes = express.Router();
const contactController = require("../controllers/contactController");

contactRoutes.get("/", contactController.getContacts);
contactRoutes.post(
  "/:userLifeEventId/:sharedEventsCount",
  contactController.addContact
);
