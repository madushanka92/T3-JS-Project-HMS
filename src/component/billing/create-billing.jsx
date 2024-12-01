import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  appointmentService,
  billingService,
  patientService,
} from "../../_services/apiService";
import { formatDate, formatTime } from "../../_services/helpers";
import { getFeaturePermissions } from "../../utils/permissions";

const BillingForm = ({ onBillCreated }) => {
  const [patients, setPatients] = useState([]); // List of patients based on search
  const [appointments, setAppointments] = useState([]); // Appointments for selected patient
  const [searchQuery, setSearchQuery] = useState(""); // Search query for patient
  const [loadingPatients, setLoadingPatients] = useState(false); // Loading state for patients
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient
  const [formData, setFormData] = useState({
    patientId: "",
    appointmentId: "",
    totalAmount: "",
  });

  const [billPermission, setBillPermission ] = useState(false);

  useEffect(() => {
    setBillPermission(getFeaturePermissions("Billing"));
  }, []);

  // Fetch patients on search query change
  useEffect(() => {
    if (!searchQuery) {
      setPatients([]); // Clear patients if no search query
      return;
    }
    setLoadingPatients(true);
    const fetchPatients = async () => {
      try {
        const response = await patientService.getAllPatients(
          1,
          10,
          searchQuery
        );
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, [searchQuery]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    setFormData({ ...formData, patientId: patient._id });
    setSearchQuery(""); // Clear search query
    setPatients([]); // Clear patient list after selection

    try {
      const appointmentResponse =
        await appointmentService.getScheduledAppointmentsByPatient(patient._id);
      setAppointments(appointmentResponse.data);
    } catch (error) {
      if (error) setAppointments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await billingService.createBilling(formData); // Create bill
      setFormData({
        patientId: "",
        appointmentId: "",
        totalAmount: "",
      });
      onBillCreated(response.data); // Callback to refresh the billing list
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Create New Bill
      </Typography>

      {/* Patient Search Box */}
      <TextField
        label="Search Patient"
        name="patientId"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        fullWidth
        margin="normal"
      />

      {/* Display search results */}
      {patients.length > 0 && (
        <div>
          {patients.map((patient) => (
            <MenuItem
              key={patient._id}
              onClick={() => handlePatientSelect(patient)}
              style={{ cursor: "pointer" }}
            >
              {patient.firstName} {patient.lastName}
            </MenuItem>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loadingPatients && <CircularProgress size={24} />}

      {/* Selected Patient */}
      {formData.patientId && (
        <Typography variant="body1" color="textSecondary" marginTop={2}>
          Selected Patient: {selectedPatient.firstName}{" "}
          {selectedPatient.lastName}
        </Typography>
      )}

      {/* Appointment Selection */}
      <TextField
        label="Select Appointment"
        name="appointmentId"
        select
        fullWidth
        margin="normal"
        required
        value={formData.appointmentId}
        onChange={handleChange}
      >
        {appointments.map((appointment) => (
          <MenuItem key={appointment._id} value={appointment._id}>
            {formatDate(appointment.appointmentDate)} -{" "}
            {formatTime(appointment.appointmentTime)} (Dr.{" "}
            {appointment.doctorId?.firstName} {appointment.doctorId?.lastName})
          </MenuItem>
        ))}
      </TextField>

      {/* Total Amount */}
      <TextField
        label="Total Amount"
        name="totalAmount"
        type="number"
        fullWidth
        margin="normal"
        required
        value={formData.totalAmount}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!billPermission.canCreate}
      >
        Create Bill
      </Button>
    </Box>
  );
};

export default BillingForm;
