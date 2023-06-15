import Request_Model from "../models/Requests_Model.js";
import User_Model from "../models/User_Model.js";
import Worker_Model from "../models/Worker_Model.js";

const getRequests = async (req, res) => {
    try {
        const whereoptions = {}
        let requests
        if (req.user.role !== 'admin') {
            whereoptions.UserId = req.user.id
            requests = await Request_Model.findAll({ raw: true, where: whereoptions, include: { model: Worker_Model, attributes: ['name', 'lastName', 'email'] } })
        } else if (req.user.role === 'admin') {
            requests = await Request_Model.findAll({ raw: true, where: whereoptions, include: { model: Worker_Model, attributes: ['name', 'lastName', 'email'], include: { model: User_Model, attributes: ['name', 'email', 'department'] } } })
        }

        const workersEmail = await Worker_Model.findAll({ raw: true, where: whereoptions, attributes: ['email', 'id'] })
        return res.render('pages/Requests', { user: req.user, requests, workersEmail });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const getRequest = async (req, res) => {
    try {
        const whereoptions = { id: req.params.id };
        let request;
        if (req.user.role !== 'admin') {
            whereoptions.UserId = req.user.id;
            request = await Request_Model.findOne({
                raw: true,
                where: whereoptions,
                include: { model: Worker_Model, attributes: ['name', 'lastName', 'email'] }
            });
            delete request.UserId
        } else {
            request = await Request_Model.findOne({
                raw: true,
                where: whereoptions,
                include: {
                    model: Worker_Model,
                    attributes: ['name', 'lastName', 'email'],
                    include: { model: User_Model, attributes: ['name', 'email', 'department'] }
                }
            });
        }
        console.log(request);
        return res.render('pages/Request', { user: req.user, request });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const createRequest = async (req, res) => {
    try {
        const data = req.body
        data.UserId = req.user.id
        data.WorkerId = parseInt(data.worker)
        delete data.worker
        const request = new Request_Model(req.body)
        request.UserId = req.user.id
        await request.save()
        return res.redirect('/requests');
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const acceptRequests = async (req, res) => {
    try {
        const data = JSON.parse(req.body.dataToAccept)
        await Request_Model.update({ accepted: 1 }, { where: { id: data } })
        return res.redirect('/requests');
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const denyRequests = async (req, res) => {
    try {
        const data = JSON.parse(req.body.dataToDeny)
        await Request_Model.update({ accepted: 0 }, { where: { id: data } });
        return res.redirect('/requests');
    } catch (error) {
        return res.json({ error: error.message });
    }
}

const deleteRequests = async (req, res) => {
    try {
        const dataToDelete = JSON.parse(req.body.dataToDelete);
        if (req.user.role !== 'admin') {
            const requests = await Request_Model.findAll({ raw: true, where: { id: dataToDelete } });
            let flag = false
            requests.forEach(item => {
                if (item.UserId !== req.user.id) flag = true
            })
            if (flag) return res.json({ msg: 'No tienes permisos para realizar esta acción' })
        }

        await Request_Model.destroy({ where: { id: dataToDelete } })
        res.status(200).json({ ok: true })
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export {
    getRequests,
    deleteRequests,
    createRequest,
    acceptRequests,
    denyRequests,
    getRequest
}