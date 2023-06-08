
const userVerification = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
};

const isAdminVerification = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            return next();
        }
        throw new Error('No tienes permiso de realizar esta acción');
    } catch (error) {
        req.flash('messages', [{ msg: error.message }]);
        return res.redirect('/');
    }
}

export { userVerification, isAdminVerification }