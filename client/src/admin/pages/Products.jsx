import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import productApi from "../../api/productApi";
import subcategoryApi from "../../api/subcategoryApi";

const Products = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
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

  // 🧠 Fetch subcategories (needed for subCategory dropdown)
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await subcategoryApi.getAllSubcategories();
        console.log("Fetched subcategories:", res.data.data);
        setSubCategories(res.data.data);
      } catch (e) {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, []);

  //
  // Fetch all products after subCategories is loaded!
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productApi.getAllProducts();
        // Map subcategory name *now* that subCategories is loaded!
        const products = (res.data || []).map((product) => {
          const subCat = subCategories.find(
            (s) => String(s.subCategoryId) === String(product.subCategoryId)
          );
          // Only change: set subCategoryName properly!
          return {
            ...product,
            subCategoryName: subCat ? subCat.subCategoryName : "Unknown",
          };
        });
        setRows(products);
      } catch (e) {
        setRows([]);
      }
      setLoading(false);
    };
    if (subCategories.length > 0) fetchProducts();
  }, [subCategories]); //Now depends on subCategories!


  // Validate product fields
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
    if (!values.subCategoryId) errors.subCategoryId = "Sub-category required.";
    return errors;
  };

  // Add/Edit modal logic
  const handleDialogOpen = (mode, product = null) => {
    setDialogMode(mode);
    setSelectedProduct(product);
    setForm(
      product
        ? {
            productName: product.productName,
            description: product.description || "",
            price: product.price,
            quantity: product.quantity,
            subCategoryId: product.subCategoryId || "", // don't use subCategoryName here!
          }
        : emptyForm
    );
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setForm(emptyForm);
    setSelectedProduct(null);
    setFormErrors({});
  };

  // CREATE or UPDATE
  const handleDialogSubmit = async () => {
    let errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    const token = localStorage.getItem("token");
    try {
      if (dialogMode === "add") {
        productApi.addProduct(form);
      } else if (dialogMode === "edit" && selectedProduct) {
        await productApi.updateProduct(selectedProduct.productId, form);
      }

      handleDialogClose();
      // Refetch products!
      const res = await productApi.getAllProducts();
      // Map with subcategory names!
      const products = (res.data || []).map((product) => {
        const subCat = subCategories.find(
          (s) => String(s.subCategoryId) === String(product.subCategoryId)
        );
        return {
          ...product,
          subCategoryName: subCat ? subCat.subCategoryName : "Unknown",
        };
      });
      setRows(products);
    } catch (e) {
      alert("Failed! " + (e.response?.data?.message || e.message));
    }
  };

  // 🧹 Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm("Really delete this product (no undo!)?")) return;
    try {
      productApi.deleteProduct(productId);
      setRows((r) => r.filter((row) => row.productId !== productId));
    } catch (e) {
      alert("Delete failed! " + (e.response?.data?.message || e.message));
    }
  };

  // The DataGrid columns
  const columns = [
    { field: "productId", headerName: "ID", minWidth: 60 },
    { field: "productName", headerName: "Name", minWidth: 130, flex: 1 },
    { field: "description", headerName: "Description", minWidth: 160, flex: 1 },
    { field: "price", headerName: "Price", minWidth: 85 },
    { field: "quantity", headerName: "Qty", minWidth: 60 },
    { field: "subCategoryName", headerName: "Sub Category", minWidth: 80 }, // ✅ subCategoryName used here!
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 160,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleDialogOpen("edit", params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.productId)}
          >
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
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
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
            {subCategories.map((cat) => (
              <MenuItem key={cat.subCategoryId} value={cat.subCategoryId}>
                {cat.subCategoryName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDialogSubmit}
          >
            {dialogMode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
