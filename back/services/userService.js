const User = require('../models/Users');

module.exports = {
  createUser: async (username, email, passwordHash) => {
    try {
      return await User.create({ 
        username, 
        email, 
        password_hash: passwordHash 
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
  },

  // Дополнительные методы
  updateUser: async (id, updateData) => {
    return await User.update(updateData, {
      where: { id },
      returning: true,
      plain: true
    });
  },

  deleteUser: async (id) => {
    return await User.destroy({
      where: { id }
    });
  }
};