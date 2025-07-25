import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
    <div className="container">
      <a className="navbar-brand" href="#">🛒 E-Shop</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" href="#">Home</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
              Categories
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Category 1</a></li>
              <li><a className="dropdown-item" href="#">Category 2</a></li>
              <li><a className="dropdown-item" href="#">Category 3</a></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex me-3">
          <input className="form-control me-2" type="search" placeholder="Search" />
        </form>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Cart</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar