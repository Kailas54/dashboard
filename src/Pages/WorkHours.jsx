import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsClock, BsCalendar } from 'react-icons/bs';
import { useStateContext } from '../contexts/ContextProvider';

const WorkHours = () => {
  const { currentMode } = useStateContext();
  const [employeeHours, setEmployeeHours] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchEmployeeHours = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/employees");
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        
        const hoursData = response.data.map(emp => {
          const startTime = new Date();
          startTime.setHours(9, 0, 0);
          const currentTime = new Date();
          const hoursWorked = ((currentTime - startTime) / (1000 * 60 * 60)).toFixed(2);
          
          const workDays = Math.floor(Math.random() * (daysInMonth - 15) + 15);
          const monthlyHours = (workDays * 8).toFixed(2);
          
          // Format date as dd/mm/yyyy
          const date = new Date(selectedYear, selectedMonth);
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          
          return {
            ...emp,
            startTime: startTime.toLocaleTimeString(),
            hoursWorked: Math.min(hoursWorked, 8),
            monthlyHours,
            workDays,
            date: formattedDate
          };
        });
        
        setEmployeeHours(hoursData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    
    fetchEmployeeHours();
  }, [selectedMonth, selectedYear]);

  // Add this section before the Monthly Hours table
  const MonthSelector = () => (
    <div className="flex items-center gap-4 mb-4">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        className={`px-4 py-2 rounded-md ${
          currentMode === 'Dark' 
            ? 'bg-secondary-dark-bg text-white' 
            : 'bg-white text-gray-800'
        } border border-gray-300`}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>{month}</option>
        ))}
      </select>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        className={`px-4 py-2 rounded-md ${
          currentMode === 'Dark' 
            ? 'bg-secondary-dark-bg text-white' 
            : 'bg-white text-gray-800'
        } border border-gray-300`}
      >
        {[...Array(5)].map((_, i) => {
          const year = new Date().getFullYear() - 2 + i;
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    </div>
  );

  return (
    <div className={`p-6 ${currentMode === 'Dark' ? 'bg-main-dark-bg' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold mb-2 ${currentMode === 'Dark' ? 'text-white' : 'text-gray-800'}`}>
          Employee Work Hours
        </h1>
        <p className={`${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Daily work hours tracking for {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      {/* Work Hours Table */}
      <div className={`rounded-lg shadow-lg ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-semibold ${currentMode === 'Dark' ? 'text-white' : 'text-gray-800'}`}>
              Today's Hours
            </h3>
            <div className="flex items-center">
              <BsClock className={`mr-2 ${currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Last Updated: {new Date().toLocaleTimeString()}
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
                    Start Time
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Hours Worked
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${currentMode === 'Dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {employeeHours.map((employee) => (
                  <tr key={employee._id}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.position}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.startTime}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.hoursWorked} hrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${employee.hoursWorked >= 8 
                          ? `${currentMode === 'Dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}` 
                          : `${currentMode === 'Dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}`}>
                        {employee.hoursWorked >= 8 ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly Hours Section */}
      <div className={`mt-8 rounded-lg shadow-lg ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-semibold ${currentMode === 'Dark' ? 'text-white' : 'text-gray-800'}`}>
              Monthly Hours
            </h3>
            <div className="flex items-center gap-4">
              <MonthSelector />
              <BsCalendar className={`${currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`} />
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
                    Days Worked
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Total Hours
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${currentMode === 'Dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {employeeHours.map((employee) => (
                  <tr key={`monthly-${employee._id}`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.position}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.workDays} days
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentMode === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.monthlyHours} hrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${employee.monthlyHours >= 160 
                          ? `${currentMode === 'Dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}` 
                          : `${currentMode === 'Dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}`}>
                        {employee.monthlyHours >= 160 ? 'Excellent' : 'Good'}
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

export default WorkHours;