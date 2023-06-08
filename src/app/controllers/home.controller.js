const getHome = async (req, res) => {
    return res.render('pages/Dashboard', { user: req.user,messages: req.flash().messages });
}

export {
    getHome
}