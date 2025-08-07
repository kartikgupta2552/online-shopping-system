import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const API = "http://localhost:8080";

const Categories = () => {
  // --- Data State ---
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // --- Dialog/modal state ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("category"); // or 'subcategory'
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(null);

  // --- Form State ---
  const [form, setForm] = useState({ name: "", categoryId: "" }); // always filled for controlled inputs!
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- Fetch all categories & subcats on mount/refresh ---
  const fetchCats = async () => {
    const token = localStorage.getItem("token");
    try {
      const catRes = await axios.get(`${API}/category`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCategories(catRes.data.data || []);
      const subRes = await axios.get(`${API}/subcategory`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSubCategories(subRes.data.data || []);
    } catch (e) {
      setCategories([]);
      setSubCategories([]);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  // --- Dialog logic ---
  const handleDialogOpen = (mode, isEdit = false, row = null) => {
    setDialogOpen(true);
    setDialogMode(mode);
    setEditMode(isEdit);
    setSelected(row);
    // 🩸 Set default values, never undefined!
    setForm(
      row
        ? {
            name: row.name || "",
            categoryId:
              mode === "subcategory"
                ? (row.categoryId ? String(row.categoryId) : "")
                : "",
          }
        : { name: "", categoryId: "" }
    );
    setFormErrors({});
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setForm({ name: "", categoryId: "" });
    setEditMode(false);
    setSelected(null);
    setFormErrors({});
    setLoading(false);
  };

  // --- Simple client-side validation ---
  const validateForm = (f) => {
    const errors = {};
    if (!f.name || f.name.length < 3)
      errors.name = "Name must be at least 3 characters";
    if (dialogMode === "subcategory" && !f.categoryId)
      errors.categoryId = "Must select a category";
    return errors;
  };

  const handleDialogSubmit = async () => {
    // Prevent submitting during request
    if (loading) return;
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      if (editMode) {
        // Edit logic: ONLY send name/categoryId if necessary!
        if (dialogMode === "category") {
          await axios.put(
            `${API}/category/${selected.categoryId}`,
            { name: form.name }, // Only the name!
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );
        } else {
          await axios.put(
            `${API}/subcategory/${selected.subCategoryId}`,
            { name: form.name, categoryId: Number(form.categoryId) }, // Both fields for subcat update
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );
        }
      } else {
        // Add logic
        if (dialogMode === "category") {
          await axios.post(
            `${API}/category`,
            { name: form.name }, // Only name!
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );
        } else {
          await axios.post(
            `${API}/subcategory`,
            { name: form.name, categoryId: Number(form.categoryId) },
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );
        }
      }
      handleDialogClose();
      fetchCats();
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      setFormErrors({ name: serverMsg || "Server error! Check backend." });
      setLoading(false);
    }
  };

  // --- Delete logic ---
  const handleDelete = async (row, mode) => {
    if (!window.confirm(`Really delete ${row.name}? No undo!`)) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        mode === "category"
          ? `${API}/category/${row.categoryId}`
          : `${API}/subcategory/${row.subCategoryId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      fetchCats();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  // --- DataGrid columns ---
  const catCols = [
    { field: "categoryId", headerName: "ID", minWidth: 60 },
    { field: "name", headerName: "Name", minWidth: 120, flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleDialogOpen("category", true, params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row, "category")}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const subCols = [
    { field: "subCategoryId", headerName: "ID", minWidth: 60 },
    { field: "name", headerName: "Name", minWidth: 120, flex: 1 },
    { field: "categoryId", headerName: "Category ID", minWidth: 100 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleDialogOpen("subcategory", true, params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row, "subcategory")}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // --- Render ---
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <h2 style={{ margin: 0 }}>Categories</h2>
        <div>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen("category", false)}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Add Category
          </Button>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen("subcategory", false)}
            variant="outlined"
          >
            Add Subcategory
          </Button>
        </div>
      </Box>
      {/* --- Categories Table --- */}
      <div style={{ height: 300, marginTop: 18 }}>
        <DataGrid
          rows={categories}
          columns={catCols}
          pageSize={6}
          rowsPerPageOptions={[6]}
          getRowId={(row) => row.categoryId}
          autoHeight
        />
      </div>
      {/* --- Subcategories Table --- */}
      <h3 style={{ marginTop: 32 }}>Subcategories</h3>
      <div style={{ height: 300 }}>
        <DataGrid
          rows={subCategories}
          columns={subCols}
          pageSize={6}
          rowsPerPageOptions={[6]}
          getRowId={(row) => row.subCategoryId}
          autoHeight
        />
      </div>
      {/* --- Add/Edit Dialog --- */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {editMode
            ? dialogMode === "category"
              ? "Edit Category"
              : "Edit Subcategory"
            : dialogMode === "category"
            ? "Add Category"
            : "Add Subcategory"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            value={form.name || ""}
            error={!!formErrors.name}
            helperText={formErrors.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            fullWidth
          />
          {dialogMode === "subcategory" && (
            <TextField
              margin="dense"
              select
              label="Category"
              value={form.categoryId || ""}
              error={!!formErrors.categoryId}
              helperText={formErrors.categoryId}
              onChange={(e) =>
                setForm((f) => ({ ...f, categoryId: e.target.value }))
              }
              fullWidth
            >
              <MenuItem value="">Select...</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDialogSubmit}
            disabled={loading}
          >
            {editMode ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
