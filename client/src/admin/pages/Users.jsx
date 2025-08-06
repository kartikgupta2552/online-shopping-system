import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const deleteUserApi = async (userId, token) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/users/${userId}/hard-delete`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateUserApi = async (userId, updateData, token) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/users/${userId}/profile`,
      updateData,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const Users = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editUserFields, setEditUserFields] = useState({
    userName: "",
    email: "",
    mobileNo: "",
    role: "",
    status: "",
    address: "",
  });

  const [editUserErrors, setEditUserErrors] = useState({});

  // Sane field validation for every admin use-case
  const validateEditFields = (fields) => {
    const errors = {};
    if (!fields.userName || fields.userName.trim().length < 3) {
      errors.userName = "Name must be at least 3 characters.";
    }
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (
      !fields.mobileNo ||
      !/^\d{10}$/.test(fields.mobileNo.replace(/\D/g, ""))
    ) {
      errors.mobileNo = "Enter a valid 10-digit mobile number.";
    }
    if (!fields.role || !["ADMIN", "CUSTOMER"].includes(fields.role)) {
      errors.role = "Role required.";
    }
    if (
      !fields.status ||
      !["ACTIVE", "INACTIVE", "BLOCKED"].includes(fields.status)
    ) {
      errors.status = "Status required.";
    }
    if (!fields.address || fields.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters.";
    }
    return errors;
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUserFields({
      userName: user.userName || "",
      email: user.email || "",
      mobileNo: user.mobileNo || "",
      role: user.role || "",
      status: user.status || "",
      address: user.address || "",
    });
    setEditUserErrors({});
    setOpenEdit(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleMore = (user) => {
    alert(`Show more actions for ${user.userName}.`);
  };

  const columns = [
    { field: "userId", headerName: "ID", minWidth: 60, flex: 0.5 },
    {
      field: "userName",
      headerName: "Name",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 2,
      editable: false,
    },
    {
      field: "mobileNo",
      headerName: "Mobile",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 110,
      maxWidth: 140,
      flex: 1,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 110,
      maxWidth: 140,
      flex: 1,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 200,
      flex: 1,
      editable: false,
    },
    {
      field: "registeredOn",
      headerName: "Registered On",
      minWidth: 200,
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 140,
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleMore(params.row)}>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/users/all", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setRows(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 120px)",
        width: "100%",
        maxWidth: "100vw",
        minWidth: 320,
        background: "#fff",
        borderRadius: 2,
        p: 2,
        boxShadow: 4,
        overflowX: "auto",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Users</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        loading={loading}
        getRowId={(row) => row.userId}
      />

      {/* ---- Edit User Modal ---- */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            value={editUserFields.userName}
            error={!!editUserErrors.userName}
            helperText={editUserErrors.userName}
            onChange={(e) => {
              const value = e.target.value;
              setEditUserFields((f) => ({ ...f, userName: value }));
              setEditUserErrors((errs) => ({
                ...errs,
                userName: validateEditFields({
                  ...editUserFields,
                  userName: value,
                }).userName,
              }));
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            value={editUserFields.email}
            error={!!editUserErrors.email}
            helperText={editUserErrors.email}
            onChange={(e) => {
              const value = e.target.value;
              setEditUserFields((f) => ({ ...f, email: value }));
              setEditUserErrors((errs) => ({
                ...errs,
                email: validateEditFields({ ...editUserFields, email: value })
                  .email,
              }));
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            value={editUserFields.mobileNo}
            error={!!editUserErrors.mobileNo}
            helperText={editUserErrors.mobileNo}
            onChange={(e) => {
              const value = e.target.value;
              setEditUserFields((f) => ({ ...f, mobileNo: value }));
              setEditUserErrors((errs) => ({
                ...errs,
                mobileNo: validateEditFields({
                  ...editUserFields,
                  mobileNo: value,
                }).mobileNo,
              }));
            }}
            fullWidth
          />
          <TextField
            select
            margin="dense"
            label="Role"
            value={editUserFields.role}
            error={!!editUserErrors.role}
            helperText={editUserErrors.role}
            onChange={(e) => {
              const value = e.target.value;
              setEditUserFields((f) => ({ ...f, role: value }));
              setEditUserErrors((errs) => ({
                ...errs,
                role: validateEditFields({ ...editUserFields, role: value })
                  .role,
              }));
            }}
            fullWidth
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="CUSTOMER">Customer</MenuItem>
          </TextField>
          <TextField
            select
            margin="dense"
            label="Status"
            value={editUserFields.status}
            error={!!editUserErrors.status}
            helperText={editUserErrors.status}
            onChange={(e) => {
              const value = e.target.value;
              setEditUserFields((f) => ({ ...f, status: value }));
              setEditUserErrors((errs) => ({
                ...errs,
                status: validateEditFields({ ...editUserFields, status: value })
                  .status,
              }));
            }}
            fullWidth
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
            <MenuItem value="BLOCKED">Blocked</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Address"
            value={editUserFields.address}
            error={!!editUserErrors.address}
            helperText={editUserErrors.address}
            onChange={(e) => {
              const value = e.target.value;
              setEditUserFields((f) => ({ ...f, address: value }));
              setEditUserErrors((errs) => ({
                ...errs,
                address: validateEditFields({
                  ...editUserFields,
                  address: value,
                }).address,
              }));
            }}
            fullWidth
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!selectedUser) return;

              // First, client-side validate everything
              const formErrors = validateEditFields(editUserFields);
              setEditUserErrors(formErrors);
              if (Object.keys(formErrors).length > 0) return;

              const token = localStorage.getItem("token");
              try {
                await updateUserApi(
                  selectedUser.userId,
                  {
                    userName: editUserFields.userName,
                    email: editUserFields.email,
                    mobileNo: editUserFields.mobileNo,
                    role: editUserFields.role,
                    status: editUserFields.status,
                    address: editUserFields.address,
                  },
                  token
                );
                setRows((rows) =>
                  rows.map((row) =>
                    row.userId === selectedUser.userId
                      ? { ...row, ...editUserFields }
                      : row
                  )
                );
                setOpenEdit(false);
              } catch (e) {
                // Here’s the server-side handling!
                const resp = e.response?.data;
                if (resp?.data && typeof resp.data === "object") {
                  // Server returned field-level errors as an object map.
                  setEditUserErrors(resp.data);
                } else {
                  // Fallback: general “shit’s broken” error
                  alert(
                    "Update failed: " +
                      (resp?.message || e.message || "Unknown server error")
                  );
                }
              }
            }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---- Delete Modal ---- */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{selectedUser?.userName}</b>?<br />
          This cannot be undone!
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!selectedUser) return;
              const token = localStorage.getItem("token");
              try {
                await deleteUserApi(selectedUser.userId, token);
                setRows((prev) =>
                  prev.filter((row) => row.userId !== selectedUser.userId)
                );
                setOpenDelete(false);
              } catch (err) {
                alert(
                  "Delete failed: " +
                    (err.response?.data?.message || err.message)
                );
              }
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
