import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
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
      <Typography>
        <strong>Patient:</strong> {appointmentData?.patientId?.firstName}{" "}
        {appointmentData?.patientId?.lastName}
      </Typography>
      <Typography>
        <strong>Doctor:</strong> {appointmentData?.doctorId?.firstName}{" "}
        {appointmentData?.doctorId?.lastName}
      </Typography>
      <Typography>
        <strong>Department:</strong>{" "}
        {appointmentData?.departmentId?.departmentName}
      </Typography>
      <Typography>
        <strong>Date:</strong> {formatDate(appointmentData?.appointmentDate)}
      </Typography>
      <Typography>
        <strong>Time:</strong> {formatTime(appointmentData?.appointmentTime)}
      </Typography>
      <Typography>
        <strong>Status:</strong> {appointmentData?.status}
      </Typography>
      <Typography>
        <strong>Type:</strong> {appointmentData?.type}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCancelAppointment}
        disabled={appointmentData?.status === "Canceled" || appointmentData?.status === "Completed"}
      >
        Cancel Appointment
      </Button>
    </Box>
  );
};

export default AppointmentDetails;
