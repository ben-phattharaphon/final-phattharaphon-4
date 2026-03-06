import createError from "http-errors";
import jwt from "jsonwebtoken";
import { findPatByUser } from "../services/auth.service.js";

async function authPatCheck(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization) {
      throw createError(401, "Unauthorization");
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.PAT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    console.log("payload", payload);
    const user = await findPatByUser(payload.username);

    if (!user) {
      throw createError(401, "Unauthorization 2");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default authPatCheck;
