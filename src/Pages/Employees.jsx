import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiUsers } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';
import AddEmployee from '../components/AddEmployee';
import DeleteEmployee from '../components/DeleteEmployee';

const Employees = () => {
  const { currentColor, currentMode } = useStateContext();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Update the initial state to include password
  const [editingEmployee, setEditingEmployee] = useState({
    name: '',
    position: '',
    salary: '',
    password: ''  // Add password field
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/employees");
      if (response.data.length === 0) {
        await axios.post("http://localhost:5001/api/employees/seed");
        const seededResponse = await axios.get("http://localhost:5001/api/employees");
        setEmployees(seededResponse.data);
      } else {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editingEmployee.name || !editingEmployee.position) {
        throw new Error('Please fill in all required fields');
      }

      const response = await axios.put(
        `http://localhost:5001/api/employees/${editingEmployee._id}`, 
        {
          name: editingEmployee.name,
          position: editingEmployee.position,
          salary: editingEmployee.salary,
          password: editingEmployee.password
        }
      );

      setEmployees(employees.map(emp => 
        emp._id === editingEmployee._id ? response.data : emp
      ));
      
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
      alert('Error updating employee. Please try again.');
    }
  };

  // Add new state for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);

  

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove the old handleDelete function
  
  const handleDeleteClick = (id) => {
    setDeletingEmployeeId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEmployeeDeleted = (deletedId) => {
    setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== deletedId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${currentMode === 'Dark' ? 'bg-main-dark-bg' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold flex items-center gap-2 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-900'}`}>
            <FiUsers className="inline-block" />
            Employee Management
          </h1>
        </div>

        {/* Search and Add Employee section */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-72">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${currentMode === 'Dark' ? 'bg-secondary-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: currentColor }}
            className="text-white px-4 py-2 rounded-lg hover:drop-shadow-xl transition-colors"
          >
            Add Employee
          </button>
        </div>

        {/* Add Employee Modal */}
        <AddEmployee 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEmployeeAdded={handleEmployeeAdded}
          currentColor={currentColor}
          currentMode={currentMode}
        />

        <div className={`rounded-lg shadow overflow-hidden ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={currentMode === 'Dark' ? 'bg-main-dark-bg' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Name</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Position</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${currentMode === 'Dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setEditingEmployee(employee);
                          setIsEditModalOpen(true);
                        }}
                        style={{ color: currentColor }}
                        className="mr-4 hover:opacity-80"
                      >
                        Edit
                      </button>
                      {/* Move DeleteEmployee component outside of the table row */}
                      <DeleteEmployee 
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        employeeId={deletingEmployeeId}
                        onEmployeeDeleted={handleEmployeeDeleted}
                        currentColor={currentColor}
                        currentMode={currentMode}
                      />

                      {/* In the table row */}
                      <button
                        onClick={() => handleDeleteClick(employee._id)}
                        className={`hover:opacity-80 ${currentMode === 'Dark' ? 'text-red-400' : 'text-red-600'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={`px-6 py-4 text-center text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className={`p-8 rounded-lg shadow-xl w-96 ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-4 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-900'}`}>
                Edit Employee
              </h2>
              <form onSubmit={handleEditSubmit}>
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
                    Password
                  </label>
                  <input
                    type="text"
                    value={editingEmployee.password}
                    onChange={(e) => setEditingEmployee({...editingEmployee, password: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${currentMode === 'Dark' ? 'bg-main-dark-bg text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
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
        )}
      </div>
    </div>
  );
};

export default Employees;
