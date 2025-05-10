const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First Name is required.',
      },
      len: {
        args: [2, 50],
        msg: 'First Name must be between 2 and 50 characters.',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Last Name is required.',
      },
      len: {
        args: [2, 50],
        msg: 'Last Name must be between 2 and 50 characters.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'This email is already registered.',
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address.',
      },
      notEmpty: {
        msg: 'Email is required.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer',
    validate: {
      isIn: {
        args: [['customer', 'admin']],
        msg: 'Role must be either customer or admin.',
      },
    },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verificationExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;