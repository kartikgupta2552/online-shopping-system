import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import userApi from "../../api/userApi";
import productApi from "../../api/productApi";
import orderApi from "../../api/orderApi";
import categoryApi from "../../api/categoryApi";
import subCategoryApi from "../../api/subcategoryApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";

const AdminDashboard = ({ onNavigate }) => {
  const navigate = useNavigate();

  // State hooks with default null
  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);
  const [subCategoryCount, setSubCategoryCount] = useState(null);

  // Bar chart data – turning your dull counts into visual boners. Array of objects; each {} is a bar.
  const barData = [
    { name: "Users", value: userCount ?? 0, fill: "#8884d8" },
    { name: "Products", value: productCount ?? 0, fill: "#82ca9d" },
    { name: "Orders", value: orderCount ?? 0, fill: "#ffc658" },
    { name: "Categories", value: categoryCount ?? 0, fill: "#ff7300" },
    { name: "Subcategories", value: subCategoryCount ?? 0, fill: "#d0ed57" },
  ];

  // Pie chart data – for "distribution" of entities (e.g., how much of your shop is users vs. products). Same array style.
  const pieData = barData.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d0ed57"];

  useEffect(() => {
    async function loadStats() {
      try {
        const token = localStorage.getItem("token");

        // USERS: Axios response with two .data layers
        const users = await userApi.getAllUsers(token);
        const usersArr = Array.isArray(users.data?.data)
          ? users.data.data
          : Array.isArray(users.data)
          ? users.data
          : [];
        setUserCount(usersArr.length);

        // PRODUCTS: direct object (no nested .data)
        const products = await productApi.getAllProducts(token);
        const productsArr = Array.isArray(products.data)
          ? products.data
          : Array.isArray(products.data?.data)
          ? products.data.data
          : [];
        setProductCount(productsArr.length);

        // ORDERS: Axios response with double .data
        const orders = await orderApi.getAllOrders(token);
        const ordersArr = Array.isArray(orders.data?.data)
          ? orders.data.data
          : Array.isArray(orders.data)
          ? orders.data
          : [];
        setOrderCount(ordersArr.length);

        // CATEGORIES: Axios response with double .data
        const categories = await categoryApi.getAllCategories(token);
        const categoriesArr = Array.isArray(categories.data?.data)
          ? categories.data.data
          : Array.isArray(categories.data)
          ? categories.data
          : [];
        setCategoryCount(categoriesArr.length);

        // SUBCATEGORIES: Axios response with double .data
        const subCategories = await subCategoryApi.getAllSubcategories(token);
        const subCategoriesArr = Array.isArray(subCategories.data?.data)
          ? subCategories.data.data
          : Array.isArray(subCategories.data)
          ? subCategories.data
          : [];
        setSubCategoryCount(subCategoriesArr.length);
      } catch (err) {
        console.error("Failed to load stats:", err);
        setUserCount(0);
        setProductCount(0);
        setOrderCount(0);
        setCategoryCount(0);
        setSubCategoryCount(0);
      }
    }
    loadStats();
  }, []);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", background: "#f5f5f5" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {" "}
        <Typography variant="h4">
          {" "}
        </Typography>
        <Button // The escape button—MUI Button component for consistency with your existing UI.
          variant="contained" // variant="contained" makes it a filled button (not just outlined)—stands out as a primary action, like "GET ME THE FUCK OUT."
          color="primary" // color="primary" uses your theme's primary color (that #1a237e blue from your AppBar)—matches your app's style without looking alien.
          onClick={() => navigate("/")} // onClick is the magic—when clicked, calls navigate("/") which takes you to the homepage route. "/" assumes your homepage is at the root; change it if your route is different (e.g., "/home", "/shop").
          sx={{ fontWeight: "bold" }} // sx adds custom styling—fontWeight:'bold' makes the text thicker, emphasizing this as an important action. Like shouting "I'M OUTTA HERE!" but with typography.
        >
          🏠 Go to Homepage 
        </Button>
      </Box>

      {/* Sexy Stats Section – Cards? Fuck that, charts or bust! */}
      <Typography
        variant="h5"
        mb={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        Stats Overview <TrendingUpIcon sx={{ ml: 1, color: "#1a237e" }} />
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minWidth={260}
            sx={{ width: "100%" }}
          >
            <Typography
              variant="h6"
              mb={1}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Distribution <PieChartIcon sx={{ ml: 1, color: "#1a237e" }} />
            </Typography>
            <ResponsiveContainer width={260} height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Navigation Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Users</Typography>
              <Button onClick={() => navigate("/admin/users")}>Go</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Products</Typography>
              <Button onClick={() => navigate("/admin/products")}>Go</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Orders</Typography>
              <Button onClick={() => navigate("/admin/orders")}>Go</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Categories</Typography>
              <Button onClick={() => navigate("/admin/categories")}>Go</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Subcategories</Typography>
              <Button onClick={() => navigate("/admin/categories")}>Go</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
