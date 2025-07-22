import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { username } = useParams(); // Gets the username from the URL (e.g., /testuser)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/profile/${username}`);
                setUser(response.data);
                setError('');
            } catch (err) {
                setError('User not found.');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [username]); // Re-run this effect if the username in the URL changes

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
            {user && (
                <>
                    <h2>@{user.username}</h2>
                    <p>Check out my links below!</p>
                    <div className="links-list" style={{ marginTop: '20px' }}>
                        {user.links.map(link => (
                            <a 
                                href={link.url} 
                                key={link._id}
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                    display: 'block',
                                    backgroundColor: '#5c67f2',
                                    color: 'white',
                                    padding: '15px',
                                    margin: '10px 0',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold'
                                }}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PublicProfilePage;