import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  techDepartmentAssignmentService,
  userService,
  departmentService,
} from "../../../../_services/apiService";
import { Button } from "react-bootstrap";

const TechnicianDepartmentAssignmentCreate = () => {
  const [technicians, setTechnicians] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    technicianUserId: "",
    departmentId: "",
    workShift: "",
    status: "Active",
    startDate: "",
    endDate: "",
    notes: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch technicians and departments
  useEffect(() => {
    userService
      .getAllUsers()
      .then((response) => {
        const technicians = response.data.filter(
          (user) => user.roleId?.roleName === "Technician"
        );
        setTechnicians(technicians);
      })
      .catch(() => setError("Failed to load technicians."));

    departmentService
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch(() => setError("Failed to load departments."));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.technicianUserId ||
      !formData.departmentId ||
      !formData.workShift
    ) {
      setError("Please fill all required fields.");
      return;
    }

    techDepartmentAssignmentService
      .createAssignment(formData)
      .then(() => {
        navigate("/assignments/technician/list"); // Redirect to list page
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Failed to create the assignment."
        );
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create Technician-Department Assignment</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Technician Select */}
        <div className="mb-3">
          <label htmlFor="technicianUserId" className="form-label">
            Select Technician
          </label>
          <select
            id="technicianUserId"
            name="technicianUserId"
            className="form-select"
            value={formData.technicianUserId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Technician --</option>
            {technicians.map((technician) => (
              <option key={technician._id} value={technician._id}>
                {technician.firstName} {technician.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Department Select */}
        <div className="mb-3">
          <label htmlFor="departmentId" className="form-label">
            Select Department
          </label>
          <select
            id="departmentId"
            name="departmentId"
            className="form-select"
            value={formData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Work Shift Select */}
        <div className="mb-3">
          <label htmlFor="workShift" className="form-label">
            Work Shift
          </label>
          <select
            id="workShift"
            name="workShift"
            className="form-select"
            value={formData.workShift}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Work Shift --</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
            <option value="All Day">All Day</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date (Optional)
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary">
          Create Assignment
        </Button>
      </form>
    </div>
  );
};

export default TechnicianDepartmentAssignmentCreate;
