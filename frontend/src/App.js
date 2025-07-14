// dynamic-ranking-frontend/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import { getUsers, addUser, claimPoints, initializeUsers } from './services/api'; // Import initializeUsers

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Function to fetch users and update state
    const fetchUsers = useCallback(async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
            // If no user is selected and there are users, select the first one by default
            if (response.data.length > 0 && !selectedUserId) {
                setSelectedUserId(response.data[0]._id);
            }
            setError(''); // Clear any previous error
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users. Please ensure the backend is running.');
            setMessage('');
        }
    }, [selectedUserId]); // Dependency array: re-create if selectedUserId changes

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Depend on fetchUsers

    const handleAddUser = async (username) => {
        setMessage('');
        setError('');
        try {
            const response = await addUser(username);
            setUsers(response.data.updatedRankings); // Backend sends updated rankings directly
            setMessage(response.data.message);
            // Automatically select the newly added user if no user was selected
            if (!selectedUserId) {
                setSelectedUserId(response.data.user._id);
            }
        } catch (err) {
            console.error('Error adding user:', err);
            setError(err.response?.data?.message || 'Failed to add user.');
            setMessage('');
        }
    };

    const handleClaimPoints = async () => {
        setMessage('');
        setError('');
        if (!selectedUserId) {
            setError('Please select a user to claim points.');
            return;
        }
        try {
            const response = await claimPoints(selectedUserId);
            setUsers(response.data.updatedRankings); // Backend sends updated rankings directly
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error claiming points:', err);
            setError(err.response?.data?.message || 'Failed to claim points.');
            setMessage('');
        }
    };

    // Optional: Button to initialize 10 users for first-time setup
    const handleInitializeUsers = async () => {
        setMessage('');
        setError('');
        try {
            const response = await initializeUsers();
            setMessage(response.data.message);
            await fetchUsers(); // Re-fetch users to update the list and rankings
        } catch (err) {
            console.error('Error initializing users:', err);
            setError(err.response?.data?.message || 'Failed to initialize users. They might already exist.');
            setMessage('');
        }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            minHeight: '100vh',
            boxSizing: 'border-box'
        }}>
            <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>Dynamic Ranking System</h1>

            {/* Messages and Errors */}
            {message && (
                <p style={{
                    color: '#28a745',
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    width: '100%',
                    maxWidth: '600px',
                    textAlign: 'center'
                }}>{message}</p>
            )}
            {error && (
                <p style={{
                    color: '#dc3545',
                    backgroundColor: '#f8d7da',
                    border: '1px solid #f5c6cb',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    width: '100%',
                    maxWidth: '600px',
                    textAlign: 'center'
                }}>{error}</p>
            )}

            {/* Initial User Setup Button */}
            {users.length === 0 && (
                <button
                    onClick={handleInitializeUsers}
                    style={{
                        padding: '12px 25px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        fontSize: '1em'
                    }}
                >
                    Initialize 10 Default Users
                </button>
            )}

            <AddUserForm onAddUser={handleAddUser} />
            <UserList
                users={users}
                onClaimPoints={handleClaimPoints}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
            />
        </div>
    );
}

export default App;