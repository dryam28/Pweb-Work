import User_Model from "../models/User_Model.js";

const getUsers = async (req, res) => {
    const resp = await User_Model.findAll({ raw: true })
    const users = resp.filter(item => item.role !== 'admin')
    return res.render('pages/Users', { users, user:req.user });
}

const registerUser = async (req, res) => {
    try {
        const user = new User_Model(req.body)
        user.role = 'jefe'
        await user.save()
        return res.redirect('/users');
    } catch (error) {
        res.json({msg:error.message})
    }
}

const deleteUsers = async (req, res) => {
    const dataToDelete = JSON.parse(req.body.dataToDelete);
    await User_Model.destroy({ where: { id: dataToDelete } })
    res.status(200).json({ ok: true })

}


export {
    getUsers,
    registerUser,
    deleteUsers
}