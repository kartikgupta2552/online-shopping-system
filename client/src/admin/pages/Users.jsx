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
import AddIcon from "@mui/icons-material/Add";
import userApi from "../../api/userApi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { format } from "date-fns";

const deleteUserApi = async (userId, token) => {
  return userApi.deleteUser(userId, token);
};

const updateUserApi = async (userId, updateData, token) => {
  return userApi.updateUser(userId, updateData, token);
};

const Users = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const [editUserFields, setEditUserFields] = useState({
    userName: "",
    email: "",
    mobileNo: "",
    role: "",
    status: "",
    address: "",
  });

  const [editUserErrors, setEditUserErrors] = useState({});
  const [addUserFields, setAddUserFields] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "", // Added for password confirmation
    mobileNo: "",
    address: "",
  });
  const [addUserErrors, setAddUserErrors] = useState({});
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserServerError, setAddUserServerError] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const checkUserDependencies = async (userId, token) => {
    try {
      // You'll need to create these API endpoints in your backend
      const ordersResponse = await userApi.getUserOrders(userId, token);
      const cartResponse = await userApi.getUserCart(userId, token);

      const hasOrders =
        ordersResponse.data.data && ordersResponse.data.data.length > 0;
      const hasCartItems =
        cartResponse.data.data && cartResponse.data.data.length > 0;

      return {
        hasOrders,
        hasCartItems,
        canDelete: !hasOrders && !hasCartItems,
      };
    } catch (err) {
      // If API calls fail, proceed with deletion attempt
      console.warn("Could not check user dependencies:", err);
      return { canDelete: true, hasOrders: false, hasCartItems: false };
    }
  };

  const validateAddUserFields = (fields) => {
    const errors = {};
    if (!fields.userName || fields.userName.trim().length < 2)
      errors.userName = "Name must be at least 2 characters.";
    if (!fields.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errors.email = "Invalid email address.";
    if (!fields.password) errors.password = "Password is required.";
    else if (fields.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(fields.password)
    )
      errors.password =
        "Password must contain uppercase, lowercase, number, and special character.";
    if (!fields.confirmPassword)
      errors.confirmPassword = "Confirm your password.";
    else if (fields.password !== fields.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!fields.mobileNo) errors.mobileNo = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(fields.mobileNo))
      errors.mobileNo = "Enter valid 10-digit Indian mobile number.";
    if (fields.address && fields.address.length > 500)
      errors.address = "Address must be under 500 characters.";
    return errors;
  };

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

  // ✅ Enhanced delete handler with better state checking
  const handleDelete = (user) => {
    console.log("Deleting user:", user); // Debug log
    if (!user || !user.userId) {
      console.error("Invalid user data for deletion:", user);
      return;
    }
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

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await userApi.getAllUsers(token);
      console.log(res.data.data);
      setRows(res.data.data);
      console.log("Fetched users:", res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box
      sx={{
        position: "relative", //for absolute positioning of add user button
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ position: "absolute", right: 32, top: 24, zIndex: 2 }}
        onClick={() => setOpenAdd(true)}
      >
        Add user
      </Button>
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
                //only send PATCH for fields that were actually changed(admin fn)
                if (editUserFields.role !== selectedUser.role) {
                  await userApi.changeRole(
                    selectedUser.userId,
                    editUserFields.role,
                    token
                  );
                }
                if (editUserFields.status !== selectedUser.status) {
                  await userApi.changeStatus(
                    selectedUser.userId,
                    editUserFields.status,
                    token
                  );
                }
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
                setSnackMsg("User updated successfully!");
                setSnackOpen(true);
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
              if (!selectedUser || !selectedUser.userId) {
                console.error("No user selected for deletion:", selectedUser);
                alert("Error: No user selected for deletion.");
                setOpenDelete(false);
                return;
              }

              const token = localStorage.getItem("token");
              if (!token) {
                alert("Session expired. Please login again.");
                return;
              }

              try {
                // ✅ Pre-check for dependencies
                const dependencies = await checkUserDependencies(
                  selectedUser.userId,
                  token
                );

                if (!dependencies.canDelete) {
                  let message = `Selected user "${selectedUser.userName}" cannot be deleted because they have:\n\n`;

                  if (dependencies.hasOrders) {
                    message +=
                      "• Active orders that need to be completed or cancelled\n";
                  }

                  if (dependencies.hasCartItems) {
                    message +=
                      "• Items in their shopping cart that need to be cleared\n";
                  }

                  message +=
                    "\nPlease resolve these issues before attempting to delete this user.";

                  alert(message);
                  setOpenDelete(false);
                  return;
                }

                // Proceed with deletion if no dependencies
                console.log("Attempting to delete user:", selectedUser.userId);
                await deleteUserApi(selectedUser.userId, token);

                setRows((prev) =>
                  prev.filter((row) => row.userId !== selectedUser.userId)
                );
                setOpenDelete(false);
                setSnackMsg("User deleted successfully!");
                setSnackOpen(true);
              } catch (err) {
                console.error("Delete error:", err);

                // Fallback error handling
                if (err.response?.status === 500) {
                  alert(
                    `Selected user "${selectedUser.userName}" cannot be deleted because they have an order or other related data.\n\n` +
                      "Please contact the system administrator for assistance."
                  );
                } else {
                  alert(
                    "Delete failed: " +
                      (err.response?.data?.message ||
                        err.message ||
                        "Unknown error")
                  );
                }

                setOpenDelete(false);
              }
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          {addUserServerError && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {addUserServerError}
            </div>
          )}
          <TextField
            margin="dense"
            label="Name"
            value={addUserFields.userName}
            error={!!addUserErrors.userName}
            helperText={addUserErrors.userName}
            onChange={(e) => {
              setAddUserFields((f) => ({ ...f, userName: e.target.value }));
              // Clear errors when user starts typing
              setAddUserErrors((errs) => ({ ...errs, userName: undefined }));
              setAddUserServerError("");
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            value={addUserFields.email}
            error={!!addUserErrors.email}
            helperText={addUserErrors.email}
            onChange={(e) =>
              setAddUserFields((f) => ({ ...f, email: e.target.value }))
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            value={addUserFields.password}
            error={!!addUserErrors.password}
            helperText={addUserErrors.password}
            onChange={(e) =>
              setAddUserFields((f) => ({ ...f, password: e.target.value }))
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            value={addUserFields.confirmPassword}
            error={!!addUserErrors.confirmPassword}
            helperText={addUserErrors.confirmPassword}
            onChange={(e) =>
              setAddUserFields((f) => ({
                ...f,
                confirmPassword: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            value={addUserFields.mobileNo}
            error={!!addUserErrors.mobileNo}
            helperText={addUserErrors.mobileNo}
            onChange={(e) =>
              setAddUserFields((f) => ({ ...f, mobileNo: e.target.value }))
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            value={addUserFields.address}
            error={!!addUserErrors.address}
            helperText={addUserErrors.address}
            onChange={(e) =>
              setAddUserFields((f) => ({ ...f, address: e.target.value }))
            }
            fullWidth
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={addUserLoading}
            onClick={async () => {
              setAddUserServerError("");
              const errs = validateAddUserFields(addUserFields);
              setAddUserErrors(errs);
              if (Object.keys(errs).length > 0) return;
              setAddUserLoading(true);
              try {
                await userApi.registerUser({
                  userName: addUserFields.userName,
                  email: addUserFields.email,
                  password: addUserFields.password,
                  mobileNo: addUserFields.mobileNo,
                  address: addUserFields.address,
                });
                setOpenAdd(false);
                setAddUserFields({
                  userName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  mobileNo: "",
                  address: "",
                });
                setAddUserErrors({});
                setAddUserLoading(false);
                setSnackMsg("User added successfully!");
                setSnackOpen(true);
                // Reload users table
                if (typeof loadUsers === "function") loadUsers();
              } catch (err) {
                setAddUserLoading(false);
                console.error("Add user error:", err); // Debug log
                if (
                  err.response &&
                  err.response.data &&
                  err.response.data.message
                ) {
                  setAddUserServerError(err.response.data.message);
                } else if (
                  err.response &&
                  err.response.data &&
                  err.response.data.data
                ) {
                  // Handle field-level validation errors from backend
                  setAddUserErrors(err.response.data.data);
                } else {
                  setAddUserServerError("Failed to add user. Try again.");
                }
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackOpen(false)}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {snackMsg}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Users;
