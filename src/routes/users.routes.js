import express from "express";
import {
  editPatMeController,
  getPatMeController,
} from "../controllers/patUsers.controller.js";
import authPatCheck from "../middleware/authPat.middleware.js";

const usersRouter = express.Router();

usersRouter.get("/me", authPatCheck, getPatMeController);
usersRouter.post("/me", authPatCheck, editPatMeController);

export default usersRouter;
