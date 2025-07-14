// dynamic-ranking-frontend/src/components/UserList.js
import React from 'react';

const UserList = ({ users, onClaimPoints, selectedUserId, setSelectedUserId }) => {
    return (
        <div style={{
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Leaderboard</h2>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
                <select
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    value={selectedUserId || ''}
                    style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        flexGrow: 1,
                        maxWidth: '300px'
                    }}
                >
                    <option value="">Select a User</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <button
                    onClick={onClaimPoints}
                    disabled={!selectedUserId} // Disable if no user is selected
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: selectedUserId ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        opacity: selectedUserId ? 1 : 0.6
                    }}
                >
                    Claim Random Points
                </button>
            </div>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {users.length === 0 ? (
                    <li style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No users yet. Add some!</li>
                ) : (
                    users.map((user, index) => (
                        <li
                            key={user._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 15px',
                                borderBottom: '1px solid #eee',
                                backgroundColor: selectedUserId === user._id ? '#e6f7ff' : (index % 2 === 0 ? '#f0f8ff' : '#ffffff'),
                                fontWeight: selectedUserId === user._id ? 'bold' : 'normal',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{
                                    fontSize: '1.2em',
                                    width: '30px',
                                    textAlign: 'center',
                                    color: '#007bff'
                                }}>
                                    {user.rank}
                                </span>
                                <span style={{ fontSize: '1.1em' }}>{user.username}</span>
                            </div>
                            <span style={{ fontSize: '1.1em', color: '#555' }}>
                                {user.points} points
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UserList;