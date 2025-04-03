// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gggt', 'postgres', 'root', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    logging: console.log // Включаем логирование для диагностики
});

// Улучшенная проверка подключения
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');
        
        // Дополнительная проверка - список всех таблиц
        const [results] = await sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('📊 Available tables:', results.map(r => r.table_name));
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        
        // Рекомендации по устранению
        if (error.name === 'SequelizeConnectionError') {
            console.log('\n💡 Troubleshooting tips:');
            console.log('1. Check if PostgreSQL server is running');
            console.log('2. Verify username/password in db.js');
            console.log('3. Ensure database "sasas" exists');
            console.log('4. Try connecting with pgAdmin/psql to test credentials');
        }
    }
})();

module.exports = sequelize;