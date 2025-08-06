import React, { useState } from "react";
// MUI components for layout
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
// Icons for Sidebar items
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CategoryIcon from "@mui/icons-material/Category";
// React Router for navigation
import { Link, useLocation, Outlet } from "react-router-dom";

// Sidebar navigation structure: Each with icon and label
const sidebarItems = [
  {
    text: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    text: "Users",
    path: "/admin/users",
    icon: <PeopleIcon />,
  },
  {
    text: "Products",
    path: "/admin/products",
    icon: <ShoppingCartIcon />,
  },
  {
    text: "Orders",
    path: "/admin/orders",
    icon: <ReceiptIcon />,
  },
  {
    text: "Categories",
    path: "/admin/categories",
    icon: <CategoryIcon />,
  },
];

const drawerWidth = 240; // Sidebar width (standard for admin layouts)

const AdminShell = () => {
  // We'll use this for a mobile drawer later if you want (unused for now)
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // For highlighting active route

  // Sidebar as permanent drawer
  return (
    <Box sx={{ display: "flex", minHeight: "100vh",flexGrow:1}}>
      {/* Topbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#1a237e",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            admin panel
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              py: 2,
              fontWeight: "bold",
              letterSpacing: 2,
              color: "#1a237e",
            }}
          >
            admin panel
          </Typography>
          <List>
            {sidebarItems.map(({ text, path, icon }) => (
              <ListItemButton
                key={text}
                component={Link}
                to={path}
                selected={location.pathname === path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#e3eafc",
                    color: "#1a237e",
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === path ? "#1a237e" : undefined,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          m:`1px` ,
          bgcolor: "#f7f8fa",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet /> {/* THIS IS THE KEY LINE: shows correct admin page */}
      </Box>
    </Box>
  );
};

export default AdminShell;
