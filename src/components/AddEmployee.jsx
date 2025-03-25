import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({ isOpen, onClose, onEmployeeAdded, currentColor, currentMode }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    salary: ''
  });

  const generateCredentials = (name) => {
    const username = name.toLowerCase();
    const password = `${name.substring(0, 4).toLowerCase()}@123`;
    return { username, password };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newEmployee.name || !newEmployee.position || !newEmployee.salary) {
        throw new Error('Please fill in all required fields');
      }
      
      const { username, password } = generateCredentials(newEmployee.name);
      
      const response = await axios.post("http://localhost:5001/api/employees", {
        name: newEmployee.name,
        position: newEmployee.position,
        salary: parseFloat(newEmployee.salary),
        username: username,
        password: password
      });

      if (response.data) {
        onEmployeeAdded(response.data);
        onClose();
        setNewEmployee({ name: '', position: '', salary: '' });
        alert(`Employee added successfully!\nUsername: ${username}\nPassword: ${password}`);
      }
    } catch (error) {
      console.error("Error details:", error);
      alert(`Error: ${error.response?.data?.message || 'Failed to add employee'}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className={`p-8 rounded-lg shadow-xl w-96 ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-900'}`}>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Position
            </label>
            <input
              type="text"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Salary
            </label>
            <input
              type="number"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 ${
                currentMode === 'Dark' 
                  ? 'text-gray-300 hover:text-gray-400' 
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              className="px-4 py-2 text-white rounded-lg hover:drop-shadow-xl"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;