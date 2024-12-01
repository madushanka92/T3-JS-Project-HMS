import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import AppointmentForm from "../../component/appointment/create-appointment";
import AppointmentList from "../../component/appointment/appointment-list";
import AppointmentDetails from "../../component/appointment/appointment-details";
import { appointmentService } from "../../_services/apiService";

const AppointmentPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // Flag to trigger refresh

  const handleAppointmentCreated = (newAppointment) => {
    if (newAppointment) setRefreshFlag((prev) => !prev); // Toggle flag to trigger refresh in AppointmentList
  };

  const handleAppointmentCancelled = (value) => {
    if (value) setRefreshFlag((prev) => !prev);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <AppointmentForm onAppointmentCreated={handleAppointmentCreated} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppointmentList
            refreshFlag={refreshFlag}
            onSelectAppointment={setSelectedAppointment}
          />
        </Grid>
        {selectedAppointment && (
          <Grid item xs={12}>
            <AppointmentDetails onAppointmentCancelled={handleAppointmentCancelled} appointment={selectedAppointment} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AppointmentPage;
