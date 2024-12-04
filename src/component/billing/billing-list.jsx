import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { billingService } from "../../_services/apiService";
import { getFeaturePermissions } from "../../utils/permissions";

const BillingList = ({ refreshFlag, onSelectBill }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billPermission, setBillPermission] = useState(false);

  useEffect(() => {
    setBillPermission(getFeaturePermissions("Billing"));
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await billingService.getAllBillings(); // Fetch bills from API
        const transformedBills = response.data.map((bill) => ({
          ...bill,
          id: bill._id, // Add 'id' field for DataGrid
        }));
        setBills(transformedBills);
      } catch (error) {
        setError("Failed to fetch bills.");
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
      valueGetter: (params) =>
        params.firstName + " " + params.lastName,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      valueGetter: (params) => params.$numberDecimal || 0,
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
            disabled={!billPermission.canRead}
          >
            View Details
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Billing List
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Card variant="outlined">
        <CardContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={bills}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingList;
