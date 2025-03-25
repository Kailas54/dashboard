import React from 'react';
import axios from 'axios';

const DeleteEmployee = ({ isOpen, onClose, employeeId, onEmployeeDeleted, currentColor, currentMode }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${employeeId}`);
      onEmployeeDeleted(employeeId);
      onClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert('Error deleting employee. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className={`p-6 rounded-xl shadow-2xl w-80 transform transition-all duration-300 scale-100 ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold mb-3 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-900'}`}>
          Delete Confirmation
        </h2>
        <p className={`mb-5 ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Are you sure you want to delete?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentMode === 'Dark' 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white rounded-lg transition-all duration-200 hover:opacity-90 bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;