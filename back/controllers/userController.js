const userService = require('../services/userService');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await userService.findUserById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
};