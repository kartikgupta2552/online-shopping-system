import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API = "http://localhost:8080";

const statusOptions = ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns = [
    { field: "orderId", headerName: "Order ID", minWidth: 80 },
    { field: "userId", headerName: "User ID", minWidth: 100 },
    { field: "totalAmount", headerName: "Total", minWidth: 100 },
    { field: "orderStatus", headerName: "Status", minWidth: 120 },
    { field: "createdAt", headerName: "Date", minWidth: 160 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleOpenDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/orders/all`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setRows(res.data.data || []);
    } catch (e) {
      setRows([]);
    }
    setLoading(false);
  };

  const handleOpenEdit = (order) => {
    setSelectedOrder(order);
    setEditStatus(order.orderStatus || "");
    setEditDialogOpen(true);
  };

  const handleUpdateOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${API}/api/orders/${selectedOrder.orderId}/status`,
        null,
        {
          params: { status: editStatus },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setEditDialogOpen(false);
      loadOrders();
    } catch (e) {
      alert("Failed to update order status.");
    }
  };

  const handleOpenDelete = (order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  const handleDeleteOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/api/orders/${selectedOrder.orderId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setDeleteDialogOpen(false);
      loadOrders();
    } catch (err) {
      alert("Failed to delete order.");
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <h2>Orders</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.orderId}
        pageSize={6}
        rowsPerPageOptions={[6]}
        disableSelectionOnClick
        autoHeight
        loading={loading}
      />

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {statusOptions.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdateOrder}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>Order #{selectedOrder?.orderId}</b>?<br />
          This cannot be undone!
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteOrder}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;
