router.post('/seed', async (req, res) => {
  try {
    const employees = [
      // Your seed data from employeeSeeder.js
    ];
    
    await Employee.deleteMany({}); // Clear existing data
    await Employee.insertMany(employees);
    res.status(200).json({ message: 'Employees seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error seeding employees' });
  }
});

router.delete('/name/:name', async (req, res) => {
  try {
    const employeeName = req.params.name;
    const employee = await Employee.findOneAndDelete({ name: employeeName });
    
    if (!employee) {
      return res.status(404).json({ message: `Employee with name ${employeeName} not found` });
    }
    
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
});