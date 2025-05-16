import express from "express";
// routes/department.js
// import Department from "../models/Department.js";
// import mongoose from 'mongoose';
import authMiddleware from "../middleware/authMiddleware.js";
// import AddDepartment from "../../frontend/src/components/department/AddDepartment.jsx"
import { addEmployee , upload, getEmployees,getEmployee,updateEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware ,upload.single('image'), addEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
// router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
