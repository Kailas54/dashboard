const mongoose = require('mongoose');
const Employee = require('../models/Employee');
require('dotenv').config();

const employees = [
    {
        name: "John Doe",
        position: "Software Engineer",
        salary: 75100
    },
    {
        name: "Jane Smith",
        position: "Project Manager",
        salary: 85000
    },
    {
        name: "Mike Johnson",
        position: "UI/UX Designer",
        salary: 65000
    },
    {
        name: "Sarah Williams",
        position: "Full Stack Developer",
        salary: 80000
    },
    {
        name: "David Chen",
        position: "Data Scientist",
        salary: 90000
    },
    {
        name: "Emily Brown",
        position: "Product Manager",
        salary: 88000
    },
    {
        name: "Alex Rodriguez",
        position: "DevOps Engineer",
        salary: 85000
    },
    {
        name: "Lisa Wong",
        position: "Frontend Developer",
        salary: 72000
    },
    {
        name: "James Taylor",
        position: "Backend Developer",
        salary: 78000
    },
    {
        name: "Maria Garcia",
        position: "QA Engineer",
        salary: 70000
    },
    {
        name: "Robert Kim",
        position: "Systems Architect",
        salary: 95000
    },
    {
        name: "Sophie Martin",
        position: "Business Analyst",
        salary: 68000
    },
    {
        name: "Tom Anderson",
        position: "Cloud Engineer",
        salary: 82000
    },
    {
        name: "Anna Lee",
        position: "Mobile Developer",
        salary: 76000
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        try {
            await Employee.deleteMany({}); // Clear existing employees
            await Employee.insertMany(employees);
            console.log('Employees seeded successfully!');
        } catch (error) {
            console.error('Error seeding employees:', error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.log('MongoDB Connection Error:', err));