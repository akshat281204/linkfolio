"use client"

import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      try {
        const storedUsername = localStorage.getItem("username")
        setUser({ username: storedUsername })
      } catch (error) {
        console.error("Error parsing stored username:", error)
        logout()
      }
    }
  }, [])

  const login = (userData, token) => {
    setIsAuthenticated(true)
    setUser(userData)
    setToken(token)
    localStorage.setItem("token", token)
    localStorage.setItem("username", userData.username)
    navigate("/dashboard")
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/login")
  }

  const value = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}