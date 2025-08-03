import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import Categories from "../Dummy Data/Categories.js";

function MyNavbar() {

    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        setUsername(localStorage.getItem("username") || "");
    }, []);

    useEffect(() => {
        setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, []);


    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setLoggedIn(false);
        setUsername("");
        navigate("/login");
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="nav-link active" aria-current="page" to="/homepage"><strong> 🛒 ApnaCart</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/homepage">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Categories
                            </a>
                            <ul className="dropdown-menu">
                                {Categories.map(cat => (
                                    <li key={cat.id}>
                                        <Link
                                            className="dropdown-item"
                                            to={`/category/${cat.name}`}
                                        >
                                            {cat.name}
                                        </Link>

                                    </li>
                                ))}
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#">View All Categories</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form
                        className="d-flex"
                        role="search"
                        onSubmit={e => {
                            e.preventDefault();
                            // Defensive: Don't search for empty string
                            if (search.trim()) {
                                navigate(`/search?q=${encodeURIComponent(search.trim())}`);
                            }
                        }}
                    >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="btn btn-outline-success m-2" type="submit">
                            Search
                        </button>
                    </form>

                    <ul className="navbar-nav">

                        <ul className="navbar-nav">
                            {loggedIn ? (
                                <>
                                    <li className="nav-item d-flex align-items-center">
                                        <Link
                                            to="/profile"
                                            className="navbar-text me-2 text-primary fw-bold text-decoration-none"
                                            style={{fontSize: "1rem", cursor: "pointer"}}
                                        >
                                            <i className="bi bi-person-circle me-1"></i>
                                            {username}
                                        </Link>
                                        <button className="btn btn-danger btn-sm me-2 m-auto" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>

                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary btn-sm me-2 m-auto"
                                              to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary btn-sm me-2 m-auto" to="/signup">Sign
                                            up</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MyNavbar;