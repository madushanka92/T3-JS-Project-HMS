import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
} from "@mui/material";
import {
  patientService,
  departmentService,
  userService,
  appointmentService,
} from "../../_services/apiService";

const CreateAppointment = ({ onAppointmentCreated }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((err) => setError("Failed to load departments"));

    userService
      .getAllUsers("Doctor")
      .then((response) => setDoctors(response.data))
      .catch((err) => setError("Failed to load doctors"));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setPatients([]);
      return;
    }

    setLoadingPatients(true);
    patientService
      .getAllPatients(1, 10, searchQuery)
      .then((response) => {
        setPatients(response.data.patients);
        setLoadingPatients(false);
      })
      .catch((err) => {
        setError("Failed to search patients.");
        setLoadingPatients(false);
      });
  }, [searchQuery]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery("");
    setPatients([]);
  };

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
      type: appointmentType,
    };

    appointmentService
      .createAppointment(appointmentData)
      .then((data) => {
        setSelectedPatient(null);
        setSelectedDoctor(null);
        setSelectedDepartment("");
        setAppointmentDate("");
        setAppointmentTime("");
        setAppointmentType("");
        setError(null);
        onAppointmentCreated(data.data);
        navigate("/appointments");
      })
      .catch((err) => setError("Failed to create appointment."));
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    const timeInput = document.getElementById("appointmentTime");
    if (timeInput) {
      timeInput.setAttribute("min", currentTime);
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Appointment
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Card variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Patient Search */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Search Patient"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Name or ID"
                  variant="outlined"
                />
                {patients.length > 0 && (
                  <Box sx={{ maxHeight: 200, overflowY: "auto", marginTop: 1 }}>
                    {patients.map((patient) => (
                      <Box
                        key={patient._id}
                        sx={{
                          padding: 1,
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f0f0f0" },
                        }}
                        onClick={() => handlePatientSelect(patient)}
                      >
                        {patient.firstName} {patient.lastName}
                      </Box>
                    ))}
                  </Box>
                )}
                {loadingPatients && <CircularProgress size={24} />}
                {selectedPatient && (
                  <Typography sx={{ marginTop: 1 }}>
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </Typography>
                )}
              </Grid>

              {/* Doctor Select */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Doctor</InputLabel>
                  <Select
                    value={selectedDoctor || ""}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    label="Select Doctor"
                  >
                    <MenuItem value="">-- Select Doctor --</MenuItem>
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor._id} value={doctor._id}>
                        {doctor.firstName} {doctor.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Department Select */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Department</InputLabel>
                  <Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    label="Select Department"
                  >
                    <MenuItem value="">-- Select Department --</MenuItem>
                    {departments.map((department) => (
                      <MenuItem key={department._id} value={department._id}>
                        {department.departmentName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Appointment Type */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Appointment Type</InputLabel>
                  <Select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    label="Appointment Type"
                  >
                    <MenuItem value="">-- Select Appointment Type --</MenuItem>
                    <MenuItem value="Meeting">Meeting</MenuItem>
                    <MenuItem value="In-Person">In-Person</MenuItem>
                    <MenuItem value="Checkup">Checkup</MenuItem>
                    <MenuItem value="Emergency">Emergency</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Appointment Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  label="Appointment Date"
                  fullWidth
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                />
              </Grid>

              {/* Appointment Time */}
              <Grid item xs={12} md={6}>
                <TextField
                  type="time"
                  label="Appointment Time"
                  fullWidth
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: "10px" }}
                >
                  Create Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateAppointment;
