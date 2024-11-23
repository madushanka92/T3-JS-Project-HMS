import React, { useState, useEffect } from "react";
import {
  userService,
  doctorAssignmentService,
  patientService,
} from "../../../_services/apiService";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]); // Store all patients from search
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient
  const [primaryDoctor, setPrimaryDoctor] = useState(true);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Active");
  const [role, setRole] = useState(""); // Store the selected role
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Store search input for patients
  const [loadingPatients, setLoadingPatients] = useState(false); // Track loading state for patient search
  const navigate = useNavigate();

  // Fetch users (doctors) from the system
  useEffect(() => {
    userService
      .getAllUsers() // Fetch all users
      .then((response) => {
        const doctors = response.data.filter(
          (user) => user.roleId?.roleName === "Doctor"
        );
        setUsers(doctors);
      })
      .catch((err) => setError("Failed to load users."));
  }, []);

  // Handle patient search and update the list based on the query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setPatients([]); // Clear the list when the search query is empty
      return;
    }

    // Search patients from API if the query is not empty
    setLoadingPatients(true);
    patientService
      .getAllPatients(1, 10, searchQuery) // Assuming this is a service to search patients
      .then((response) => {
        setPatients(response.data.patients); // Update patients with search results
        setLoadingPatients(false); // Turn off loading
      })
      .catch((err) => {
        setError("Failed to search for patients.");
        setLoadingPatients(false);
      });
  }, [searchQuery]); // Re-run the search every time the searchQuery changes

  // Handle user selection (Doctor)
  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    const user = users.find((user) => user._id === userId);
    setRole(user ? user.role : "");
  };

  // Handle patient selection from the search results
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery(""); // Clear search box after selecting patient
    setPatients([]); // Clear patient list after selection
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedUser || !selectedPatient) {
      setError("Please fill out all required fields.");
      return;
    }

    const assignmentData = {
      doctorUserId: selectedUser,
      patientId: selectedPatient._id,
      primaryDoctor,
      notes,
      status,
    };

    // Assuming only doctors have assignments to create
    // if (role === "Doctor") {
    doctorAssignmentService
      .createAssignment(assignmentData)
      .then(() => {
        setSelectedPatient(""); // Reset the patient selection
        setPrimaryDoctor(true); // Reset primary doctor checkbox
        setNotes(""); // Clear notes field
        setStatus("Active"); // Reset status
        setSelectedUser(null); // Reset selected user
        setError(null); // Clear error
        //   navigate("/assignments"); // Redirect to assignments list after success
      })
      .catch((err) => setError("Failed to create assignment."));
    // }
  };

  return (
    <div className="container">
      <h2>Create Doctor Assignment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* User Select (Doctor) */}
        <div className="form-group">
          <label htmlFor="userSelect">Select Doctor</label>
          <select
            id="userSelect"
            className="form-control"
            value={selectedUser || ""}
            onChange={handleUserSelect}
          >
            <option value="">-- Select Doctor --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Search Box */}
        <div className="form-group">
          <label htmlFor="patientSearch">Search Patient</label>
          <input
            type="text"
            id="patientSearch"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
            placeholder="Search patient by name or ID"
          />

          {/* Display search results */}
          {patients.length > 0 && (
            <ul className="list-group mt-2">
              {patients.map((patient) => (
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

          {/* Display loading indicator */}
          {loadingPatients && (
            <div className="mt-2 text-center">
              <i>Loading...</i>
            </div>
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

        {/* Primary Doctor Checkbox */}
        <div className="form-group">
          <label htmlFor="primaryDoctor">
            <input
              type="checkbox"
              id="primaryDoctor"
              checked={primaryDoctor}
              onChange={(e) => setPrimaryDoctor(e.target.checked)}
            />
            Primary Doctor
          </label>
        </div>

        {/* Status Selection */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Transferred">Transferred</option>
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any notes"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
