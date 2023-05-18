
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
        return res.status(403).json({ msg: 'no tienes permiso de realizar esta acción' })
        // throw new Error('No tienes los permisos fui');
    } catch (error) {
        req.flash('messages', [{ msg: error.message }]);
        return res.redirect('/');
    }
}

export { userVerification, isAdminVerification }