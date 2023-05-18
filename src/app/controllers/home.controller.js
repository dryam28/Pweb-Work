const getHome = async (req, res) => {
    return res.render('pages/Dashboard', {user:req.user});
}

export {
    getHome
}