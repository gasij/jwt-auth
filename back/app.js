// server.js (or your main entry file)  
require('dotenv').config();  
const express = require('express');  
const sequelize = require('./config/db'); // Ensure this matches your db.js configuration  
const authRoutes = require('./routes/authRoutes');  

const app = express();  

// Middleware  
app.use(express.json());  

// Routes  
app.use('/api/auth', authRoutes);  

// Проверка подключения к БД и запуск сервера  
sequelize.authenticate() // No errors should occur here if the instance is correct  
    .then(() => {  
        console.log('Database connected');  
        app.listen(3000, () => {  
            console.log('Server running on http://localhost:3000');  
        });  

    })  
    .catch(err => {  
        console.error('Database connection error:', err);  
    });