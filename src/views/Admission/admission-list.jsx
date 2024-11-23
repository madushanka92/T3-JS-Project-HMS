import React, { useState, useEffect } from "react";
import { admissionService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const AdmissionList = () => {
  const [admissions, setAdmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch admissions
  useEffect(() => {
    const fetchAdmissions = async () => {
      setIsLoading(true);
      try {
        const response = await admissionService.getAllAdmissions(); // Assuming this API exists
        setAdmissions(response.data);
      } catch (error) {
        console.error("Error fetching admissions", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

  // Handle delete admission
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admission?")) {
      try {
        await admissionService.deleteAdmission(id); // Assuming this API exists
        setAdmissions(admissions.filter((admission) => admission._id !== id));
        alert("Admission deleted successfully");
      } catch (error) {
        alert("Error deleting admission: " + error.message);
      }
    }
  };

  // Handle edit admission
  const handleEdit = (id) => {
    navigate(`/admissions/edit/${id}`); // Navigate to the edit page
  };

  return (
    <div className="container mt-5">
      <h2>Admissions List</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Room</th>
              <th>Department</th>
              <th>Admission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.length > 0 ? (
              admissions.map((admission, index) => (
                <tr key={admission._id}>
                  <td>{index + 1}</td>
                  <td>
                    {admission.patientId?.firstName}{" "}
                    {admission.patientId?.lastName}
                  </td>
                  <td>{admission.roomId?.roomNumber || "Pending"}</td>
                  <td>{admission.departmentId?.departmentName}</td>
                  <td>{new Date(admission.admissionDate).toLocaleString()}</td>
                  <td>{admission.admissionStatus}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(admission._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(admission._id)}
                      disabled={
                        admission.admissionStatus !== "Active" &&
                        admission.admissionStatus !== "Pending"
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No admissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdmissionList;
