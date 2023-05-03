const Worker_Model = require("../models/Worker_Model");

const getHome = async (req, res) => {
    // const worker = await Worker_Model.findByPk(1)
    const workers = await Worker_Model.findAll({ raw: true })
    return res.render('pages/Dashboard', { workers });
}

const createWorker = async (req, res) => {
    // const worker = await Worker_Model.findByPk(1)
    // console.log(req.body);
    const worker = new Worker_Model(req.body)
    await worker.save()
    return res.redirect('/');
}

module.exports = {
    getHome,
    createWorker
};