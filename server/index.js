// import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js"; // ✅ Correct import
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectToDatabase from "./db/db.js";

// dotenv.config();

connectToDatabase();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter); // ✅ Use the router correctly
app.use("/api/department", departmentRouter);
app.use(express.static('public/uploads'))
app.use("/public/uploads", express.static("public/uploads"));

app.use("/api/employee", employeeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
