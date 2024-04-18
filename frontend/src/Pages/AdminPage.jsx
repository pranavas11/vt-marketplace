import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users'); // Update the endpoint as necessary
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    // Function to promote a user to admin
    const promoteToAdmin = async (userId) => {
        try {
            await axios.patch(`/api/admin/promote/${userId}`);
            alert('User has been promoted to admin successfully.');
            fetchUsers(); // Re-fetch users to update the list
        } catch (error) {
            alert('Failed to promote user to admin:', error.message);
        }
    };

    // Function to deactivate a user
    const deactivateUser = async (userId) => {
        try {
            await axios.patch(`/api/admin/deactivate/${userId}`);
            alert('User has been deactivated successfully.');
            fetchUsers(); // Re-fetch users to update the list
        } catch (error) {
            alert('Failed to deactivate user:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{`${user.fname} ${user.lname}`}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => promoteToAdmin(user._id)}>Promote to Admin</button>
                                <button onClick={() => deactivateUser(user._id)} style={{ marginLeft: '10px' }}>
                                    Deactivate
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
