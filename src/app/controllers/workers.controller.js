import Worker_Model from '../models/Worker_Model.js'
import xlsx from 'xlsx'

const getWorkers = async (req, res) => {
    const whereoptions = {}
    if (req.user.role !== 'admin') {

        whereoptions.UserId = req.user.id
    }
    const workers = await Worker_Model.findAll({ raw: true, where: whereoptions })
    return res.render('pages/Workers', { workers, user: req.user });
}

const getWorker = async (req, res) => {
    const worker = await Worker_Model.findByPk(req.params.id, { raw: true })
    return res.render('pages/Worker', { worker });
}

const createWorker = async (req, res) => {
    const worker = new Worker_Model(req.body)
    worker.UserId = req.user.id
    await worker.save()
    return res.redirect('/workers');
}

const editWorker = async (req, res) => {
    const { name, lastName, age, email, ci, teachingCategory, scientificDegree, speciality, charge, availability } = req.body;
    await Worker_Model.update({ name, lastName, age, email, ci, teachingCategory, scientificDegree, speciality, charge, availability }, { where: { id: req.params.id } });
    res.redirect(`/workers`);
}

const deleteWorkers = async (req, res) => {
    const dataToDelete = JSON.parse(req.body.dataToDelete);
    if (req.user.role !== 'admin') {
        const workers = await Worker_Model.findAll({ raw: true, where: { id: dataToDelete } });
        let flag = false
        workers.forEach(item => {
            if (item.UserId !== req.user.id) flag = true
        })
        if (flag) return res.json({msg:'No tienes permisos para realizar esta acción'})
    }

    await Worker_Model.destroy({ where: { id: dataToDelete } })
    res.status(200).json({ ok: true })

}

const generateExcel = async (req, res) => {
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
}

export {
    getWorkers,
    getWorker,
    editWorker,
    createWorker,
    deleteWorkers,
    generateExcel
};