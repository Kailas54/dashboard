import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { useStateContext } from '../contexts/ContextProvider';

const SalaryOverview = () => {
  const { currentColor, currentMode } = useStateContext();
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/employees");
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        
        const salaryData = response.data.map(emp => {
          const workDays = Math.floor(Math.random() * (daysInMonth - 15) + 15);
          const monthlyHours = (workDays * 8).toFixed(2);
          
          const hourlyRate = emp.position === 'Manager' ? 50 : 
                           emp.position === 'Developer' ? 40 : 
                           emp.position === 'Designer' ? 35 : 30;
          
          const monthlySalary = (hourlyRate * monthlyHours).toFixed(2);
          const bonus = monthlyHours >= 160 ? (monthlySalary * 0.1).toFixed(2) : 0;
          
          return {
            ...emp,
            workDays,
            monthlyHours,
            hourlyRate,
            monthlySalary,
            bonus,
            totalSalary: (Number(monthlySalary) + Number(bonus)).toFixed(2)
          };
        });
        
        setEmployeeSalaries(salaryData);
        const total = salaryData.reduce((sum, emp) => sum + Number(emp.totalSalary), 0);
        setTotalEarnings(total.toFixed(2));
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };
    
    fetchSalaryData();
  }, [selectedMonth, selectedYear]);

  const MonthSelector = () => (
    <div className="flex items-center gap-4">
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div className="w-full">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 rounded-2xl w-full">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Salary Details</p>
            <div className="flex items-center gap-4">
              <MonthSelector />
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl dark:text-gray-300">
                <span><GoDotFill /></span>
                <span>Base Salary</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span><GoDotFill /></span>
                <span>Bonus</span>
              </p>
            </div>
          </div>

          <div className="mt-10 w-full overflow-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours Worked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate ($/hr)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bonus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {employeeSalaries.map((employee) => (
                  <tr key={employee._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {employee.monthlyHours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${employee.hourlyRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${employee.monthlySalary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      ${employee.bonus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                      ${employee.totalSalary}
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

export default SalaryOverview;