import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid"; // Datagrid used for automatic pagination, sorting, selection etc
import { Box, IconButton, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import orderApi from "../../api/orderApi";

const statusOptions = ["NEW","PAID","SHIPPED", "DELIVERED", "CANCELLED"];

const Orders = () => {
  const [rows, setRows] = useState([]); // save the table data -> Orders
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false); // is the dialog to edit open?
  const [selectedOrder, setSelectedOrder] = useState(null); // the order row selected to edit/delete
  const [editStatus, setEditStatus] = useState(""); //value in the edit dialog's dropdown
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // is the dialog to delete open?

  const statusColor = (status) => {
    switch (status) {
      case "NEW":
        return "primary";
      case "PAID":
        return "secondary";
      case "SHIPPED":
        return "info";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "secondary";
    }
  };

  const renderStatusCell = (params) => {
    <Chip
      label={params.value}
      color={statusColor(params.value)}
      variant="outlined"
      size="small"
    />
  }

  const columns = [
    { field: "orderId", headerName: "Order ID", minWidth: 80 },
    { field: "userId", headerName: "User ID", minWidth: 100 },
    {field: "userName",headerName: "User Name", minWidth: 150},
    {field: "email", headerName: "Email", minWidth: 200},
    { field: "totalAmount", headerName: "Total Amount", minWidth: 100 },
    { field: "status", headerName: "Status", minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor(params.value)}
          variant="outlined"
          size="small"
        />
      ),
    },
    { field: "orderDate", headerName: "Order Date", minWidth: 160 },
    {field: "deliveryDate", headerName: "Delivery Date", minWidth: 160},
    {field:"updatedAt", headerName: "Updated At", minWidth: 160},
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      //renderCell used for custom cell rendering(here buttons to edit and delete)
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

  //runs after first render(componentDidMount)
  //useEffect calls loadOrders() on mount, triggering an Axios GET request to the backend. 
  // This pulls the initial order data so my page/table isn’t empty
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await orderApi.getAllOrders(token);
      const mappedRows = (res.data.data || []).map(order => ({
      orderId: order.orderId,
      userId: order.userId,
      userName: order.userName,
      email: order.email,
      totalAmount: order.orderItems
        ? order.orderItems.reduce(
            (sum, item) => sum + (item.priceAtOrder * item.quantity), 0
          )
        : 0,
      status: order.status,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      updatedAt: order.updatedAt,
      orderItems: order.orderItems, // keep if you need details elsewhere
    }));
    setRows(mappedRows);
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
      await orderApi.changeOrderStatus(selectedOrder.orderId, editStatus, token);
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
      await orderApi.cancelOrder(selectedOrder.orderId, token);
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
