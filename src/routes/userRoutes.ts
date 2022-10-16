import express from 'express';

export const userRoutes = express.Router();
const userController = require('../controllers/userController');

userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.put("/name", userController.setUserName);
userRoutes.put("/birthdate", userController.setUserBirthDate);
userRoutes.get("/name", userController.getUserName);
userRoutes.get("/similar", userController.getSimilar);