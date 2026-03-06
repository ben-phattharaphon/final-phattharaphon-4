import express from "express";
import authDocCheck from "../middleware/authDoc.middleware.js";
import { getDocMeController } from "../controllers/doctors.controller.js";

const doctorsRouter = express.Router();

doctorsRouter.get("/me", authDocCheck, getDocMeController);

export default doctorsRouter;
