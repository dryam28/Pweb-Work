const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect');

const Worker_Model = sequelize.define('Workers', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ci: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teachingCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scientificDegree: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    charge: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: false
});
module.exports = Worker_Model;
