import React, { useState, useEffect } from "react";
import { techPatientAssignmentService } from "../../../../_services/apiService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TechnicianPatientAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all technician-patient assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await techPatientAssignmentService.getAllAssignments();
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to fetch assignments.");
      }
    };

    fetchAssignments();
  }, []);

  // Handle delete assignment
  const handleDelete = async (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await techPatientAssignmentService.deleteAssignment(assignmentId);
        setAssignments(
          assignments.filter((assignment) => assignment._id !== assignmentId)
        );
      } catch (err) {
        setError("Failed to delete assignment.");
      }
    }
  };

  // Handle navigate to the edit page
  const handleEdit = (assignmentId) => {
    navigate(`/assignments/tech-patient/edit/${assignmentId}`);
  };

  return (
    <div className="container mt-5">
      <h2>Technician-Patient Assignments</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Assignments Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Technician</th>
            <th>Patient</th>
            <th>Service Type</th>
            <th>Status</th>
            <th>Scheduled Date/Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>
                  {assignment.technicianUserId.firstName}{" "}
                  {assignment.technicianUserId.lastName}
                </td>
                <td>
                  {assignment.patientId.firstName}{" "}
                  {assignment.patientId.lastName}
                </td>
                <td>{assignment.serviceType}</td>
                <td>{assignment.status}</td>
                <td>
                  {new Date(assignment.scheduledDateTime).toLocaleString()}
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(assignment._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(assignment._id)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No assignments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianPatientAssignmentList;
