// app.js
const express = require('express');
const bodyParser = require('body-parser');  // Make sure to include body-parser
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

// Connect to database
connectDB().then(() => console.log("MongoDB connected"));

// Middleware
app.use(bodyParser.json());  // Use body-parser to parse JSON requests
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
