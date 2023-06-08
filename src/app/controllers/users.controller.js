import { validationResult } from "express-validator";
import sequelize from "../database/connect.js";
import User_Model from "../models/User_Model.js";
import Worker_Model from "../models/Worker_Model.js";

const getUsers = async (req, res) => {
    const resp = await User_Model.findAll({ raw: true })
    const users = resp.filter(item => item.role !== 'admin')
    return res.render('pages/Users', { users, user: req.user, messages: req.flash().messages });
}

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("messages", errors.array());
        return res.redirect("/users");
    }

    try {
        const user = new User_Model(req.body)
        user.role = 'jefe'
        await user.save()
        return res.redirect('/users');
    } catch (error) {
        req.flash('messages', [{ msg: error.message }]);
        return res.redirect('/users');
    }
}

const deleteUsers = async (req, res) => {
    const userIdsToDelete = JSON.parse(req.body.dataToDelete);

    // Inicia una transacción para agrupar todas las operaciones en una sola transacción
    const transaction = await sequelize.transaction();

    try {
        for (const userId of userIdsToDelete) {
            // Busca todas las relaciones del usuario en el modelo Worker_Model
            const workerRelations = await Worker_Model.findAll({
                where: { UserId: userId },
                transaction // Asocia la transacción a la consulta
            });

            if (workerRelations.length > 0) {
                // Si el usuario tiene relaciones en el modelo Worker_Model, establece su UserId en 0
                await Worker_Model.update({ UserId: 0 }, {
                    where: { UserId: userId },
                    transaction // Asocia la transacción a la consulta
                });
            }

            // Elimina el usuario del modelo User_Model
            await User_Model.destroy({ where: { id: userId }, transaction }); // Asocia la transacción a la consulta
        }

        // Confirma la transacción si todas las operaciones se realizaron correctamente
        await transaction.commit();

        res.status(200).json({ ok: true });
    } catch (error) {
        // Revierte la transacción si hubo un error en alguna de las operaciones
        await transaction.rollback();

        res.status(500).json({ error: 'Hubo un problema al eliminar los usuarios.' });
    }
}


export {
    getUsers,
    registerUser,
    deleteUsers
}