import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { paymentService } from "../../_services/apiService";

const PaymentForm = ({ bill, onAddPayment }) => {
  const [formData, setFormData] = useState({
    amountPaid: "",
    paymentMethod: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paymentService.createPayment({
        ...formData,
        billId: bill._id,
        patientId: bill.patientId._id,
      });
      onAddPayment(true); // Refresh payments
      setFormData({
        amountPaid: "",
        paymentMethod: "",
        remarks: "",
      });
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Amount Paid"
        name="amountPaid"
        type="number"
        fullWidth
        margin="normal"
        required
        value={formData.amountPaid}
        onChange={handleChange}
      />
      <TextField
        label="Payment Method"
        name="paymentMethod"
        select
        fullWidth
        margin="normal"
        required
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        {[
          "Credit Card",
          "Cash",
          "Insurance",
          "Debit Card",
          "Bank Transfer",
        ].map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Remarks"
        name="remarks"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={formData.remarks}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Payment
      </Button>
    </Box>
  );
};

export default PaymentForm;
