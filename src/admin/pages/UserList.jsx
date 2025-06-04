import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const UserList = () => {
    // Dummy data for demonstration. In a real app, this would come from Firestore.
    const [users, setUsers] = useState([
        {
            id: 'USR001',
            email: 'admin@example.com',
            role: 'admin',
            status: 'Active',
            lastLogin: '2023-10-26 10:30 AM',
        },
        {
            id: 'USR002',
            email: 'alice@example.com',
            role: 'customer',
            status: 'Active',
            lastLogin: '2023-10-25 02:15 PM',
        },
        {
            id: 'USR003',
            email: 'bob@example.com',
            role: 'customer',
            status: 'Inactive',
            lastLogin: '2023-09-10 09:00 AM',
        },
        {
            id: 'USR004',
            email: 'charlie@example.com',
            role: 'customer',
            status: 'Active',
            lastLogin: '2023-10-26 11:45 AM',
        },
    ]);

    // Simulate fetching data
    useEffect(() => {
        // In a real application, you would fetch data from Firestore here.
        // For example:
        // const fetchUsers = async () => {
        //     const usersCollection = collection(db, "users");
        //     const q = query(usersCollection, orderBy("lastLogin", "desc")); // Example query
        //     const querySnapshot = await getDocs(q);
        //     const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //     setUsers(fetchedUsers);
        // };
        // fetchUsers();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-400 bg-green-900/20';
            case 'Inactive': return 'text-red-400 bg-red-900/20';
            default: return 'text-gray-400 bg-gray-700/20';
        }
    };

    const handleEditUser = (userId) => {
        alert(`Editing user: ${userId}`);
        // In a real app, navigate to a detailed user edit form
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm(`Are you sure you want to delete user ${userId}?`)) {
            setUsers(users.filter(user => user.id !== userId));
            alert(`User ${userId} deleted.`);
            // In a real app, delete from Firestore
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">User Management</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-600 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-300 capitalize">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.lastLogin}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEditUser(user.id)}
                                                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                                                title="Edit User"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
