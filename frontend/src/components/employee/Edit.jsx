// import React, { useEffect, useState } from "react";
// import { fetchDepartments } from "../../utils/EmployeeHelper";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const Edit = () => {
//   const [employee, setEmployee] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     maritalStatus: "",
//     designation: "",
//     department: "",
//     salary: 0,
//   });
//   const [departments, setDepartments] = useState([]);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Fetch departments
//   useEffect(() => {
//     const getDepartments = async () => {
//       const departments = await fetchDepartments();
//       setDepartments(departments);
//     };
//     getDepartments();
//   }, []);

//   // Fetch employee details
//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/employee/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (response.data.success) {
//           const emp = response.data.employee;
//           setEmployee(emp);
//           setFormData({
//             name: emp?.userId?.name || "",
//             maritalStatus: emp?.maritalStatus || "",
//             designation: emp?.designation || "",
//             department: emp?.department?._id || "",
//             salary: emp?.salary || "",
//           });
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error);
//         }
//       }
//     };

//     fetchEmployee();
//   }, [id]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
// //     const formDataObj = new FormData();
// //     Object.keys(formData).forEach((key) => {
// //       formDataObj.append(key, formData[key]);
// //     });

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/employee/${id}`,
//         employee,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         navigate("/admin-dashboard/employees");
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         alert(error.response.data.error);
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Insert Name"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Marital Status */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Marital Status
//             </label>
//             <select
//               name="maritalStatus"
//               value={formData.maritalStatus}
//               onChange={handleChange}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="single">Single</option>
//               <option value="married">Married</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Designation */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Designation
//             </label>
//             <input
//               type="text"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               placeholder="Insert Designation"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Salary */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Salary
//             </label>
//             <input
//               type="number"
//               name="salary"
//               value={formData.salary}
//               onChange={handleChange}
//               placeholder="Insert Salary"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           {/* Department */}
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Department
//             </label>
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Select Department</option>
//               {departments.map((dep) => (
//                 <option key={dep._id} value={dep._id}>
//                   {dep.dep_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
//         >
//           Edit Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Edit;

import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: 0,
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const emp = response.data.employee;
          setFormData({
            name: emp?.userId?.name || "",
            maritalStatus: emp?.maritalStatus || "",
            designation: emp?.designation || "",
            department: emp?.department?._id || "",
            salary: emp?.salary || 0,
          });
        }
      } catch (error) {
        alert(error.response?.data?.error || "Failed to fetch employee.");
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert(response.data.error || "Update failed.");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Server error during update.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Insert Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Insert Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;
