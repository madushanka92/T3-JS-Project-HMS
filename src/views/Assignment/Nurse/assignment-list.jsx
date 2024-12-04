import React, { useState, useEffect } from "react";
import { nurseAssignmentService } from "../../../_services/apiService";
import { Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NurseDoctorAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    setLoading(true);
    nurseAssignmentService
      .getAllAssignments() // Fetch the assignments (replace with your actual API service)
      .then((response) => {
        setAssignments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch assignments.");
        setLoading(false);
      });
  };

  const handleEdit = (assignmentId) => {
    navigate(`/assignments/nurse-doctor/edit/${assignmentId}`);
  };

  const handleDelete = (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      nurseAssignmentService
        .deleteAssignment(assignmentId) // Replace with actual delete service
        .then(() => {
          fetchAssignments(); // Refresh the list after deletion
        })
        .catch((err) => setError("Failed to delete the assignment."));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Nurse-Doctor Assignments</h2>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && assignments.length === 0 && (
        <div className="alert alert-info">No assignments found.</div>
      )}
      {!loading && assignments.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nurse</th>
              <th>Doctor</th>
              <th>Assigned Date</th>
              <th>Shift Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{`${assignment.nurseUserId?.firstName} ${assignment.nurseUserId?.lastName}`}</td>
                <td>{`${assignment.doctorUserId?.firstName} ${assignment.doctorUserId?.lastName}`}</td>
                <td>
                  {new Date(assignment.assignedDate).toLocaleDateString()}
                </td>
                <td>{assignment.shiftType}</td>
                <td>{assignment.status}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(assignment._id)}
                    className="me-2"
                    disabled
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default NurseDoctorAssignmentList;
