import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App flex">
      <div className="sidebar bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => navigate('/user-management')}
                className="w-full text-left py-2 px-4 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/role-management')}
                className="w-full text-left py-2 px-4 mb-4 bg-green-500 hover:bg-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Role Management
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content flex-1 bg-gray-100 p-6 ml-64">
        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/role-management" element={<RoleManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
