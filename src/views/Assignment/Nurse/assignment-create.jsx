import React, { useState, useEffect } from "react";
import {
  userService,
  nurseAssignmentService,
} from "../../../_services/apiService";
import { useNavigate } from "react-router-dom";

const CreateNurseDoctorAssignment = () => {
  const [nurses, setNurses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    nurseUserId: "",
    doctorUserId: "",
    assignedDate: new Date().toISOString().split("T")[0],
    status: "Active",
    shiftType: "Morning",
    notes: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch nurses and doctors from the system
  useEffect(() => {
    userService
      .getAllUsers()
      .then((response) => {
        const doctors = response.data.filter(
          (user) => user.roleId?.roleName === "Doctor"
        );
        const nurses = response.data.filter(
          (user) => user.roleId?.roleName === "Nurse"
        );
        setDoctors(doctors);
        setNurses(nurses);
      })
      .catch((err) => setError("Failed to load doctors or nurses."));
  }, []);

  // Generic Change Handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.nurseUserId || !formData.doctorUserId) {
      setError("Please select both a nurse and a doctor.");
      return;
    }

    nurseAssignmentService
      .createAssignment(formData)
      .then(() => {
        setFormData({
          nurseUserId: "",
          doctorUserId: "",
          assignedDate: new Date().toISOString().split("T")[0],
          status: "Active",
          shiftType: "Morning",
          notes: "",
        });
        setError(null);
        navigate("/assignments/nurse/list");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Failed to create nurse-doctor assignment.");
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create Nurse-Doctor Assignment</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Nurse Select */}
        <div className="mb-3">
          <label htmlFor="nurseUserId" className="form-label">
            Select Nurse
          </label>
          <select
            id="nurseUserId"
            name="nurseUserId"
            className="form-select"
            value={formData.nurseUserId}
            onChange={handleChange}
          >
            <option value="">-- Select Nurse --</option>
            {nurses.map((nurse) => (
              <option key={nurse._id} value={nurse._id}>
                {nurse.firstName} {nurse.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Select */}
        <div className="mb-3">
          <label htmlFor="doctorUserId" className="form-label">
            Select Doctor
          </label>
          <select
            id="doctorUserId"
            name="doctorUserId"
            className="form-select"
            value={formData.doctorUserId}
            onChange={handleChange}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Assigned Date */}
        <div className="mb-3">
          <label htmlFor="assignedDate" className="form-label">
            Assigned Date
          </label>
          <input
            type="date"
            id="assignedDate"
            name="assignedDate"
            className="form-control"
            value={formData.assignedDate}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
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
            <option value="Temporary">Temporary</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {/* Shift Type */}
        <div className="mb-3">
          <label htmlFor="shiftType" className="form-label">
            Shift Type
          </label>
          <select
            id="shiftType"
            name="shiftType"
            className="form-select"
            value={formData.shiftType}
            onChange={handleChange}
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
            <option value="All Day">All Day</option>
          </select>
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
            placeholder="Enter any notes"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateNurseDoctorAssignment;
