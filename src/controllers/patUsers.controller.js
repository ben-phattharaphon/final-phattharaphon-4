import bcrypt from "bcrypt";
import { editPatUser } from "../services/auth.service.js";

export function getPatMeController(req, res) {
  // console.log("req.user", req.user);
  const { id, username } = req.user;
  res.status(200).json({ id, username });
}

export async function editPatMeController(req, res, next) {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    await editPatUser(username, hashPassword, req.user.id);
    res.status(200).json({ message: "Patient Profile Updated Successfully" });
  } catch (error) {
    next(error);
  }
}
