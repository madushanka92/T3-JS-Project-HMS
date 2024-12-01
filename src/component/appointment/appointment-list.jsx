import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { appointmentService } from "../../_services/apiService";

const AppointmentList = ({ refreshFlag, onSelectAppointment }) => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments whenever the refreshFlag changes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentService.getAllAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [refreshFlag]); // Re-fetch appointments whenever refreshFlag changes

  const handleSelectAppointment = (appointment) => {
    onSelectAppointment(appointment);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await appointmentService.deleteAppointment(appointmentId);
      setAppointments(appointments.filter((a) => a._id !== appointmentId)); // Remove from list
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>
                  {appointment.patientId?.firstName}{" "}
                  {appointment.patientId?.lastName}
                </TableCell>
                <TableCell>
                  {appointment.doctorId?.firstName}{" "}
                  {appointment.doctorId?.lastName}
                </TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>{appointment.appointmentTime}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteAppointment(appointment._id)}
                    disabled={
                      appointment.status === "Canceled" ||
                      appointment.status === "Completed"
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AppointmentList;
