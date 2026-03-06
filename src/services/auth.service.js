import { prisma } from "../config/prismaClient.js";
import jwt from "jsonwebtoken";

export const findUserByUsername = async (username) => {
  const user = await prisma.doctor.findFirst({
    where: { username: String(username) },
  });
  return user;
};

export const createUser = async (username, hashPassword, specialization) => {
  const newDoctor = await prisma.doctor.create({
    data: {
      username,
      password: hashPassword,
      specialization,
    },
  });
  return newDoctor;
};

export const createToken = async (haveDoc) => {
  const payload = {
    id: haveDoc.id,
    username: haveDoc.username,
    specialization: haveDoc.specialization,
  };

  const token = jwt.sign(payload, process.env.DOC_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};

// คนไข้
export const findPatByUser = async (username) => {
  const user = await prisma.user.findFirst({
    where: { username },
  });
  return user;
};

export const createPatUser = async (username, hashPassword) => {
  const newPat = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
    },
  });
  return newPat;
};

//  แก้ไข คนไข้
export const editPatUser = async (username, hashPassword, specialization) => {
  const result = await prisma.user.update({
    where: { username },
    data: {
      password: hashPassword,
      specialization,
    },
  });
  return result;
};

//Token คนไข้
export const createPatToken = async (havePat) => {
  const payload = {
    id: havePat.id,
    username: havePat.username,
  };

  const token = jwt.sign(payload, process.env.PAT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};
