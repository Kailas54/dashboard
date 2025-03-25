import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsClock, BsPersonCheck } from 'react-icons/bs';
import { useStateContext } from '../contexts/ContextProvider';

const EmployeeInfo = () => {
  const { currentMode } = useStateContext();
  const [employeeLogins, setEmployeeLogins] = useState([]);
  const [totalOnline, setTotalOnline] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await axios.get("http://localhost:5001/api/employees");
        const loginResponse = await axios.get("http://localhost:5001/api/login");
        
        const logins = employeesResponse.data.map(emp => {
          const loginInfo = loginResponse.data.find(login => login.username === emp.name);
          return {
            ...emp,
            lastLogin: loginInfo ? new Date(loginInfo.timestamp).toLocaleString() : 'Never logged in',
            status: loginInfo ? 'Online' : 'Offline'
          };
        });

        setEmployeeLogins(logins);
        setTotalOnline(logins.filter(emp => emp.status === 'Online').length);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
    const interval = setInterval(fetchEmployees, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-6 ${currentMode === 'Dark' ? 'bg-main-dark-bg' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold mb-2 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-800'}`}>
          Employee Activity Monitor
        </h1>
        <p className={`${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Track employee login status and activity
        </p>
      </div>

      {/* Stats Card */}
      <div className={`mb-8 p-6 rounded-lg ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>Currently Online</p>
            <h2 className={`text-3xl font-bold ${currentMode === 'Dark' ? 'text-white' : 'text-gray-800'}`}>
              {totalOnline} / {employeeLogins.length}
            </h2>
          </div>
          <BsPersonCheck className={`text-4xl ${currentMode === 'Dark' ? 'text-blue-400' : 'text-blue-500'}`} />
        </div>
      </div>

      {/* Employee Login Table */}
      <div className={`rounded-lg shadow-lg ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-semibold ${currentMode === 'Dark' ? 'text-white' : 'text-gray-800'}`}>
              Login Activity
            </h3>
            <div className="flex items-center">
              <BsClock className={`mr-2 ${currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Last Updated: {new Date().toLocaleString()}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`${currentMode === 'Dark' ? 'bg-main-dark-bg' : 'bg-gray-50'}`}>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Employee
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Position
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Last Login
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeLogins.map((employee) => (
                  <tr key={employee._id}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.position}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${employee.status === 'Online' 
                          ? `${currentMode === 'Dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}` 
                          : `${currentMode === 'Dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}`}>
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;