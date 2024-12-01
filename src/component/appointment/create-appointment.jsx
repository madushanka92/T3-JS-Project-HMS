import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  patientService,
  departmentService,
  userService,
  appointmentService,
} from "../../_services/apiService";

const CreateAppointment = ({ onAppointmentCreated }) => {
  const [patients, setPatients] = useState([]); // Store all patients from search
  const [doctors, setDoctors] = useState([]); // Store all doctors for selection
  const [departments, setDepartments] = useState([]); // Store departments for selection
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor
  const [selectedDepartment, setSelectedDepartment] = useState(""); // Store selected department
  const [appointmentDate, setAppointmentDate] = useState(""); // Store appointment date
  const [appointmentTime, setAppointmentTime] = useState(""); // Store appointment time
  const [appointmentType, setAppointmentType] = useState(""); // Store appointment type
  const [searchQuery, setSearchQuery] = useState(""); // Store search input for patients
  const [loadingPatients, setLoadingPatients] = useState(false); // Track loading state for patient search
  const [error, setError] = useState(null); // Track error messages
  const navigate = useNavigate();

  // Fetch all doctors and departments on component load
  useEffect(() => {
    // Fetch departments
    departmentService
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((err) => setError("Failed to load departments"));

    // Fetch doctors
    userService
      .getAllUsers("Doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((err) => setError("Failed to load doctors"));
  }, []);

  // Handle patient search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setPatients([]); // Clear the list when the search query is empty
      return;
    }

    setLoadingPatients(true);
    patientService
      .getAllPatients(1, 10, searchQuery)
      .then((response) => {
        setPatients(response.data.patients); // Set patients based on the search results
        setLoadingPatients(false);
      })
      .catch((err) => {
        setError("Failed to search patients.");
        setLoadingPatients(false);
      });
  }, [searchQuery]);

  // Handle patient selection from the search results
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery(""); // Clear search query after selection
    setPatients([]); // Clear patient list
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !selectedPatient ||
      !selectedDoctor ||
      !selectedDepartment ||
      !appointmentDate ||
      !appointmentTime ||
      !appointmentType
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    const appointmentData = {
      patientId: selectedPatient._id,
      doctorId: selectedDoctor,
      departmentId: selectedDepartment,
      appointmentDate,
      appointmentTime,
      status: "Scheduled",
      type: appointmentType, // Added the type value
    };

    appointmentService
      .createAppointment(appointmentData)
      .then((data) => {
        setSelectedPatient(null);
        setSelectedDoctor(null);
        setSelectedDepartment("");
        setAppointmentDate("");
        setAppointmentTime("");
        setAppointmentType(""); // Reset the type field
        setError(null); // Clear error
        onAppointmentCreated(data.data);
        navigate("/appointments"); // Redirect after success
      })
      .catch((err) => setError("Failed to create appointment."));
  };

  // Get today's date in the required YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Get current time in HH:MM format
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    // Set the min attribute for the input to the current time
    const timeInput = document.getElementById("appointmentTime");
    if (timeInput) {
      timeInput.setAttribute("min", currentTime);
    }
  }, []);

  return (
    <div className="container">
      <h2>Create Appointment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {/* Patient Search Box */}
          <div className="form-group col-md-6">
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

            {/* Loading indicator */}
            {loadingPatients && (
              <div className="mt-2 text-center">Loading...</div>
            )}

            {selectedPatient && (
              <div className="mt-2 text-start">
                {selectedPatient.firstName} {selectedPatient.lastName}
              </div>
            )}
          </div>

          {/* Doctor Select */}
          <div className="form-group col-md-6">
            <label htmlFor="doctorSelect">Select Doctor</label>
            <select
              id="doctorSelect"
              className="form-control"
              value={selectedDoctor || ""}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          {/* Department Select */}
          <div className="form-group col-md-6">
            <label htmlFor="departmentSelect">Select Department</label>
            <select
              id="departmentSelect"
              className="form-control"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">-- Select Department --</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Type */}
          <div className="form-group col-md-6">
            <label htmlFor="appointmentType">Appointment Type</label>
            <select
              id="appointmentType"
              className="form-control"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
            >
              <option value="">-- Select Appointment Type --</option>
              <option value="Meeting">Meeting</option>
              <option value="In-Person">In-Person</option>
              <option value="Checkup">Checkup</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          {/* Appointment Date */}
          <div className="form-group col-md-6">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              className="form-control"
              value={appointmentDate}
              min={today} // Set the minimum date to today
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>

          {/* Appointment Time */}
          <div className="form-group col-md-6">
            <label htmlFor="appointmentTime">Appointment Time</label>
            <input
              type="time"
              id="appointmentTime"
              className="form-control"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
