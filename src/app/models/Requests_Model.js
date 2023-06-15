import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';
import Worker_Model from './Worker_Model.js';

const Request_Model = sequelize.define('Requests', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Licencia', 'Vacaciones', 'Días de asuntos propios', 'Baja médica', 'Excedencias']]
        }
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
    }
}, {
    timestamps: false,
    createdAt: false
});

Worker_Model.hasOne(Request_Model)
Request_Model.belongsTo(Worker_Model)

export default Request_Model;
