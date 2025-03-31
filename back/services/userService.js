const User = require('../models/Users'); // Просто используем относительный путь

module.exports = {
  createUser: async (username, email, password) => {
    try {
      return await User.create({ 
        username, 
        email, 
        password_hash: password 
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  findUserByEmail: async (email) => {
    return await User.findOne({ 
      where: { email } 
    });
  },
  
  findUserById: async (id) => {
    return await User.findByPk(id, {
      attributes: { exclude: ['password_hash'] }
    });
  }
};