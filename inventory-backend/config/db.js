const { Sequelize } = require('sequelize');


// 'root', 'Admin@123'
const sequelize = new Sequelize('asset_management', 'root', 'Abhi@3278', {  
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connection OK'))
  .catch(err => console.error('❌ Database connection FAILED:', err));

module.exports = sequelize;
