// src/pages/DashboardPage.js
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const DashboardPage = () => {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const { token } = useContext(AuthContext)

  useEffect(() => {
    const fetchLinks = async () => {
      const authHeader = { headers: { 'Authorization': `Bearer ${token}` } };
      try {
        const response = await axios.get('/api/links', authHeader);
        setLinks(response.data);
      } catch (error) {
        console.error('Failed to fetch links', error);
      }
    };
    if (token) fetchLinks();
  }, [token]);

  const handleAddLink = async (e) => {
    e.preventDefault()
    const authHeader = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      const response = await axios.post('/api/links', newLink, authHeader);
      setLinks(response.data)
      setNewLink({ title: "", url: "" })
    } catch (error) {
      console.error("Failed to add link", error)
    }
  }

  const handleDeleteLink = async (linkId) => {
    const authHeader = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      await axios.delete(`/api/links/${linkId}`, authHeader);
      setLinks(links.filter((link) => link._id !== linkId))
    } catch (error) {
      console.error("Failed to delete link", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white">Your Dashboard</h1>
        <p className="text-lg text-indigo-200 mt-2">Manage your public links below.</p>
      </div>

      <div className="p-8 mb-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Add a New Link</h3>
        <form onSubmit={handleAddLink} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Link Title"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              required
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 transition"
            />
            <input
              type="url"
              placeholder="https://example.com"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              required
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 transition"
            />
          </div>
          <button type="submit" className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
            Add Link
          </button>
        </form>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-white text-center mb-8">Your Links ({links.length})</h2>
        {links.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link) => (
              <div key={link._id} className="relative p-6 bg-white rounded-xl shadow-md transition-transform transform hover:-translate-y-1">
                <h4 className="font-bold text-lg text-gray-800">{link.title}</h4>
                <p className="text-sm text-gray-500 truncate mt-1">{link.url}</p>
                <button onClick={() => handleDeleteLink(link._id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-xl text-indigo-200">You haven't added any links yet!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage