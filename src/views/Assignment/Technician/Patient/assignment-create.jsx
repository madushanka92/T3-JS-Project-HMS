import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  userService,
  patientService,
  techPatientAssignmentService,
} from "../../../../_services/apiService";
import { Button } from "react-bootstrap";

const CreateTechnicianPatientAssignment = () => {
  const [technicians, setTechnicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient
  const [filteredPatients, setFilteredPatients] = useState([]); // Store filtered patients based on search query
  const [formData, setFormData] = useState({
    technicianUserId: "",
    patientId: "",
    serviceType: "",
    status: "Scheduled",
    scheduledDateTime: "",
    completedDateTime: "",
    notes: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // Track search input for patients
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Technicians and Patients
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await userService.getAllUsers("Technician");
        setTechnicians(response.data);
      } catch (err) {
        setError("Failed to fetch technicians.");
      }
    };

    // const fetchPatients = async () => {
    //   try {
    //     const response = await patientService.getAllPatients();
    //     setPatients(response.data.patients);
    //     setFilteredPatients(response.data.patients); // Initially show all patients
    //   } catch (err) {
    //     setError("Failed to fetch patients.");
    //   }
    // };

    fetchTechnicians();
    // fetchPatients();
  }, []);

  // Handle patient search and filter patients based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPatients([]); // If search is empty, show all patients
    } else {
      patientService
        .getAllPatients(1, 10, searchQuery) // Assuming this is a service to search patients
        .then((response) => {
          setFilteredPatients(response.data.patients); // Update patients with search results
          //   setLoadingPatients(false); // Turn off loading
        })
        .catch((err) => {
          setError("Failed to search for patients.");
          //   setLoadingPatients(false);
        });
    }
  }, [searchQuery]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle patient selection from the search results
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setFormData((prevState) => ({
      ...prevState,
      patientId: patient._id,
    }));
    setSearchQuery(""); // Clear search query when a patient is selected
    setFilteredPatients([]); // Clear search results
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await techPatientAssignmentService.createAssignment(formData);
      navigate("/assignments/tech-patient/list"); // Navigate to the assignment list page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create assignment.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Technician-Patient Assignment</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Technician Selection */}
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

        {/* Patient Search Box */}
        <div className="mb-3">
          <label htmlFor="patientId" className="form-label">
            Search Patient
          </label>
          <input
            type="text"
            id="patientSearch"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            placeholder="Search patient by name or ID"
          />

          {/* Display search results */}
          {filteredPatients.length > 0 && (
            <ul className="list-group mt-2">
              {filteredPatients.map((patient) => (
                <li
                  key={patient._id}
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePatientSelect(patient)} // Select patient on click
                >
                  {patient.firstName} {patient.lastName}
                </li>
              ))}
            </ul>
          )}

          {/* No results message */}
          {searchQuery && filteredPatients.length === 0 && (
            <div className="mt-2">No patients found.</div>
          )}
        </div>

        {/* Display selected patient's name */}
        {selectedPatient && (
          <div className="form-group">
            <label>Selected Patient</label>
            <div>
              {selectedPatient?.firstName} {selectedPatient?.lastName}
            </div>
          </div>
        )}

        {/* Service Type */}
        <div className="mb-3">
          <label htmlFor="serviceType" className="form-label">
            Service Type
          </label>
          <select
            id="serviceType"
            name="serviceType"
            className="form-control"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Service Type --</option>
            <option value="Lab">Lab</option>
            <option value="Radiology">Radiology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Respiratory">Respiratory</option>
          </select>
        </div>

        {/* Scheduled Date and Time */}
        <div className="mb-3">
          <label htmlFor="scheduledDateTime" className="form-label">
            Scheduled Date and Time
          </label>
          <input
            type="datetime-local"
            id="scheduledDateTime"
            name="scheduledDateTime"
            className="form-control"
            value={formData.scheduledDateTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Completed Date and Time */}
        <div className="mb-3">
          <label htmlFor="completedDateTime" className="form-label">
            Completed Date and Time (Optional)
          </label>
          <input
            type="datetime-local"
            id="completedDateTime"
            name="completedDateTime"
            className="form-control"
            value={formData.completedDateTime || ""}
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
            required
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
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
            placeholder="Add any notes (optional)"
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

export default CreateTechnicianPatientAssignment;
