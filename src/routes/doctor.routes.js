import express from "express";
import authDocCheck from "../middleware/authDoc.middleware.js";
import {
  editDocMeController,
  getDocMeController,
} from "../controllers/doctors.controller.js";

const doctorsRouter = express.Router();

doctorsRouter.get("/me", authDocCheck, getDocMeController);
doctorsRouter.put("/me", authDocCheck, editDocMeController);

export default doctorsRouter;
