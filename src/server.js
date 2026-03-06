import express from "express";

const app = express();
const PORT = 6000;

app.use("/auth", (req, res) => {
  res.json("hi");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Doctor - เก็บข้อมูลแพทย์
// User - เก็บข้อมูลผู้ป่วย
// DoctorNote - บันทึกคำแนะนำของ Doctor ให้กับ User
// HealthRecord - บันทึกสุขภาพของ User
