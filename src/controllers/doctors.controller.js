import bcrypt from "bcrypt";
import { editDocUser } from "../services/auth.service.js";

export function getDocMeController(req, res) {
  // console.log("req.user", req.user);
  const { id, username } = req.user;
  res.status(200).json({ id, username });
}

export async function editDocMeController(req, res, next) {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    await editDocUser(username, hashPassword, req.user.id);
    res.status(200).json({
      message: "Doctor Profile Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
}
