import React , {useEffect, useState} from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid"; // The core MUI DataGrid
import Box from "@mui/material/Box"; // For layout/padding
import { auto } from '../../../node_modules/@popperjs/core/lib/enums';


const columns = [
  { field: "userId", headerName: "ID", minWidth: 60, flex: 0.5 },
  {
    field: "userName",
    headerName: "Name",
    minWidth: 120, flex: 1,
    editable: false
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200, flex: 2,
    editable: false
  },
  {
    field: "mobileNo",
    headerName: "Mobile",
    minWidth: 120,
    editable: false
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 110, maxWidth: 140, flex: 1,
    editable: false
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 110, maxWidth: 140, flex: 1,
    editable: false
  },
  {
    field: "address",
    headerName: "Address",
    minWidth: 200,
    flex:1,
    editable: false
  },
  {
    field: "registeredOn",
    headerName: "Registered On",
    minWidth: 200,
    flex:1,
    editable: false
  },
];

// const rows = [
//   { id: 1, name: "Alice Smith", email: "alice@example.com", role: "ADMIN",status:"ACTIVE" },
//   { id: 2, name: "Bob Jones", email: "bob@example.com", role: "CUSTOMER",status:"ACTIVE" },
//   { id: 3, name: "Eve Hacker", email: "eve@example.com", role: "CUSTOMER",status:"ACTIVE" },
// ];


const Users = () => {
  const [rows, setRows] = useState([]);   // The users go here.
  const [loading, setLoading] = useState(true); // This controls the pretty loading spinner.

  useEffect(() => {
    // Fetch users from your backend when this page loads.
    const fetchUsers = async () => {
      try {
        setLoading(true); // Show the spinner while we wait
        // Get the JWT token for authorization, if you use one
        const token = localStorage.getItem("token");
        // Actually call your real API
        const res = await axios.get("http://localhost:8080/api/users/all", {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        // If your API response is { users: [...] }, do setRows(res.data.users);
        setRows(res.data.data); // Adjust if your payload is wrapped in a field!
        console.log("fetched user rows: ", res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      }
    };

    fetchUsers(); // Do the thing.
  }, []);

  return (
    <Box
      sx={{
        // height: "calc(100vh - 120px)",
        // width: "80%",
        maxWidth: "100vw", // ensures table won’t overflow the viewport
        minWidth: 320, // keeps table readable even on tiny screens
        background: "#fff",
        borderRadius: 2,
        p: 2,
        boxShadow: 4,
        overflowX: "auto" // add this for sanity on edge cases
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
        // If your backend uses _id (Mongo) instead of id, this line keeps React happy
        getRowId={(row) => row.userId}
      />
    </Box>
  );
};

export default Users;


