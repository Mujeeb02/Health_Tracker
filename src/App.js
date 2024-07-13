import React, { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkOutForm';
import WorkoutList from './components/WorkOutList';
import WorkoutProgress from './components/WorkoutProgress';

const initialData = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    workouts: [
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    workouts: [
      { type: 'Yoga', minutes: 50 },
      { type: 'Cycling', minutes: 40 }
    ]
  }
];

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedData = localStorage.getItem('workoutData');
    if (storedData) {
      setUsers(JSON.parse(storedData));
    } else {
      setUsers(initialData);
      localStorage.setItem('workoutData', JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType]);

  const addWorkout = (name, type, minutes) => {
    const userExists = users.some(user => user.name.toLowerCase() === name.toLowerCase());
    if (userExists) {
      const updatedUsers = users.map(user => {
        if (user.name.toLowerCase() === name.toLowerCase()) {
          return {
            ...user,
            workouts: [...user.workouts, { type, minutes }]
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      localStorage.setItem('workoutData', JSON.stringify(updatedUsers));
    } else {
      const newUser = {
        id: users.length + 1,
        name,
        workouts: [{ type, minutes }]
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('workoutData', JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="All">All</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Yoga">Yoga</option>
          </select>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={15}>15 items per page</option>
          </select>
        </div>
        <div className='flex flex-row gap-4'>
          <WorkoutForm addWorkout={addWorkout} />
          <WorkoutList
            users={users}
            filterType={filterType}
            searchQuery={searchQuery}
            itemsPerPage={itemsPerPage}
            setSelectedUser={setSelectedUser}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {selectedUser && (
          <div className="mt-8">
            <WorkoutProgress user={selectedUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
