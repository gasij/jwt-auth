// User.js (Your model file)  
const { DataTypes } = require('sequelize');  
const sequelize = require('../config/db'); // Ensure this path is correct  

const User = sequelize.define('Users', {  
    username: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        unique: true  
    },  
    email: {  
        type: DataTypes.STRING,  
        allowNull: false,  
        unique: true  
    },  
    password_hash: {  
        type: DataTypes.STRING,  
        allowNull: false  
    }  
});  

// Ensure you're exporting the User model correctly  
module.exports = User;