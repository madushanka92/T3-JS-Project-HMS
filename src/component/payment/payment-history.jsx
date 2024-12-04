import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { paymentService } from "../../_services/apiService";

const PaymentHistory = ({ billId, refreshFlag }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!billId) return;
      try {
        const response = await paymentService.getPaymentsByBillId(billId);

        const transformedPayments = response.data.map((payment) => ({
          ...payment,
          id: payment._id, // Add 'id' field which the DataGrid expects
        }));

        setPayments(transformedPayments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [billId, refreshFlag]);

  const columns = [
    { field: "id", headerName: "Payment ID", width: 150 },
    { field: "amountPaid", headerName: "Amount Paid", width: 150 },
    { field: "paymentMethod", headerName: "Method", width: 150 },
    { field: "paymentDate", headerName: "Date", width: 200 },
    { field: "remarks", headerName: "Remarks", minWidth: 200 },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={payments}
        columns={columns}
        loading={loading}
        pageSize={5}
      />
    </div>
  );
};

export default PaymentHistory;
