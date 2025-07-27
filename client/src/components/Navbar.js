// src/components/Navbar.js
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              LinkFolio
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to={`/${user.username}`} className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200/50 hover:text-gray-900 transition">
                  Public Page
                </Link>
                <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200/50 hover:text-gray-900 transition">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200/50 hover:text-gray-900 transition">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar