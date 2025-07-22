"use client"

import { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import "../App.css"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token, username: loggedInUsername } = response.data
      login({ username: loggedInUsername }, token)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.")
    }
  }

  return (
    <div className="form-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="auth-link">
        Don't have an account? <Link to="/register">Create Account</Link>
      </div>
    </div>
  )
}

export default LoginPage