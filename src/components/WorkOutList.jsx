import React from 'react';

const WorkoutList = ({ users, filterType, searchQuery, itemsPerPage, setSelectedUser, currentPage, setCurrentPage }) => {
  const filteredWorkouts = users.filter(user => {
    const matchesType = filterType === 'All' || user.workouts.some(workout => workout.type === filterType);
    const matchesQuery = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const paginatedWorkouts = filteredWorkouts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Workouts</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Number of Workouts</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Workout Minutes</th>
          </tr>
        </thead>
        <tbody>
          {paginatedWorkouts.map(user => (
            <tr key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer hover:bg-gray-100">
              <td className="px-6 py-4 border-b border-gray-200">{user.name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{user.workouts.map(workout => workout.type).join(', ')}</td>
              <td className="px-6 py-4 border-b border-gray-200">{user.workouts.length}</td>
              <td className="px-6 py-4 border-b border-gray-200">{user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-around items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage === Math.ceil(filteredWorkouts.length / itemsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkoutList;
