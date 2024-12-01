import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
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
    <Card variant="outlined" sx={{ maxWidth: 600, margin: "0 auto" }}>
      <CardHeader
        avatar={<PaymentIcon color="primary" />}
        title="Add Payment"
        subheader={`Bill ID: ${bill?.id}`}
        titleTypographyProps={{ variant: "h5" }}
        subheaderTypographyProps={{ color: "text.secondary" }}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Amount Paid */}
            <Grid item xs={12}>
              <TextField
                label="Amount Paid"
                name="amountPaid"
                type="number"
                fullWidth
                required
                variant="outlined"
                value={formData.amountPaid}
                onChange={handleChange}
              />
            </Grid>

            {/* Payment Method */}
            <Grid item xs={12}>
              <TextField
                label="Payment Method"
                name="paymentMethod"
                select
                fullWidth
                required
                variant="outlined"
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
            </Grid>

            {/* Remarks */}
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                name="remarks"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={formData.remarks}
                onChange={handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
