import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';
import bcryptjs from 'bcryptjs';
import Worker_Model from './Worker_Model.js';

const Request_Model = sequelize.define('Requests', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    createdAt: false
});

User_Model.hasMany(Worker_Model)
Worker_Model.belongsTo(User_Model)

User_Model.beforeCreate(async (user, options) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
    } catch (error) {
        console.log(error);
    }
})

export default User_Model;
