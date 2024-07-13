import React, { useState } from 'react';

const WorkoutForm = ({ addWorkout }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Running');
  const [minutes, setMinutes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(name, type, parseInt(minutes));
    setName('');
    setType('Running');
    setMinutes('');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Workout Type*</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
        <div>
          <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">Workout Minutes*</label>
          <input
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
