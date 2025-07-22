"use client"

// 1. Import useCallback
import { createContext, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const navigate = useNavigate()

  // 2. Wrap logout in useCallback to memoize it
  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/login")
  }, [navigate]) // navigate is a dependency of logout

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      try {
        const storedUsername = localStorage.getItem("username")
        // Ensure storedUsername is not null before setting the user
        if (storedUsername) {
          setUser({ username: storedUsername })
        } else {
          // If there's a token but no user info, the state is inconsistent. Log out.
          logout()
        }
      } catch (error) {
        console.error("Error parsing stored username:", error)
        logout()
      }
    }
    // 3. Add the stable logout function to the dependency array
  }, [logout])

  const login = (userData, token) => {
    setIsAuthenticated(true)
    setUser(userData)
    setToken(token)
    localStorage.setItem("token", token)
    localStorage.setItem("username", userData.username)
    navigate("/dashboard")
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