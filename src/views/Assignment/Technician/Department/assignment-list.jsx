import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { techDepartmentAssignmentService } from "../../../../_services/apiService";
import { Button, Table, Spinner } from "react-bootstrap";

const TechnicianDepartmentAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch assignments from the backend
  useEffect(() => {
    techDepartmentAssignmentService
      .getAllAssignments()
      .then((response) => {
        setAssignments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load assignments.");
        setLoading(false);
      });
  }, []);

  // Delete an assignment
  const handleDelete = (assignmentId) => {
    if (!window.confirm("Are you sure you want to delete this assignment?"))
      return;

    techDepartmentAssignmentService
      .deleteAssignment(assignmentId)
      .then(() => {
        setAssignments((prev) =>
          prev.filter((assignment) => assignment._id !== assignmentId)
        );
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Failed to delete the assignment."
        );
      });
  };

  // Render loading spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Render error message
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Technician-Department Assignments</h2>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Technician</th>
            <th>Department</th>
            <th>Work Shift</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>
                  {assignment.technicianUserId?.firstName}{" "}
                  {assignment.technicianUserId?.lastName}
                </td>
                <td>{assignment.departmentId?.departmentName}</td>
                <td>{assignment.workShift}</td>
                <td>{assignment.status}</td>
                <td>{new Date(assignment.startDate).toLocaleDateString()}</td>
                <td>
                  {assignment.endDate
                    ? new Date(assignment.endDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No assignments found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TechnicianDepartmentAssignmentList;
