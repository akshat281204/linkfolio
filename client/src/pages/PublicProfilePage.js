import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { username } = useParams();

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
    }, [username]);

    if (loading) {
        return <div className="text-center text-white mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-300 mt-20">{error}</div>;
    }

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            {user && (
                <div className="text-center">
                    {/* You could add an avatar here later */}
                    <h2 className="text-3xl font-bold text-white">@{user.username}</h2>
                    
                    <div className="mt-8 space-y-4">
                        {user.links.map(link => (
                            <a 
                                href={link.url} 
                                key={link._id}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block w-full p-4 font-semibold text-center text-indigo-600 bg-white rounded-lg shadow-md hover:scale-105 transition-transform transform"
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicProfilePage;