import { validationResult } from 'express-validator'
import Worker_Model from '../models/Worker_Model.js'
import xlsx from 'xlsx'
import sequelize from '../database/connect.js'

const getWorkers = async (req, res) => {
    try {
        const whereoptions = {}
        if (req.user.role !== 'admin') {
            whereoptions.UserId = req.user.id
        }
        const workers = await Worker_Model.findAll({ raw: true, where: whereoptions })
        return res.render('pages/Workers', { workers, user: req.user, messages: req.flash().messages });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const getWorker = async (req, res) => {
    try {
        const worker = await Worker_Model.findByPk(req.params.id, { raw: true })
        return res.render('pages/Worker', { user: req.user, worker });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const createWorker = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("messages", errors.array());
        return res.redirect("/workers");
    }
    try {
        const worker = new Worker_Model(req.body)
        worker.UserId = req.user.id
        await worker.save()
        return res.redirect('/workers');
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const searchWorkers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("messages", errors.array());
        return res.redirect("/users");
    }

    try {
        const { searchData } = req.body;
        const workers = await sequelize.query(`
            SELECT name, email, lastName
            FROM Workers
            WHERE name LIKE '%${searchData}%'
                OR email LIKE '%${searchData}%'
                OR lastName LIKE '%${searchData}%'
        `);
        res.render('pages/Workers', { workers: workers[0], user: req.user, searchData });
    } catch (error) {
        req.flash('messages', [{ msg: error.message }]);
        return res.redirect('/workers');
    }
}

const editWorker = async (req, res) => {
    try {
        const { name, lastName, age, email, ci, teachingCategory, scientificDegree, speciality, charge, availability } = req.body;
        await Worker_Model.update({ name, lastName, age, email, ci, teachingCategory, scientificDegree, speciality, charge, availability }, { where: { id: req.params.id } });
        res.redirect(`/workers`);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const deleteWorkers = async (req, res) => {
    try {
        const dataToDelete = JSON.parse(req.body.dataToDelete);
        if (req.user.role !== 'admin') {
            const workers = await Worker_Model.findAll({ raw: true, where: { id: dataToDelete } });
            let flag = false
            workers.forEach(item => {
                if (item.UserId !== req.user.id) flag = true
            })
            if (flag) return res.json({ msg: 'No tienes permisos para realizar esta acción' })
        }
        await Worker_Model.destroy({ where: { id: dataToDelete } })
        res.status(200).json({ ok: true })
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const generateExcel = async (req, res) => {
    try {
        const data = JSON.parse(req.body.datosJSON);
        const workers = await Worker_Model.findAll({ where: { id: data }, raw: true });
        // Crear el archivo Excel
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(workers);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Datos');
        // Descargar el archivo Excel en la PC del cliente
        const nombreArchivo = 'datos.xlsx';
        res.setHeader('Content-Disposition', 'attachment; filename=' + nombreArchivo);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(xlsx.write(workbook, { type: 'buffer' }));
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export {
    getWorkers,
    getWorker,
    editWorker,
    createWorker,
    deleteWorkers,
    generateExcel,
    searchWorkers
};