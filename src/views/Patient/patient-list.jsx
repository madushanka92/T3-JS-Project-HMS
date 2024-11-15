import React, { useState, useEffect } from "react";
import { patientService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // search query
  const [currentPage, setCurrentPage] = useState(1); //  current page
  const [pageSize, setPageSize] = useState(10); //  page size
  const [totalRecords, setTotalRecords] = useState(0); // Total records to get number of pages
  const navigate = useNavigate();

  useEffect(() => {
    patientService
      .getAllPatients(currentPage, pageSize, searchQuery)
      .then((response) => {
        setPatients(response.data.patients);
        setTotalRecords(response.data.totalPatients);
        setCurrentPage(response.data.currentPage);
      })
      .catch((err) => setError("Failed to load patients."));
  }, [currentPage, pageSize, searchQuery]);

  const handleEdit = (id) => navigate(`/patients/edit/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      patientService
        .deletePatient(id)
        .then(() => setPatients((prev) => prev.filter((p) => p._id !== id)))
        .catch(() => setError("Failed to delete patient."));
    }
  };

  const totalPages = Math.ceil(totalRecords / pageSize); // total pages

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // valid pages
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2 className="text-start">Patient List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-group mb-3">
        <label htmlFor="search">Search Patients</label>
        <input
          type="text"
          id="search"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by first name, last name, or contact number"
        />
      </div>

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

      <div className="pagination">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientListPage;
