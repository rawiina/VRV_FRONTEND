// src/pages/Dashboard.js
import React from 'react';
import CreativeCard from '../components/CreativeCard';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Creative Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CreativeCard
          title="Creative Project 1"
          description="A brief description of the creative project."
          image="path-to-image.jpg"
          action={() => alert('Explore Project 1')}
        />
        <CreativeCard
          title="Creative Project 2"
          description="A brief description of another creative project."
          image="path-to-image.jpg"
          action={() => alert('Explore Project 2')}
        />
        {/* Add more cards here */}
      </div>
    </div>
  );
};

export default Dashboard;
