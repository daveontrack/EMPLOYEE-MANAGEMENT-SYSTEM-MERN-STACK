import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered in emp" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : " ",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "-password")
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error in getEmployees:", error); // log full error
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id)
      .populate("userId", "-password")
      .populate("department");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error in getEmployee:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "get employee server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const updateUser = await User.findByIdAndUpdate(employee.userId, { name }, { new: true });


    const updateEmployee = await Employee.findByIdAndUpdate(id, { maritalStatus, designation, department, salary }, { new: true });

    
    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: "document not found" });
    }
    return res.status(200).json({ success: true, message: "employee updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employee server error" });
  }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee };
