import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DataGrid
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const API = "http://localhost:8080"; // Adjust this if your API is on a different port

const Products = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // or "edit"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const emptyForm = {
    productName: "",
    description: "",
    price: "",
    quantity: "",
    subCategoryId: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  // 🧠 Fetch categories (needed for subCategory dropdown)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use a GET endpoint to fetch categories & subcategories.
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/subcategory`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setCategories(res.data.data); // adjust if shape is different!
      } catch (e) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // 🧠 Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/product`);
        setRows(res.data.data || []);
      } catch (e) {
        setRows([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // 🚦 Validate product fields
  const validateForm = (values) => {
    const errors = {};
    if (!values.productName || values.productName.length < 3)
      errors.productName = "Name must be at least 3 chars.";
    if (!values.price || isNaN(values.price) || Number(values.price) < 1)
      errors.price = "Valid price required.";
    if (
      !values.quantity ||
      isNaN(values.quantity) ||
      Number(values.quantity) < 0
    )
      errors.quantity = "Non-negative quantity required.";
    if (!values.subCategoryId)
      errors.subCategoryId = "Sub-category required.";
    return errors;
  };

  // 🟢 Add/Edit modal logic
  const handleDialogOpen = (mode, product = null) => {
    setDialogMode(mode);
    setSelectedProduct(product);
    setForm(product ? {
      productName: product.productName,
      description: product.description || "",
      price: product.price,
      quantity: product.quantity,
      subCategoryId: product.subCategoryId || "",
    } : emptyForm);
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setForm(emptyForm);
    setSelectedProduct(null);
    setFormErrors({});
  };

  // 🔥 CREATE or UPDATE
  const handleDialogSubmit = async () => {
    let errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    const token = localStorage.getItem("token");
    try {
      if (dialogMode === "add") {
        await axios.post(
          `${API}/product`,
          form,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
      } else if (dialogMode === "edit" && selectedProduct) {
        await axios.put(
          `${API}/product/${selectedProduct.productId}`,
          form,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
      }
      handleDialogClose();
      // Refetch products!
      const res = await axios.get(`${API}/product`);
      setRows(res.data.data || []);
    } catch (e) {
      alert("Failed! " + (e.response?.data?.message || e.message));
    }
  };

  // 🧹 Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm("Really delete this product (no undo!)?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/product/${productId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setRows((r) => r.filter((row) => row.productId !== productId));
    } catch (e) {
      alert("Delete failed! " + (e.response?.data?.message || e.message));
    }
  };

  // 🏓 The DataGrid columns
  const columns = [
    { field: "productId", headerName: "ID", minWidth: 60 },
    { field: "productName", headerName: "Name", minWidth: 130, flex: 1 },
    { field: "description", headerName: "Description", minWidth: 160, flex: 1 },
    { field: "price", headerName: "Price", minWidth: 85 },
    { field: "quantity", headerName: "Qty", minWidth: 60 },
    { field: "subCategoryId", headerName: "SubCat", minWidth: 80 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 160,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleDialogOpen("edit", params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.productId)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2 style={{ margin: 0 }}>Products</h2>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => handleDialogOpen("add")}
        >
          Add Product
        </Button>
      </Box>
      <DataGrid
        sx={{ mt: 2 }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.productId}
        pageSize={6}
        rowsPerPageOptions={[6]}
        disableSelectionOnClick
        loading={loading}
        autoHeight
      />

      {/* --- Dialog for Add/Edit --- */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogMode === "add" ? "Add Product" : "Edit Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            fullWidth
            value={form.productName}
            error={!!formErrors.productName}
            helperText={formErrors.productName}
            onChange={(e) =>
              setForm((f) => ({ ...f, productName: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            minRows={2}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={form.price}
            error={!!formErrors.price}
            helperText={formErrors.price}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={form.quantity}
            error={!!formErrors.quantity}
            helperText={formErrors.quantity}
            onChange={(e) =>
              setForm((f) => ({ ...f, quantity: e.target.value }))
            }
          />
          <TextField
            select
            margin="dense"
            label="Subcategory"
            fullWidth
            value={form.subCategoryId}
            error={!!formErrors.subCategoryId}
            helperText={formErrors.subCategoryId}
            onChange={(e) =>
              setForm((f) => ({ ...f, subCategoryId: e.target.value }))
            }
          >
            {categories.map((cat) => (
              <MenuItem key={cat.subCategoryId} value={cat.subCategoryId}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleDialogSubmit}>
            {dialogMode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
