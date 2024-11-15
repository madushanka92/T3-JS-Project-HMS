import React, { useState, useEffect } from "react";
import { patientService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    patientService
      .getAllPatients()
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
      })
      .catch((err) => setError("Failed to load patients."));
  }, []);

  const handleEdit = (id) => navigate(`/patients/edit/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      patientService
        .deletePatient(id)
        .then(() => setPatients((prev) => prev.filter((p) => p._id !== id)))
        .catch(() => setError("Failed to delete patient."));
    }
  };

  return (
    <div className="container">
      <h2 className="text-start">Patient List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="btn btn-primary"
        onClick={() => navigate("/patients/create")}
      >
        Add Patient
      </button>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{new Date(p.dateOfBirth).toLocaleDateString()}</td>
              <td>{p.gender}</td>
              <td>{p.contactNumber || "N/A"}</td>
              <td>
                <button
                  className="btn btn-warning mr-3"
                  onClick={() => handleEdit(p._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p._id)}
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

export default PatientListPage;
