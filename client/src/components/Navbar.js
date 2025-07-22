"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "../App.css"

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        LinkFolio
      </Link>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to={`/${user.username}`}>My Public Page</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="navbar-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar