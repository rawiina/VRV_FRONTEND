import React, { useState } from 'react';

export default function RoleManagement() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Viewer', permissions: ['Read'] }
  ]);

  const [newRole, setNewRole] = useState('');
  const [newPermissions, setNewPermissions] = useState([]);

  const addRole = () => {
    if (newRole.trim() === '') return;
    const newRoleObj = { id: roles.length + 1, name: newRole, permissions: newPermissions };
    setRoles([...roles, newRoleObj]);
    setNewRole('');
    setNewPermissions([]);
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handlePermissionChange = (e) => {
    const permission = e.target.value;
    if (newPermissions.includes(permission)) {
      setNewPermissions(newPermissions.filter(item => item !== permission));
    } else {
      setNewPermissions([...newPermissions, permission]);
    }
  };

  return (
    <div className="flex h-screen">
    

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Role Management</h1>

        {/* Add Role Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold mb-4">Add New Role</h3>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter new role"
            className="w-full p-4 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="flex gap-4 mb-4">
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                value="Read"
                checked={newPermissions.includes('Read')}
                onChange={handlePermissionChange}
                className="mr-2"
              /> Read
            </label>
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                value="Write"
                checked={newPermissions.includes('Write')}
                onChange={handlePermissionChange}
                className="mr-2"
              /> Write
            </label>
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                value="Delete"
                checked={newPermissions.includes('Delete')}
                onChange={handlePermissionChange}
                className="mr-2"
              /> Delete
            </label>
          </div>
          <button
            onClick={addRole}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Role
          </button>
        </div>

        {/* Existing Roles Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map(role => (
              <div key={role.id} className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
                <h4 className="text-xl font-semibold text-gray-800">{role.name}</h4>
                <p className="text-gray-600 mb-4">Permissions: {role.permissions.join(', ')}</p>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
