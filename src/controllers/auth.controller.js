import createError from "http-errors";
import {
  createPatToken,
  createPatUser,
  createToken,
  createUser,
  findPatByUser,
  findUserByUsername,
} from "../services/auth.service.js";
import bcrypt from "bcrypt";

//หมอ สมัคร
export async function registerDoctor(req, res, next) {
  const { username, password, specialization } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (user) {
      throw createError(400, "Username already exist");
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const newDoctor = await createUser(username, hashPassword, specialization);
    res.status(201).json({
      message: "Register Successfully",
      user: {
        id: newDoctor.id,
        username: newDoctor.username,
        specialization: newDoctor.specialization,
      },
    });
  } catch (error) {
    next(error);
  }
}

// คนไข้ สมัคร
export async function registerUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await findPatByUser(username);
    if (user) {
      throw createError(400, "Username already exist");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const patUser = await createPatUser(username, hashPassword);
    res.status(201).json({
      message: "New Patient Register Successfully",
      user: {
        id: patUser.id,
        username: patUser.username,
      },
    });
  } catch (error) {}
}

//หมอ login
export async function loginDoctorController(req, res, next) {
  const { username, password } = req.body;
  try {
    const haveDoc = await findUserByUsername(username);
    const isMacth = await bcrypt.compare(password, haveDoc.password);
    if (!haveDoc || !isMacth) {
      throw createError(401, "Invalid credentials");
    }
    const token = await createToken(haveDoc);

    res.status(201).json({
      message: "Doctor Login Successfully ",
      token: token,
      user: {
        id: haveDoc.id,
        email: haveDoc.email,
        username: haveDoc.username,
        specialization: haveDoc.specialization,
      },
    });
  } catch (error) {
    next(error);
  }
}

//คนไข้ login
export async function loginPatController(req, res, next) {
  const { username, password } = req.body;
  try {
    const havePat = await findPatByUser(username);
    const isMacth = await bcrypt.compare(password, havePat.password);
    if (!havePat || !isMacth) {
      throw createError(401, "Invalid credentials");
    }
    const token = await createPatToken(havePat);

    res.status(201).json({
      message: " Login Successfully ",
      token: token,
      user: {
        id: havePat.id,
        email: havePat.email,
        username: havePat.username,
      },
    });
  } catch (error) {
    next(error);
  }
}
