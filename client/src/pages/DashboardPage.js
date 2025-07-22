"use client"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const DashboardPage = () => {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const { token } = useContext(AuthContext)

  const authHeader = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('/api/links', authHeader);
        setLinks(response.data)
      } catch (error) {
        console.error("Failed to fetch links", error)
      }
    }
    fetchLinks()
  }, [token])

  const handleAddLink = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/links', newLink, authHeader);
      setLinks(response.data)
      setNewLink({ title: "", url: "" })
    } catch (error) {
      console.error("Failed to add link", error)
    }
  }

  const handleDeleteLink = async (linkId) => {
    try {
      await axios.delete(`/api/links/${linkId}`, authHeader);
      setLinks(links.filter((link) => link._id !== linkId))
    } catch (error) {
      console.error("Failed to delete link", error)
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>Manage your links and build your portfolio</p>
      </div>

      <form onSubmit={handleAddLink} className="add-link-form">
        <h3>Add New Link</h3>
        <div className="form-row">
          <input
            type="text"
            placeholder="Link Title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Link</button>
      </form>

      <div className="links-section">
        <h2>Your Links ({links.length})</h2>
        {links.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#718096",
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>No links yet!</p>
            <p>Add your first link above to get started.</p>
          </div>
        ) : (
          <div className="links-grid">
            {links.map((link) => (
              <div key={link._id} className="link-card">
                <h4>{link.title}</h4>
                <p>{link.url}</p>
                <button onClick={() => handleDeleteLink(link._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage