import React, { useState, useEffect } from "react";
import { departmentService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      departmentService
        .deleteDepartment(id)
        .then(() => {
          setDepartments((prev) => prev.filter((d) => d._id !== id));
        })
        .catch((error) => console.error("Error deleting department:", error));
    }
  };

  return (
    <div className="container department-list">
      <h2 className="text-start">Department List</h2>
      <button
        onClick={() => navigate("/departments/create")}
        className="btn btn-primary add-new"
      >
        Create New Department
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Head of Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d._id}>
              <td>{d.departmentName}</td>
              <td>
                {d.headOfDepartmentId
                  ? `${d.headOfDepartmentId.firstName || ""} ${
                      d.headOfDepartmentId.lastName || ""
                    }`.trim()
                  : "N/A"}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(d._id)}
                  className="btn btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
