const Worker_Model = require("../models/Worker_Model");

const home = async (req, res) => {
    // const worker = await Worker_Model.findByPk(1)
    const workers = await Worker_Model.findAll({ raw: true })
    res.render('pages/Dashboard', { workers });
}

module.exports = {
    home,
};