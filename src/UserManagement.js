import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://3f603487-ca50-4190-a45d-c31ca60e062c.mock.pstmn.io/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error("Data fetched is not an array");
        }
      })
      .catch((err) => {
        setError(err.message);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserData = {
      ...newUser,
      id: users.length + 1, 
    };
    setUsers([...users, newUserData]);
    setNewUser({ name: "", email: "", role: "", status: "" });
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setNewUser(userToEdit);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "text-green-500 ";
      case "Inactive":
        return "text-red-500";
      case "Pending":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form onSubmit={handleAddUser} className="mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            className="border py-2 px-4 w-64"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="border py-2 px-4 w-64"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="border py-2 px-4 w-64"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={newUser.status}
            onChange={handleChange}
            className="border py-2 px-4 w-64"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
      </form>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className={`border px-4 py-2 ${getStatusClass(user.status)}`}>{user.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No users available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
