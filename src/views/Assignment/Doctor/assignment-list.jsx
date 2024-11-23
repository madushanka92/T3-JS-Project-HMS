import React, { useState, useEffect } from "react";
import { doctorAssignmentService } from "../../../_services/apiService"; // Assuming the service to fetch assignments
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch assignments data on component mount
  useEffect(() => {
    doctorAssignmentService
      .getAllAssignments() // Assuming this API call fetches all doctor-patient assignments
      .then((response) => {
        console.log("A : ", response);
        setAssignments(response.data); // Store fetched assignments
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load assignments.");
        setLoading(false);
      });
  }, []);

  // Handle view details of the assignment (for example, redirect to details page)
  const handleViewAssignment = (assignmentId) => {
    navigate(`/assignments/doctor/details/${assignmentId}`); // Assuming there's a details page for assignments
  };

  // Handle delete assignment (optional)
  const handleDeleteAssignment = (assignmentId) => {
    doctorAssignmentService
      .deleteAssignment(assignmentId) // Assuming this API deletes an assignment
      .then(() => {
        setAssignments(
          assignments.filter((assignment) => assignment._id !== assignmentId)
        );
      })
      .catch(() => {
        setError("Failed to delete assignment.");
      });
  };

  return (
    <div className="container">
      <h2>Doctor-Patient Assignments</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div>Loading...</div> // Display loading message while fetching data
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Status</th>
              <th>Primary Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td>{`${assignment.doctorUserId?.firstName} ${assignment.doctorUserId?.lastName}`}</td>
                  <td>{`${assignment.patientId?.firstName} ${assignment.patientId?.lastName}`}</td>
                  <td>{assignment.status}</td>
                  <td>{assignment.primaryDoctor ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleViewAssignment(assignment._id)}
                      disabled
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAssignment(assignment._id)}
                      className="ms-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No assignments available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AssignmentsList;
