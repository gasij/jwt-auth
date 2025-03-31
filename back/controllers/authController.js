const userService = require('../services/userService');
const { JWT_SECRET, JWT_EXPIRES } = require('../config/jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }

      const user = await userService.createUser(username, email, password);
      res.status(201).json({ message: 'Пользователь создан', user });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Email или username уже заняты' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
};