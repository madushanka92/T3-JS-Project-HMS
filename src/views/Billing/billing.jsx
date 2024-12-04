import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import BillingForm from "../../component/billing/create-billing";
import BillingList from "../../component/billing/billing-list";
import BillingDetails from "../../component/billing/billing-details";

const BillingPage = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // Flag to trigger refresh

  const handleBillCreated = (newBill) => {
    if (newBill) setRefreshFlag((prev) => !prev);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <BillingForm onBillCreated={handleBillCreated} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BillingList
            onSelectBill={setSelectedBill}
            refreshFlag={refreshFlag}
          />
        </Grid>
        <Grid item xs={12}>
          <BillingDetails bill={selectedBill} refreshBillList={handleBillCreated}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingPage;
