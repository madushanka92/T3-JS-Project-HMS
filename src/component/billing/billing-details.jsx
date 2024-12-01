import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentHistory from "../payment/payment-history";
import PaymentForm from "../payment/create-payment";
import { billingService } from "../../_services/apiService";
import { getFeaturePermissions } from "../../utils/permissions";

const BillingDetails = ({ bill, refreshBillList }) => {
  const [currentBill, setCurrentBill] = useState(bill); // Local state for bill
  const [refreshFlag, setRefreshFlag] = useState(false); // Flag to trigger payment history refresh
  const [loading, setLoading] = useState(false); // Loading state for fetching bill data
  const [error, setError] = useState(null); // Error handling state

  const [paymentPermission, setPaymentPermission] = useState(false);

  useEffect(() => {
    setPaymentPermission(getFeaturePermissions("Payments"));
  }, []);

  useEffect(() => {
    if (bill) {
      setCurrentBill(bill.row); // Update local state when a new bill is selected
    }
  }, [bill]);

  const fetchUpdatedBill = async () => {
    setLoading(true);
    try {
      const response = await billingService.getBillingById(currentBill._id); // API call to get updated bill
      setCurrentBill(response.data); // Update the local state with the fetched bill
      refreshBillList(response.data); // Propagate the update to the parent if needed
    } catch (error) {
      setError("Error fetching updated bill details.");
      console.error("Error fetching updated bill:", error);
    } finally {
      setLoading(false);
    }
  };

  const onAddPayment = (payment) => {
    if (payment) {
      setRefreshFlag((prev) => !prev); // Trigger refresh for payment history
      fetchUpdatedBill(); // Refetch the updated bill data
    }
  };

  if (!currentBill) {
    return (
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 2 }}>
        <Typography variant="h6">Select a bill to view details</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: "0 auto", padding: 2 }}>
      {/* Billing Details Section */}
      <Card variant="outlined" sx={{ marginBottom: 3 }}>
        <CardHeader
          avatar={
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          }
          title="Billing Details"
          subheader={`Bill ID: ${currentBill.id}`}
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Patient Name:</strong>
              </Typography>
              <Typography variant="body1">
                {currentBill.patientId?.firstName}{" "}
                {currentBill.patientId?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Total Amount:</strong>
              </Typography>
              <Typography variant="body1">
                ${currentBill.totalAmount?.$numberDecimal}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Remaining Amount:</strong>
              </Typography>
              <Typography variant="body1">
                ${currentBill.remainingAmount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Payment Status:</strong>
              </Typography>
              <Typography variant="body1">
                {currentBill.paymentStatus}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Payment History Section */}
      {paymentPermission.canRead && (
        <Card variant="outlined" sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Payment History
            </Typography>
            <PaymentHistory billId={currentBill.id} refreshFlag={refreshFlag} />
          </CardContent>
        </Card>
      )}

      {/* Add Payment Section */}
      {currentBill.paymentStatus !== "Paid" && paymentPermission.canCreate && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add Payment
            </Typography>
            <PaymentForm bill={currentBill} onAddPayment={onAddPayment} />
          </CardContent>
        </Card>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default BillingDetails;
