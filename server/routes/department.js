import express from "express";
// routes/department.js
import Department from '../models/Department.js';
// import mongoose from 'mongoose';
import authMiddleware from "../middleware/authMiddleware.js";
// import AddDepartment from "../../frontend/src/components/department/AddDepartment.jsx"
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
  // editDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, getDepartment);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);


export default router;
