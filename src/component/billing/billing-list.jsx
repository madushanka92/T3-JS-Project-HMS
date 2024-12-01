import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography } from "@mui/material";
import { billingService } from "../../_services/apiService";

const BillingList = ({ refreshFlag, onSelectBill }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await billingService.getAllBillings(); // Fetch bills from API
        const transformedBills = response.data.map((bill) => ({
          ...bill,
          id: bill._id, // Add 'id' field which the DataGrid expects
        }));
        setBills(transformedBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, [refreshFlag]);

  const columns = [
    { field: "id", headerName: "Bill ID", width: 100 },
    {
      field: "patientId",
      headerName: "Patient Name",
      width: 200,
      valueGetter: (params) => params.firstName + " " + params.lastName,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      valueGetter: (params) => params.$numberDecimal,
    },
    { field: "remainingAmount", headerName: "Remaining", width: 150 },
    { field: "paymentStatus", headerName: "Payment Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => onSelectBill(params)}
          >
            Details
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Billing List
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={bills}
          columns={columns}
          loading={loading}
          pageSize={5}
        />
      </div>
    </Box>
  );
};

export default BillingList;
