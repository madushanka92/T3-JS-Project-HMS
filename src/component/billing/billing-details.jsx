import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import PaymentHistory from "../payment/payment-history";
import PaymentForm from "../payment/create-payment";
import { billingService } from "../../_services/apiService";
import { getFeaturePermissions } from "../../utils/permissions";

const BillingDetails = ({ bill, refreshBillList }) => {
  const [currentBill, setCurrentBill] = useState(bill); // Local state for bill
  const [refreshFlag, setRefreshFlag] = useState(false); // Flag to trigger payment history refresh

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
    try {
      const response = await billingService.getBillingById(currentBill._id); // API call to get updated bill
      setCurrentBill(response.data); // Update the local state with the fetched bill
      refreshBillList(response.data); // Propagate the update to the parent if needed
    } catch (error) {
      console.error("Error fetching updated bill:", error);
    }
  };

  const onAddPayment = (payment) => {
    if (payment) {
      setRefreshFlag((prev) => !prev); // Trigger refresh for payment history
      fetchUpdatedBill(); // Refetch the updated bill data
    }
  };

  if (!currentBill)
    return <Typography variant="h6">Select a bill to view details</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Billing Details
      </Typography>
      <Typography variant="subtitle1">Bill ID: {currentBill.id}</Typography>
      <Typography variant="subtitle1">
        Patient Name: {currentBill.patientId?.firstName}{" "}
        {currentBill.patientId?.lastName}
      </Typography>
      <Typography variant="subtitle1">
        Total Amount: ${currentBill.totalAmount?.$numberDecimal}
      </Typography>
      <Typography variant="subtitle1">
        Remaining: ${currentBill.remainingAmount}
      </Typography>
      <Typography variant="subtitle1">
        Payment Status: {currentBill.paymentStatus}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {paymentPermission.canRead && (
        <>
          <Typography variant="h5" gutterBottom>
            Payment History
          </Typography>
          <PaymentHistory billId={currentBill.id} refreshFlag={refreshFlag} />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {currentBill.paymentStatus !== "Paid" && paymentPermission.canCreate && (
        <>
          <Typography variant="h5" gutterBottom>
            Add Payment
          </Typography>
          <PaymentForm bill={currentBill} onAddPayment={onAddPayment} />
        </>
      )}
    </Box>
  );
};

export default BillingDetails;
