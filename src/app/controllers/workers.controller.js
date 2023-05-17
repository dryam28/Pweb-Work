import Worker_Model from '../models/Worker_Model.js'
import xlsx from 'xlsx'

const getHome = async (req, res) => {
    const workers = await Worker_Model.findAll({ raw: true })
    return res.render('pages/Dashboard', { workers });
}
const getUsers = async (req, res) => {
    return res.render('pages/Users');
}

const getWorkers = async (req, res) => {
    const workers = await Worker_Model.findAll({ raw: true })
    return res.render('pages/Workers', { workers });
}

const getWorker = async (req, res) => {
    const worker = await Worker_Model.findByPk(req.params.id, { raw: true })
    return res.render('pages/Worker', { worker });
}

const getRequests = async (req, res) => {
    return res.render('pages/Requests');
}

const createWorker = async (req, res) => {
    const worker = new Worker_Model(req.body)
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
    await Worker_Model.destroy({ where: { id: dataToDelete } })
    res.status(200).json({ ok: true })

}

const generateExcel2 = async (req, res) => {
    // Crear el archivo Excel
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([
        JSON.parse(req.body.datosJSON)
    ]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Descargar el archivo Excel en la PC del cliente
    const nombreArchivo = 'datos.xlsx';
    res.setHeader('Content-Disposition', 'attachment; filename=' + nombreArchivo);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(xlsx.write(workbook, { type: 'buffer' }));
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
    getHome,
    getUsers,
    getWorkers,
    getWorker,
    editWorker,
    getRequests,
    createWorker,
    deleteWorkers,
    generateExcel
};