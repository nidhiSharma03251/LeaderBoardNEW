// dynamic-ranking-frontend/src/components/AddUserForm.js
import React, { useState } from 'react';

const AddUserForm = ({ onAddUser }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onAddUser(username.trim());
            setUsername(''); // Clear input after submission
        } else {
            alert('Username cannot be empty.');
        }
    };

    return (
        <div style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ marginTop: 0 }}>Add New User</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;