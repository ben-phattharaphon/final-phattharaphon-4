import bcrypt from "bcrypt";

export function getDocMeController(req, res) {
  // console.log("req.user", req.user);
  const { id, username } = req.user;
  res.status(200).json({ id, username });
}
