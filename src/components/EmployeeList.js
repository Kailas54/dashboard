import { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001"; // ✅ Use .env or fallback

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("Fetching from:", `${API_URL}/api/employees`); // ✅ Debug log
        const response = await fetch(`${API_URL}/api/employees`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data);
        console.log("Fetched employees:", data); // ✅ Debug log

      } catch (err) {
        console.error("Error fetching employees:", err); // ✅ Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [API_URL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>{emp.name} - {emp.position}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
