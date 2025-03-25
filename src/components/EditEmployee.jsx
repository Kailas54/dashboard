import React from 'react';
import axios from 'axios';

const EditEmployee = ({ isOpen, onClose, employee, onEmployeeUpdated, currentColor, currentMode }) => {
  const [editingEmployee, setEditingEmployee] = React.useState({
    name: employee?.name || '',
    position: employee?.position || '',
    salary: employee?.salary || '',
    password: employee?.password || ''
  });

  React.useEffect(() => {
    if (employee) {
      setEditingEmployee({
        name: employee.name,
        position: employee.position,
        salary: employee.salary,
        password: employee.password || ''
      });
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editingEmployee.name || !editingEmployee.position) {
        throw new Error('Please fill in all required fields');
      }

      const response = await axios.put(
        `http://localhost:5001/api/employees/${employee._id}`,
        editingEmployee
      );

      onEmployeeUpdated(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert('Error updating employee. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className={`p-8 rounded-lg shadow-xl w-96 ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-900'}`}>
          Edit Employee
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              value={editingEmployee.name}
              onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Position
            </label>
            <input
              type="text"
              value={editingEmployee.position}
              onChange={(e) => setEditingEmployee({...editingEmployee, position: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Salary
            </label>
            <input
              type="number"
              value={editingEmployee.salary}
              onChange={(e) => setEditingEmployee({...editingEmployee, salary: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              value={editingEmployee.password}
              onChange={(e) => setEditingEmployee({...editingEmployee, password: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 ${currentMode === 'Dark' ? 'text-gray-300 hover:text-gray-400' : 'text-gray-600 hover:text-gray-700'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              className="px-4 py-2 text-white rounded-lg hover:opacity-80"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;