import React, { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Inactive' }
  ]);

  const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prevState => ({ ...prevState, [name]: value }));
  };

  const addUser = () => {
    const newUser = { id: users.length + 1, ...currentUser };
    setUsers([...users, newUser]);
    setCurrentUser({ name: '', email: '', role: '', status: '' });
  };

  const updateUser = () => {
    setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    setCurrentUser({ name: '', email: '', role: '', status: '' });
    setIsEditing(false);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  return (
    <div className="flex h-screen">
      

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">User Management</h1>

        {/* Add User Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold mb-4">Add New User</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={currentUser.name}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={currentUser.email}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={currentUser.role}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <select
            name="status"
            value={currentUser.status}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={isEditing ? updateUser : addUser}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isEditing ? 'Update User' : 'Add User'}
          </button>
        </div>

        {/* Users Table */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Users</h3>
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
            <table className="w-full text-left table-auto">
              <thead className="text-sm text-gray-500 bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td
  className={`px-6 py-4 ${
    user.status === 'Active' ? 'text-green-500' : 'text-red-500'
  }`}
>
  {user.status}
</td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => editUser(user)}
                        className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
