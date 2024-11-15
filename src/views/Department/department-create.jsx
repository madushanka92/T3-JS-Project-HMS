import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { departmentService, userService } from "../../_services/apiService";

const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departmentName: "",
    headOfDepartmentId: "",
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users for Head of Department.");
      });
  }, []);

  useEffect(() => {
    if (id) {
      departmentService
        .getAllDepartments()
        .then((response) => {
          const department = response.data.find((d) => d._id === id);
          if (department) {
            setFormData(department);
          }
        })
        .catch((error) => console.error("Error fetching department:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? departmentService.updateDepartment(id, formData)
      : departmentService.createDepartment(formData);

    apiCall
      .then(() => navigate("/departments/list"))
      .catch((error) => console.error("Error saving department:", error));
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Department" : "Create Department"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name</label>
          <input
            type="text"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Head of Department</label>
          <select
            name="headOfDepartmentId"
            value={formData.headOfDepartmentId || ""}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">-- Select Head of Department (Optional) --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
