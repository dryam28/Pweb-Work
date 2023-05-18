const getRequests = async (req, res) => {
    console.log(req.user);
    return res.render('pages/Requests', {user:req.user});
}

export {
    getRequests
}