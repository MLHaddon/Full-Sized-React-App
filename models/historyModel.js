import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

// Access the DataTypes object from sequelize
const { DataTypes } = Sequelize;

// Define the history model
const History = db.define('history', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  productID: {
    type: DataTypes.JSON,
    allowNull: false,
    unique: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName:true
});

// sync to the current database
(async () => {
  await db.sync();
})();

export default History;