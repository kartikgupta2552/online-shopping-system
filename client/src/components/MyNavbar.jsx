import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import categoryApi from "../api/categoryApi";

// 🩸 MAIN REPAIR: Always get user from localStorage.
function MyNavbar() {
  const [user, setUser] = useState(() => {
    // Parse the user object once on mount—never trust legacy state.
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  // 🛠️ Keep navbar state in sync with login/logout,
  // even if user logs in/out in another tab or window.
  useEffect(() => {
    fetchCategoryData();

    const handleStorageChange = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // Run once on mount
    handleStorageChange();
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchCategoryData = async () => {
    try {
      const categoryData = await categoryApi.getAllCategories();
      setCategories(categoryData.data.data || []);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  // 👿 Legacy "isLoggedIn" squashed forever; user is the only source of truth.

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false"); // For any old code, set to false.
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="nav-link active" aria-current="page" to="/">
          <strong> 🛒 ApnaCart</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                // href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                {categories.map((cat) => (
                  <li key={cat.categoryId}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${cat.categoryName}`}
                      state={{ categoryId: cat.categoryId }}
                    >
                      {cat.categoryName}
                    </Link>
                  </li>
                ))}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    View All Categories
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form
            className="d-flex mb-2"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (search.trim()) {
                navigate(`/search?keyword=${encodeURIComponent(search.trim())}`);
              }
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success m-2" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav">
            {/* --- THE LOGIC YOU CRAVE --- */}
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <Link
                    to="/profile"
                    className="navbar-text me-2 text-primary fw-bold text-decoration-none"
                    style={{ fontSize: "1rem", cursor: "pointer" }}
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user.userName}
                  </Link>
                  {/* Show Admin Panel link if and only if user is ADMIN */}
                  {user.userRole === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="btn btn-warning btn-sm me-2 m-auto"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    className="btn btn-danger btn-sm me-2 m-auto"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-2">
                  <Link
                    className="btn btn-outline-primary btn-sm me-2 m-auto"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-primary btn-sm me-2 m-auto"
                    to="/register"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;
