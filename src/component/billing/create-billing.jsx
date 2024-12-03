import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
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
  const [error, setError] = useState(null);
  const [billPermission, setBillPermission] = useState(false);

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
        setError("Failed to fetch patients.");
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
      setAppointments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.patientId ||
      !formData.appointmentId ||
      !formData.totalAmount
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await billingService.createBilling(formData); // Create bill
      setFormData({
        patientId: "",
        appointmentId: "",
        totalAmount: "",
      });
      setSelectedPatient(null);
      setAppointments([]);
      onBillCreated(response.data); // Callback to refresh the billing list
      setError(null);
    } catch (error) {
      setError("Failed to create bill.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Bill
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
                    Selected Patient: {selectedPatient.firstName}{" "}
                    {selectedPatient.lastName}
                  </Typography>
                )}
              </Grid>

              {/* Appointment Select */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Appointment</InputLabel>
                  <Select
                    value={formData.appointmentId}
                    onChange={handleChange}
                    label="Select Appointment"
                    name="appointmentId"
                  >
                    {appointments.map((appointment) => (
                      <MenuItem key={appointment._id} value={appointment._id}>
                        {formatDate(appointment.appointmentDate)} -{" "}
                        {formatTime(appointment.appointmentTime)} (Dr.{" "}
                        {appointment.doctorId?.firstName}{" "}
                        {appointment.doctorId?.lastName})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Total Amount */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Total Amount"
                  name="totalAmount"
                  type="number"
                  fullWidth
                  required
                  value={formData.totalAmount}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!billPermission.canCreate}
                >
                  Create Bill
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingForm;
