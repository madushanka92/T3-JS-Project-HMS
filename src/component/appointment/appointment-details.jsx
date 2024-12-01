import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { appointmentService } from "../../_services/apiService";
import { formatDate, formatTime } from "../../_services/helpers";

const AppointmentDetails = ({ onAppointmentCancelled, appointment }) => {
  const [appointmentData, setAppointmentData] = useState(appointment);

  useEffect(() => {
    setAppointmentData(appointment);
  }, [appointment]);

  const handleCancelAppointment = async () => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentData._id, {
        status: "Canceled",
      });
      setAppointmentData({ ...appointmentData, status: "Canceled" });
      onAppointmentCancelled(true);
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Appointment Details
      </Typography>

      {/* Appointment Info Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Patient:</strong>{" "}
                {appointmentData?.patientId?.firstName}{" "}
                {appointmentData?.patientId?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Doctor:</strong> {appointmentData?.doctorId?.firstName}{" "}
                {appointmentData?.doctorId?.lastName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Department:</strong>{" "}
                {appointmentData?.departmentId?.departmentName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Type:</strong> {appointmentData?.type}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Date:</strong>{" "}
                {formatDate(appointmentData?.appointmentDate)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Time:</strong>{" "}
                {formatTime(appointmentData?.appointmentTime)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Status:</strong> {appointmentData?.status}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider sx={{ my: 2 }} />

      {/* Cancel Appointment Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCancelAppointment}
        disabled={
          appointmentData?.status === "Canceled" ||
          appointmentData?.status === "Completed"
        }
        sx={{ width: "100%", maxWidth: 200 }}
      >
        Cancel Appointment
      </Button>
    </Box>
  );
};

export default AppointmentDetails;
