import express from "express";
import authRouter from "./routes/auth.routes.js";
import errHandler from "./middleware/errHandler.js";
import usersRouter from "./routes/users.routes.js";
import doctorsRouter from "./routes/doctor.routes.js";

const app = express();
const PORT = 6000;
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/doctors", doctorsRouter);

//เพิ่ม error
// app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Doctor - เก็บข้อมูลแพทย์
// User - เก็บข้อมูลผู้ป่วย
// DoctorNote - บันทึกคำแนะนำของ Doctor ให้กับ User
// HealthRecord - บันทึกสุขภาพของ User
