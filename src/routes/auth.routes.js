import express from "express";
import {
  loginDoctorController,
  loginPatController,
  registerDoctor,
  registerUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register/doctor", registerDoctor);
authRouter.post("/register/user", registerUser);
authRouter.post("/login/doctor", loginDoctorController);
authRouter.post("/login/user", loginPatController);

export default authRouter;
