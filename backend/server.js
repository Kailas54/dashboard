const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Employee Dashboard API' });
});

// Routes
const employeeRoutes = require('./routes/employees');

app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_dashboard';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.log('MongoDB Connection Error:', err);
        console.log('Continuing without database connection - authentication will not work properly');
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Server startup
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
